"use client";

import { motion } from "framer-motion";
import { Activity, Server, Zap, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function AdminMonitoringDashboard() {
  const trafficData = [
    { time: "00:00", requests: 1200 },
    { time: "04:00", requests: 800 },
    { time: "08:00", requests: 3500 },
    { time: "12:00", requests: 5800 },
    { time: "16:00", requests: 4200 },
    { time: "20:00", requests: 2900 },
    { time: "24:00", requests: 1500 },
  ];

  const systems = [
    { name: "Authentication API", status: "Operational", uptime: "99.99%" },
    { name: "Main Database", status: "Operational", uptime: "99.95%" },
    { name: "Storage Service", status: "Degraded", uptime: "98.50%" },
    { name: "Payment Gateway", status: "Operational", uptime: "99.99%" },
  ];

  const alerts = [
    { id: 1, message: "High CPU usage detected on DB-01", time: "10 mins ago", type: "warning" },
    { id: 2, message: "Storage Service latency > 200ms", time: "25 mins ago", type: "error" },
    { id: 3, message: "Nightly backup completed successfully", time: "3 hours ago", type: "success" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Monitoring Dashboard</h1>
          <p className="text-gray-500">Real-time overview of GovConnect infrastructure</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-bold text-sm">All Systems Nominal</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-5 h-5" /></div>
            <h3 className="font-bold">Total API Requests</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-1">1.2M</div>
          <p className="text-sm text-green-600 font-bold flex items-center gap-1">
            ↑ 12% <span className="text-gray-500 font-medium">vs last 24h</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <div className="p-2 bg-green-50 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
            <h3 className="font-bold">Global Success Rate</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-1">99.9%</div>
          <p className="text-sm text-gray-500 font-medium">Target: 99.99%</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <div className="p-2 bg-orange-50 rounded-lg"><Zap className="w-5 h-5" /></div>
            <h3 className="font-bold">Average Latency</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-1">45ms</div>
          <p className="text-sm text-green-600 font-bold flex items-center gap-1">
            ↓ 5ms <span className="text-gray-500 font-medium">vs last 24h</span>
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6">API Traffic Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Side - System Health & Alerts */}
        <div className="space-y-6">
          {/* System Health */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-gray-500" /> System Health
            </h2>
            <div className="space-y-4">
              {systems.map((sys, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{sys.name}</div>
                    <div className="text-xs text-gray-500 font-medium">Uptime: {sys.uptime}</div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    sys.status === 'Operational' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                  }`}>
                    {sys.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex gap-3 items-start">
                  <div className={`mt-0.5 ${
                    alert.type === 'warning' ? 'text-orange-500' : alert.type === 'error' ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : alert.type === 'error' ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${
                      alert.type === 'warning' ? 'text-orange-800' : alert.type === 'error' ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
