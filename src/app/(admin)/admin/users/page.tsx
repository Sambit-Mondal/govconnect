import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import UsersClient from "./UsersClient";

export default async function Page() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { created_at: 'desc' }
  });

  const formattedUsers = users.map(u => ({
    id: `USR-${u.id.toString()}`,
    name: u.name,
    email: u.email,
    role: (u.role || "citizen").charAt(0).toUpperCase() + (u.role || "citizen").slice(1),
    status: u.status || "Active",
    joined: new Date(u.created_at || new Date()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }));

  return <UsersClient initialUsers={formattedUsers} />;
}
