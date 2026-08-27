import AdminSidebar from "@/components/AdminSidebar";
import { Bell, UserCircle } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b hidden md:flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <span>Admin User</span>
              <UserCircle className="w-8 h-8 text-gray-400" />
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
