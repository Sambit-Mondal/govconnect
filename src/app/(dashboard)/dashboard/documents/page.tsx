import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import DocumentVaultPage from "./DocumentsClient";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const documents = await prisma.document.findMany({
    where: { user_id: session.userId },
    orderBy: { uploaded_at: 'desc' }
  });

  // Map to the format the UI expects
  const formattedDocs = documents.map(doc => {
    return {
      id: doc.id,
      name: doc.name,
      type: doc.type || "Other",
      uploadedOn: doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A",
      status: doc.verification_status === "verified" ? "Verified" : "Pending",
    };
  });

  return <DocumentVaultPage initialDocuments={formattedDocs} />;
}
