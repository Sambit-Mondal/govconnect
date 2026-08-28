import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ApiMonitoringClient from "./ApiMonitoringClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const activities = await prisma.loginActivity.findMany({
    orderBy: { login_time: 'desc' },
    take: 50
  });

  const formattedRequests = activities.map(a => {
    return {
      id: a.id,
      endpoint: "/api/auth/login",
      method: "POST",
      status: a.status === "success" ? 200 : 401,
      latency: `${Math.floor(Math.random() * 200) + 40}ms`,
      ip: a.ip_address,
      time: new Date(a.login_time || new Date()).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
  });

  return <ApiMonitoringClient initialRequests={formattedRequests} />;
}
