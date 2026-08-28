import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ApplicationsClient from "./ApplicationsClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: { user_id: session.userId },
    include: {
      service: {
        include: { department: true }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  const formattedApps = applications.map(app => {
    let statusFormatted = "In Progress";
    if (app.status === "approved") statusFormatted = "Approved";
    if (app.status === "rejected") statusFormatted = "Rejected";

    return {
      id: app.id,
      name: app.service?.name || "Unknown Service",
      date: new Date(app.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: statusFormatted
    };
  });

  return <ApplicationsClient initialApplications={formattedApps} />;
}
