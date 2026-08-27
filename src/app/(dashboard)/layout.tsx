import Sidebar from "@/components/Sidebar";
import { Bell, UserCircle, ChevronDown } from "lucide-react";
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

  const userName = user?.name || "User";
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10 md:hidden">
          <span className="font-bold text-lg text-gray-900">GovConnect</span>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="hidden sm:inline">Welcome, {userName}</span>
              <UserCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </header>
        
        {/* Desktop Header variant (in mockup the header merges with page content, but we'll add it here for consistency) */}
        <header className="h-16 bg-white border-b hidden md:flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <span>Welcome, {userName}</span>
              <UserCircle className="w-8 h-8 text-gray-400" />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
