import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileUI from "./ProfileUI";

export default async function CitizenProfilePage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { 
      id: true,
      name: true,
      email: true,
      role: true 
    }
  });

  if (!user) {
    redirect("/login");
  }

  return <ProfileUI user={user} />;
}
