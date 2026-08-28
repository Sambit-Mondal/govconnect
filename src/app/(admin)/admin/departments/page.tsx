import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import DepartmentsClient from "./DepartmentsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const departments = await prisma.department.findMany({
    include: {
      services: true
    }
  });

  const formattedDepartments = departments.map(d => ({
    id: d.code,
    rawId: d.id,
    name: d.name,
    services: d.services.length,
    users: Math.floor(Math.random() * 1000) + 50, // mock users for now as we don't have department_id on users yet
    status: d.is_active === false ? "Inactive" : "Active"
  }));

  return <DepartmentsClient initialDepartments={formattedDepartments} />;
}
