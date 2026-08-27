"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, Smartphone, FileText, Link as LinkIcon, Settings, Lock, CheckCircle2, Monitor, MapPin, Clock } from "lucide-react";

export default function SecurityPrivacyCenter() {
  const [activeTab, setActiveTab] = useState("Login Activity");

  const tabs = [
    { label: "Login Activity", icon: <Shield className="w-4 h-4" /> },
    { label: "Active Devices", icon: <Smartphone className="w-4 h-4" /> },
    { label: "Data Access", icon: <FileText className="w-4 h-4" /> },
    { label: "Consent History", icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: "Connected Depts", icon: <LinkIcon className="w-4 h-4" /> },
    { label: "Privacy Settings", icon: <Settings className="w-4 h-4" /> },
    { label: "2FA Settings", icon: <Key className="w-4 h-4" /> },
  ];

  const loginActivity = [
    { date: "10 Aug 2026, 10:30 AM", location: "Bhubaneswar, Odisha", status: "Successful", statusColor: "text-green-600" },
    { date: "09 Aug 2026, 08:22 PM", location: "Kolkata, West Bengal", status: "Successful", statusColor: "text-green-600" },
    { date: "08 Aug 2026, 09:15 AM", location: "Bhubaneswar, Odisha", status: "Successful", statusColor: "text-green-600" },
  ];

  const devices = [
    { name: "Windows • Chrome", location: "Bhubaneswar, Odisha", time: "This Device", type: "desktop" },
    { name: "Android • Mobile App", location: "Kolkata, West Bengal", time: "2 hrs ago", type: "mobile" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy Center</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 h-fit"
        >
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-colors text-left ${
                  activeTab === tab.label 
                    ? "bg-primary/5 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === tab.label ? "text-primary" : "text-gray-400"}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 space-y-6"
        >
          {activeTab === "Login Activity" ? (
            <>
              {/* Login Activity Table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Login Activity</h2>
                  <button className="text-sm font-bold text-primary hover:text-primary/80">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-100">
                      {loginActivity.map((activity, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{activity.date}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 font-medium">{activity.location}</td>
                          <td className="px-6 py-4 text-right font-semibold text-green-600">{activity.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Devices */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Active Devices</h2>
                </div>
                <div className="divide-y divide-gray-100 p-2">
                  {devices.map((device, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                          {device.type === 'desktop' ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 mb-0.5">{device.name}</div>
                          <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {device.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {device.time}</span>
                          </div>
                        </div>
                      </div>
                      {device.time === "This Device" && (
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">This Device</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Two-Factor Auth</h3>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Enabled</span>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Session Timeout</h3>
                  <span className="text-xs font-bold text-gray-600">15 mins</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Data Sharing</h3>
                  <span className="text-xs font-bold text-gray-600">Your Control</span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Settings className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{activeTab}</h3>
              <p className="text-gray-500 text-sm max-w-sm">This section is currently under development. Please check back later for updates.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
