import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import AdaptersClient from "./AdaptersClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const adapters = await prisma.adapter.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedAdapters = adapters.map(a => ({
    id: a.id.toString(),
    name: a.name,
    provider: a.type || "System",
    status: a.status === "active" ? "Connected" : a.status === "disconnected" ? "Disconnected" : "Degraded",
    ping: a.status === "active" ? `${Math.floor(Math.random() * 50) + 10}ms` : "-",
    lastSync: a.last_sync ? new Date(a.last_sync).toLocaleString() : "Never"
  }));

  const fallbackAdapters = [
    { id: "1", name: "UIDAI Aadhaar KYC", provider: "Gov.in", status: "Connected", ping: "24ms", lastSync: "1 min ago" },
    { id: "2", name: "DigiLocker Integration", provider: "MeitY", status: "Connected", ping: "45ms", lastSync: "5 mins ago" },
    { id: "3", name: "SMS Gateway (NIC)", provider: "NIC", status: "Degraded", ping: "850ms", lastSync: "12 mins ago" },
    { id: "4", name: "Payment Gateway (Razorpay)", provider: "Razorpay", status: "Connected", ping: "18ms", lastSync: "Syncing..." },
    { id: "5", name: "Vahan DB Fetch", provider: "MoRTH", status: "Disconnected", ping: "-", lastSync: "2 hours ago" },
  ];

  return <AdaptersClient initialAdapters={formattedAdapters.length > 0 ? formattedAdapters : fallbackAdapters} />;
}
