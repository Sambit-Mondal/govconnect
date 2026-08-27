"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, FileText, Files, ShieldCheck, Settings, Edit3, Briefcase, Camera } from "lucide-react";

export default function ProfileUI({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "personal", label: "Personal Details", icon: <Briefcase className="w-4 h-4" /> },
    { id: "documents", label: "Linked Documents", icon: <Files className="w-4 h-4" /> },
    { id: "applications", label: "Active Applications", icon: <FileText className="w-4 h-4" /> },
    { id: "consents", label: "Active Consents", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Settings className="w-4 h-4" /> },
  ];

  const stats = [
    { label: "Active Applications", value: 2 },
    { label: "Active Consents", value: 3 },
    { label: "Documents", value: 12 },
    { label: "Schemes Applied", value: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* Left Panel - Profile Card & Nav */}
      <div className="w-full md:w-72 flex-shrink-0 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-primary rounded-xl overflow-hidden shadow-lg relative"
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm text-primary hover:bg-gray-50 transition-colors">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user?.name || "Citizen"}</h2>
            <p className="text-sm text-white/80 font-medium">{user?.email || "Email not provided"}</p>
            <p className="text-sm text-white/80 font-medium mb-4">Role: <span className="capitalize">{user?.role || "Citizen"}</span></p>
            
            <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-full text-white text-xs font-semibold">
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-2"
        >
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                  activeTab === tab.id 
                    ? "bg-primary/5 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === tab.id ? "text-primary" : "text-gray-400"}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Right Panel - Content Area */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]"
        >
          {activeTab === "overview" && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <div className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
                  <p className="text-base text-gray-900 font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  <p className="text-base text-gray-900 font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Role</p>
                  <p className="text-base text-gray-900 font-medium capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">User ID</p>
                  <p className="text-base text-gray-900 font-medium tracking-widest">{user?.id}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="p-8 flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Content Unavailable</h3>
                <p className="text-gray-500 text-sm max-w-sm">This section is currently under development. Please check back later for updates.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
}
