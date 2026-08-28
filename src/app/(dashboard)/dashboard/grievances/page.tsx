import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import GrievancesClient from "./GrievancesClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const grievances = await prisma.grievance.findMany({
    where: { user_id: session.userId },
    orderBy: { created_at: 'desc' }
  });

  const formattedGrievances = grievances.map(g => {
    let statusColor = "text-orange-600 bg-orange-50 border-orange-200";
    if ((g.status || "") === "assigned") statusColor = "text-purple-600 bg-purple-50 border-purple-200";
    if ((g.status || "") === "resolved") statusColor = "text-green-600 bg-green-50 border-green-200";

    return {
      id: g.id,
      subject: g.title,
      status: (g.status || "under_review").charAt(0).toUpperCase() + (g.status || "under_review").slice(1),
      date: new Date(g.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      statusColor
    };
  });

  return <GrievancesClient initialGrievances={formattedGrievances} />;
}
