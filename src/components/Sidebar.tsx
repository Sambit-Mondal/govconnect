"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  Files,
  ShieldCheck,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Menu,
  CreditCard,
  MessageSquareWarning,
  GraduationCap,
  MapPin,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", href: "/dashboard" },
  { icon: <Search className="w-5 h-5" />, label: "Find Services", href: "/dashboard/services" },
  { icon: <FileText className="w-5 h-5" />, label: "My Applications", href: "/dashboard/applications" },
  { icon: <Files className="w-5 h-5" />, label: "My Documents", href: "/dashboard/documents" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Data Consent", href: "/dashboard/consent" },
  { icon: <CreditCard className="w-5 h-5" />, label: "Payments", href: "/dashboard/payments" },
  { icon: <Bell className="w-5 h-5" />, label: "Notifications", href: "/dashboard/notifications" },
  { icon: <User className="w-5 h-5" />, label: "Profile", href: "/dashboard/profile" },
  { icon: <HelpCircle className="w-5 h-5" />, label: "Help & Support", href: "/dashboard/help" },
  { icon: <MessageSquareWarning className="w-5 h-5" />, label: "Grievances", href: "/dashboard/grievances" },
  { icon: <GraduationCap className="w-5 h-5" />, label: "Schemes", href: "/dashboard/schemes" },
  { icon: <MapPin className="w-5 h-5" />, label: "Nearby Places", href: "/dashboard/nearby" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
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
        <span className="font-bold text-lg text-gray-900">Sangam</span>
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
                    layoutId="sidebar-active"
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
