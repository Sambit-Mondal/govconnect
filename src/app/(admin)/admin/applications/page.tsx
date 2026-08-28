import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ApplicationsClient from "./ApplicationsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    include: {
      user: true,
      service: {
        include: { department: true }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  const formattedApps = applications.map(app => ({
    id: app.id,
    type: app.type || "Service Request",
    applicant: app.user?.name || "Unknown Citizen",
    email: app.user?.email || "",
    service: app.service?.name || "Unknown Service",
    department: app.service?.department?.name || "General",
    status: app.status || "pending",
    date: new Date(app.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    data: app.data || {},
    rejectionReason: app.rejection_reason || ""
  }));

  return <ApplicationsClient initialApplications={formattedApps} />;
}
