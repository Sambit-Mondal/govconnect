"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Key, Smartphone, FileText, Link as LinkIcon, Settings, Lock, CheckCircle2, Monitor, MapPin, Clock } from "lucide-react";

export default function SecurityPrivacyCenter({ 
  initialConsents, 
  initialLogins, 
  twoFactorEnabled 
}: { 
  initialConsents: any[]; 
  initialLogins: any[]; 
  twoFactorEnabled: boolean; 
}) {
  const [activeTab, setActiveTab] = useState("Login Activity");
  const [is2FAEnabled, setIs2FAEnabled] = useState(twoFactorEnabled);

  const tabs = [
    { label: "Login Activity", icon: <Shield className="w-4 h-4" /> },
    { label: "Active Devices", icon: <Smartphone className="w-4 h-4" /> },
    { label: "Data Access", icon: <FileText className="w-4 h-4" /> },
    { label: "Consent History", icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: "Connected Depts", icon: <LinkIcon className="w-4 h-4" /> },
    { label: "Privacy Settings", icon: <Settings className="w-4 h-4" /> },
    { label: "2FA Settings", icon: <Key className="w-4 h-4" /> },
  ];

  const devices = [
    { name: "Windows • Chrome", location: "Bhubaneswar, Odisha", time: "This Device", type: "desktop" },
    { name: "Android • Mobile App", location: "Kolkata, West Bengal", time: "2 hrs ago", type: "mobile" },
  ];

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    alert(`2FA has been ${!is2FAEnabled ? 'enabled' : 'disabled'}.`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
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
          <AnimatePresence mode="wait">
            {activeTab === "Login Activity" && (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Login Activity</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <tbody className="divide-y divide-gray-100">
                        {initialLogins.length === 0 ? (
                          <tr><td className="p-6 text-center text-gray-500" colSpan={3}>No recent login activity found.</td></tr>
                        ) : initialLogins.map((activity, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900">{activity.date}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-medium">IP: {activity.location}</td>
                            <td className={`px-6 py-4 text-right font-semibold ${activity.statusColor}`}>{activity.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Consent History" && (
              <motion.div key="consent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Consent History</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Department</th>
                          <th className="px-6 py-4 font-semibold">Purpose</th>
                          <th className="px-6 py-4 font-semibold">Date</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {initialConsents.length === 0 ? (
                          <tr><td className="p-6 text-center text-gray-500" colSpan={4}>No consent history found.</td></tr>
                        ) : initialConsents.map((consent, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900">{consent.department}</td>
                            <td className="px-6 py-4 text-gray-500">{consent.purpose}</td>
                            <td className="px-6 py-4 text-gray-500">{consent.date}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${
                                consent.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-600 bg-gray-50 border-gray-200'
                              }`}>
                                {consent.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "2FA Settings" && (
              <motion.div key="2fa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${is2FAEnabled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
                      <p className="text-gray-500 text-sm mt-1">Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900">Authenticator App</p>
                        <p className="text-sm text-gray-500">Use an app like Google Authenticator or Authy.</p>
                      </div>
                      <button 
                        onClick={toggle2FA}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${is2FAEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                      >
                        <span className={`${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    When 2FA is enabled, you will be required to enter a time-sensitive code from your authenticator app each time you sign in to your GovConnect account.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Fallback for other tabs */}
            {!["Login Activity", "Consent History", "2FA Settings"].includes(activeTab) && (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Settings className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{activeTab}</h3>
                  <p className="text-gray-500 text-sm max-w-sm">This section is currently under development. Please check back later for updates.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
