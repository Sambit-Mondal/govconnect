import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import AlertsClient from "./AlertsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const systemAlerts = await prisma.systemAlert.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedAlerts = systemAlerts.map(alert => ({
    id: alert.id,
    type: alert.type,
    title: alert.title,
    message: alert.message,
    status: alert.is_read ? 'resolved' : 'active',
    time: alert.created_at ? new Date(alert.created_at).toLocaleString() : "Just now"
  }));

  return <AlertsClient initialAlerts={formattedAlerts} />;
}
