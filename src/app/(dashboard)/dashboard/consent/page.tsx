import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import SecurityPrivacyCenter from "./ConsentClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      data_consents: {
        include: { department: true }
      },
      login_activities: {
        orderBy: { login_time: 'desc' },
        take: 10
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  const formattedConsents = user.data_consents.map(c => ({
    id: c.id,
    department: c.department?.name || "Unknown",
    purpose: c.purpose,
    status: c.status || "active",
    date: c.granted_at ? new Date(c.granted_at).toLocaleDateString() : "N/A"
  }));

  const formattedLogins = user.login_activities.map(l => ({
    id: l.id,
    date: l.login_time ? new Date(l.login_time).toLocaleString() : "N/A",
    location: l.ip_address || "Unknown", // Assuming IP or mocking location
    status: l.status || "Successful",
    statusColor: l.status === "failed" ? "text-red-600" : "text-green-600"
  }));

  return (
    <SecurityPrivacyCenter 
      initialConsents={formattedConsents} 
      initialLogins={formattedLogins} 
      twoFactorEnabled={user.two_factor_enabled ?? false} 
    />
  );
}
