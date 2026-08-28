"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function uploadDocument(formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  
  if (!name || !type) {
    throw new Error("Missing fields");
  }

  // Simulate file upload by just recording it in the DB
  await prisma.document.create({
    data: {
      user_id: session.userId,
      name,
      type,
      file_path: `/documents/${name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      verification_status: "verified"
    }
  });

  revalidatePath("/dashboard/documents");
}

export async function deleteDocument(id: number) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.document.deleteMany({
    where: { 
      id,
      user_id: session.userId
    }
  });

  revalidatePath("/dashboard/documents");
}
