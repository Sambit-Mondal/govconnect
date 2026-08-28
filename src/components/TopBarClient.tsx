"use client";

import { useEffect, useState } from "react";
import { Bell, UserCircle, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function TopBarClient({ userName, userId }: { userName: string; userId: number }) {
  const [unreadCount, setUnreadCount] = useState(0);



  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10 md:hidden">
        <span className="font-bold text-lg text-gray-900">Sangam</span>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/notifications" className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="hidden sm:inline">Welcome, {userName}</span>
            <UserCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </header>

      <header className="h-16 bg-white border-b hidden md:flex items-center justify-end px-8 sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/notifications" className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <span>Welcome, {userName}</span>
            <UserCircle className="w-8 h-8 text-gray-400" />
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </header>
    </>
  );
}
