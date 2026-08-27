"use client";

import { motion } from "framer-motion";
import { Plug, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export default function AdaptersPage() {
  const adapters = [
    { name: "UIDAI Aadhaar KYC", provider: "Gov.in", status: "Connected", ping: "24ms", lastSync: "1 min ago" },
    { name: "DigiLocker Integration", provider: "MeitY", status: "Connected", ping: "45ms", lastSync: "5 mins ago" },
    { name: "SMS Gateway (NIC)", provider: "NIC", status: "Degraded", ping: "850ms", lastSync: "12 mins ago" },
    { name: "Payment Gateway (Razorpay)", provider: "Razorpay", status: "Connected", ping: "18ms", lastSync: "Syncing..." },
    { name: "Vahan DB Fetch", provider: "MoRTH", status: "Disconnected", ping: "-", lastSync: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Adapters</h1>
          <p className="text-gray-500 text-sm mt-1">Manage third-party integrations and external data sources.</p>
        </div>
        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Sync All
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Adapter Name</th>
                <th className="px-6 py-4 font-semibold">Provider</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Latency</th>
                <th className="px-6 py-4 font-semibold">Last Sync</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adapters.map((adapter, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}
                  key={idx} className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Plug className="w-4 h-4" />
                    </div>
                    {adapter.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{adapter.provider}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {adapter.status === "Connected" ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertCircle className={`w-4 h-4 ${adapter.status === 'Degraded' ? 'text-orange-500' : 'text-red-500'}`} />}
                      <span className={`font-semibold ${adapter.status === "Connected" ? 'text-green-600' : adapter.status === 'Degraded' ? 'text-orange-600' : 'text-red-600'}`}>
                        {adapter.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500">{adapter.ping}</td>
                  <td className="px-6 py-4 text-gray-500">{adapter.lastSync}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary font-semibold hover:text-primary/80 transition-colors">Configure</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
