"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function approveApplication(id: number) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.application.update({
    where: { id },
    data: {
      status: "approved",
      approved_at: new Date()
    }
  });

  revalidatePath("/admin/applications");
}

export async function rejectApplication(id: number, reason: string) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.application.update({
    where: { id },
    data: {
      status: "rejected",
      rejected_at: new Date(),
      rejection_reason: reason
    }
  });

  revalidatePath("/admin/applications");
}

export async function submitApplication(serviceId: number, data: any) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.application.create({
    data: {
      user_id: session.userId,
      service_id: serviceId,
      status: "pending",
      data: data
    }
  });

  revalidatePath("/dashboard/applications");
}
