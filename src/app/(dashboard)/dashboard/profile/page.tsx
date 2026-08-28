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
      role: true,
      documents: {
        select: {
          id: true,
          name: true,
          type: true,
          uploaded_at: true,
          verification_status: true
        }
      },
      data_consents: {
        select: {
          id: true,
          purpose: true,
          status: true,
          granted_at: true,
          department: {
            select: { name: true }
          }
        }
      },
      applications: {
        select: {
          id: true,
          status: true,
          submission_date: true,
          service: {
            select: { name: true }
          }
        }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return <ProfileUI user={user} />;
}
