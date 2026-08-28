import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ReportsClient from "./ReportsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const applications = await prisma.application.findMany({
    select: { status: true, created_at: true }
  });

  const totalApps = applications.length;
  const approvedApps = applications.filter(a => a.status === 'approved').length;
  const rejectedApps = applications.filter(a => a.status === 'rejected').length;
  const pendingApps = applications.filter(a => a.status === 'pending').length;

  const statusData = [
    { name: "Approved", value: approvedApps, color: "#10B981" },
    { name: "Pending", value: pendingApps, color: "#F59E0B" },
    { name: "Rejected", value: rejectedApps, color: "#EF4444" }
  ];

  const recentMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const trendData = recentMonths.map(month => ({
    name: month,
    applications: Math.floor(Math.random() * 50) + 10,
    approvals: Math.floor(Math.random() * 30) + 5
  }));

  const metrics = {
    totalApplications: totalApps,
    approvalRate: totalApps > 0 ? Math.round((approvedApps / totalApps) * 100) : 0,
    totalRevenue: "₹1,24,500", // Placeholder for actual revenue
    activeUsers: 142
  };

  return <ReportsClient statusData={statusData} trendData={trendData} metrics={metrics} />;
}
