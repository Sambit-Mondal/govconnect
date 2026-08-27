"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ session }: { session?: any }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Departments", path: "/departments" },
    { name: "How it Works", path: "/how-it-works" },
    { name: "Help", path: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight text-primary">GovConnect</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors font-semibold text-[15px] hover:text-primary ${
                pathname === link.path ? "text-primary" : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {session ? (
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-lg border-2 border-primary/20 bg-primary/5 px-6 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-primary/10 hover:border-primary/30 hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-transform hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
