"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addGrievance(formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;

  if (!subject || !description) {
    throw new Error("Missing fields");
  }

  await prisma.grievance.create({
    data: {
      user_id: session.userId,
      title: subject,
      description,
      status: "under_review"
    }
  });

  revalidatePath("/dashboard/grievances");
}
