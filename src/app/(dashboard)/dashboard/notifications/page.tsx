"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, FileText, Files, CreditCard, AlertTriangle, GraduationCap, CheckCircle2, Clock } from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { label: "All", icon: <Bell className="w-4 h-4" /> },
    { label: "Applications", icon: <FileText className="w-4 h-4" /> },
    { label: "Documents", icon: <Files className="w-4 h-4" /> },
    { label: "Payments", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Alerts", icon: <AlertTriangle className="w-4 h-4" /> },
    { label: "Schemes", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const notifications = [
    {
      id: 1,
      type: "Applications",
      title: "Application Update",
      message: "Your application GC-2026-001 is under process.",
      time: "10 Aug 2026, 10:30 AM",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      bg: "bg-green-100",
      dot: "bg-green-500",
    },
    {
      id: 2,
      type: "Documents",
      title: "Document Expiry Reminder",
      message: "Your Aadhaar card will expire in 45 days.",
      time: "09 Aug 2026, 09:15 AM",
      icon: <Clock className="w-5 h-5 text-yellow-600" />,
      bg: "bg-yellow-100",
      dot: "bg-yellow-500",
    },
    {
      id: 3,
      type: "Payments",
      title: "Payment Successful",
      message: "Payment of ₹1,200 for GC-2026-002 successful.",
      time: "08 Aug 2026, 02:20 PM",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-100",
      dot: "bg-blue-500",
    },
    {
      id: 4,
      type: "Schemes",
      title: "New Scheme Available",
      message: "PM Startup India Scheme is now open for registration.",
      time: "08 Aug 2026, 11:00 AM",
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-100",
      dot: "bg-purple-500",
    },
    {
      id: 5,
      type: "Alerts",
      title: "Alert",
      message: "Scheduled maintenance on 15 Aug 2026 (12 AM - 4 AM).",
      time: "07 Aug 2026, 06:00 PM",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      bg: "bg-red-100",
      dot: "bg-red-500",
    },
  ];

  const filteredNotifications = activeTab === "All" 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100 hide-scrollbar p-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.label 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={activeTab === tab.label ? "text-white" : "text-primary"}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div key={notification.id} className="p-6 hover:bg-gray-50/50 transition-colors flex gap-5 group cursor-pointer">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notification.bg}`}>
                    {notification.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400">{notification.time}</span>
                      <div className={`w-2 h-2 rounded-full ${notification.dot}`}></div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500 font-medium">
              No notifications found for {activeTab}.
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-center">
          <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
            View All Notifications &rarr;
          </button>
        </div>
      </motion.div>
    </div>
  );
}
