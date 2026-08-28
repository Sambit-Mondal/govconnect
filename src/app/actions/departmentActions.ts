"use server";

import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addDepartment(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const code = formData.get("code") as string;

  if (!name || !code) {
    throw new Error("Missing fields");
  }

  await prisma.department.create({
    data: {
      name,
      code,
      is_active: true
    }
  });

  revalidatePath("/admin/departments");
}

export async function editDepartment(id: number, formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const is_active = formData.get("is_active") === "true";

  if (!name || !code) {
    throw new Error("Missing fields");
  }

  await prisma.department.update({
    where: { id },
    data: {
      name,
      code,
      is_active
    }
  });

  revalidatePath("/admin/departments");
}

export async function deleteDepartment(id: number) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.department.delete({
    where: { id }
  });

  revalidatePath("/admin/departments");
}
