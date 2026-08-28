import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import WorkflowsClient from "./WorkflowsClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const workflowsData = await prisma.workflow.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedWorkflows = workflowsData.map(wf => ({
    id: wf.id.toString(),
    name: wf.name,
    triggers: Math.floor(Math.random() * 2000) + 100, // mock triggers count
    avgTime: wf.status === "active" ? `${Math.floor(Math.random() * 10) + 1} Mins` : "-",
    status: wf.status === "active" ? "Active" : "Paused"
  }));

  const fallbackWorkflows = [
    { id: "1", name: "Standard License Approval", triggers: 450, avgTime: "2.4 Days", status: "Active" },
    { id: "2", name: "Grievance Auto-Routing", triggers: 1240, avgTime: "15 Mins", status: "Active" },
    { id: "3", name: "Payment Verification Sync", triggers: 3500, avgTime: "5 Secs", status: "Active" },
    { id: "4", name: "Document Expiry Reminder", triggers: 120, avgTime: "-", status: "Paused" },
  ];

  return <WorkflowsClient initialWorkflows={formattedWorkflows.length > 0 ? formattedWorkflows : fallbackWorkflows} />;
}
