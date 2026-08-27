"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, ShieldCheck, Cpu, HardDrive } from "lucide-react";

export default function SystemHealthPage() {
  const systems = [
    { name: "PostgreSQL Database", status: "Healthy", uptime: "99.99%", load: "42%", icon: <Database className="w-6 h-6" /> },
    { name: "Redis Cache", status: "Healthy", uptime: "100%", load: "12%", icon: <Server className="w-6 h-6" /> },
    { name: "Edge Network", status: "Healthy", uptime: "99.98%", load: "28%", icon: <Cloud className="w-6 h-6" /> },
    { name: "Authentication Service", status: "Healthy", uptime: "100%", load: "5%", icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Health</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor the operational status of all platform services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Infrastructure */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900">Core Services</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {systems.map((sys, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    {sys.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{sys.name}</h4>
                    <p className="text-sm text-gray-500">Uptime: {sys.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full bg-green-50 text-green-700 border border-green-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    {sys.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Load: {sys.load}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resource Usage */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent flex items-center justify-center text-primary relative animate-spin" style={{ animationDuration: '3s' }}>
            </div>
            <div className="absolute ml-4"><Cpu className="w-6 h-6 text-primary" /></div>
            <div className="ml-16">
              <h3 className="text-gray-500 text-sm font-semibold">Average CPU Usage</h3>
              <p className="text-3xl font-bold text-gray-900">24%</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
             <div className="w-14 h-14 rounded-full border-4 border-blue-500 border-r-transparent flex items-center justify-center text-blue-500 relative">
            </div>
            <div className="absolute ml-4"><HardDrive className="w-6 h-6 text-blue-500" /></div>
            <div className="ml-16">
              <h3 className="text-gray-500 text-sm font-semibold">Storage Capacity</h3>
              <p className="text-3xl font-bold text-gray-900">68% <span className="text-sm font-medium text-gray-500">of 5TB</span></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
