"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  HeartPulse,
  Building2,
  Plug,
  GitMerge,
  FileText,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
  Menu,
  Inbox,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", href: "/admin/dashboard" },
  { icon: <Activity className="w-5 h-5" />, label: "API Monitoring", href: "/admin/api-monitoring" },
  { icon: <HeartPulse className="w-5 h-5" />, label: "System Health", href: "/admin/health" },
  { icon: <Inbox className="w-5 h-5" />, label: "Applications", href: "/admin/applications" },
  { icon: <Building2 className="w-5 h-5" />, label: "Departments", href: "/admin/departments" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Reports", href: "/admin/reports" },
  { icon: <Plug className="w-5 h-5" />, label: "Adapters", href: "/admin/adapters" },
  { icon: <GitMerge className="w-5 h-5" />, label: "Workflows", href: "/admin/workflows" },
  { icon: <FileText className="w-5 h-5" />, label: "Audit Logs", href: "/admin/audit-logs" },
  { icon: <AlertTriangle className="w-5 h-5" />, label: "Alerts", href: "/admin/alerts" },
  { icon: <Users className="w-5 h-5" />, label: "User Management", href: "/admin/users" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-64 border-r bg-white h-screen flex flex-col sticky top-0 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b">
        <Menu className="w-5 h-5 text-gray-600 mr-3 cursor-pointer" />
        <span className="font-bold text-lg text-gray-900">Sangam Admin</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"
                  />
                )}
                <span className={`mr-3 ${isActive ? "text-primary" : "text-gray-400"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
