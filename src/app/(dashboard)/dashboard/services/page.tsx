import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ServicesClient from "./ServicesClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const services = await prisma.service.findMany({
    include: {
      department: true
    }
  });

  const formattedServices = services.map(s => ({
    id: s.id,
    name: s.name,
    category: s.category || "General",
    department: s.department?.name || "Unknown",
    fee: s.fee_amount ? Number(s.fee_amount) : 0,
    processingTime: s.processing_time || 0
  }));

  return <ServicesClient initialServices={formattedServices} />;
}
