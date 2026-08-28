import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import AuditLogsClient from "./AuditLogsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const logsData = await prisma.auditLog.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedLogs = logsData.map(log => ({
    id: `LOG-${log.id.toString()}`,
    user: `User ID: ${log.user_id}`,
    action: log.action,
    entity: log.entity_type,
    ip: log.ip_address,
    time: new Date(log.created_at || new Date()).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }));

  return <AuditLogsClient initialLogs={formattedLogs} />;
}
