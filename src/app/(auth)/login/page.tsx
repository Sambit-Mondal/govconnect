"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, User, Lock, Globe, Fingerprint, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"citizen" | "official">("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Save token to localStorage or cookie
        localStorage.setItem("token", data.token);
        if (data.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-12 px-4 bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <Building2 className="h-10 w-10 text-primary mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome to Sangam</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Single Sign-On</p>
          </div>

          <div className="flex w-full mb-8 border-b">
            <button
              onClick={() => setActiveTab("citizen")}
              className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === "citizen" ? "text-primary" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Citizen / Business
              {activeTab === "citizen" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("official")}
              className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === "official" ? "text-primary" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Department Official
              {activeTab === "official" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                placeholder="Mobile / Email / Username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 mt-6"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">New User? </span>
            <Link href="/register" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              Register
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500 font-medium mb-4 uppercase tracking-wider">
            Login with
          </p>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm gap-2 text-sm text-gray-600 font-medium">
              <Fingerprint className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Aadhaar</span>
            </button>
            <button className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm gap-2 text-sm text-gray-600 font-medium">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="hidden sm:inline">Google</span>
            </button>
            <button className="flex items-center justify-center py-2 px-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-sm gap-2 text-sm text-gray-600 font-medium">
              <Smartphone className="w-4 h-4 text-green-500" />
              <span className="hidden sm:inline">Mobile OTP</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
