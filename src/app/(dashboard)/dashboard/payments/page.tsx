import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import PaymentsClient from "./PaymentsClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const payments = await prisma.payment.findMany({
    where: { user_id: session.userId },
    include: {
      application: {
        include: { service: true }
      }
    },
    orderBy: { created_at: 'desc' }
  });

  const formattedTransactions = payments.map(p => {
    let statusFormatted = "Pending";
    let statusColor = "text-orange-600 bg-orange-50";
    if (p.status === "completed") {
      statusFormatted = "Paid";
      statusColor = "text-green-600 bg-green-50";
    }

    return {
      id: p.transaction_id || `TXN-${p.id.toString()}`,
      purpose: p.application?.service?.name || "Service Fee",
      amount: `₹${p.amount}`,
      status: statusFormatted,
      date: new Date(p.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      statusColor
    };
  });

  return <PaymentsClient initialTransactions={formattedTransactions} />;
}
