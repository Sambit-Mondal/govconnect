import Sidebar from "@/components/Sidebar";
import TopBarClient from "@/components/TopBarClient";
import AIGovAssistWidget from "@/components/AIGovAssistWidget";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true }
  });

  const userName = user?.name ? user.name.split(" ")[0] : "User";
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopBarClient userName={userName} userId={session.userId} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
        
        <AIGovAssistWidget userName={userName} />
      </div>
    </div>
  );
}
