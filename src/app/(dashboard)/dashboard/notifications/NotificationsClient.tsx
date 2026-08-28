"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, FileText, Files, CreditCard, AlertTriangle, GraduationCap, CheckCircle2, Clock } from "lucide-react";
import io from "socket.io-client";

export default function NotificationsPage({ initialNotifications, userId }: { initialNotifications: any[], userId: number }) {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState(initialNotifications);

  const tabs = [
    { label: "All", icon: <Bell className="w-4 h-4" /> },
    { label: "Applications", icon: <FileText className="w-4 h-4" /> },
    { label: "Documents", icon: <Files className="w-4 h-4" /> },
    { label: "Payments", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Alerts", icon: <AlertTriangle className="w-4 h-4" /> },
    { label: "Schemes", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  useEffect(() => {
    // Connect to socket server
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("join", userId);
    });

    socket.on("new_notification", (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const filteredNotifications = activeTab === "All" 
    ? notifications 
    : notifications.filter((n: any) => n.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
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
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notification.bg || 'bg-blue-100 text-blue-600'}`}>
                    {notification.icon || <Bell className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400">{notification.time}</span>
                      <div className={`w-2 h-2 rounded-full ${notification.dot || 'bg-blue-500'}`}></div>
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
      </motion.div>
    </div>
  );
}
