"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, ShieldAlert, Check } from "lucide-react";

export default function AlertsPage({ initialAlerts }: { initialAlerts: any[] }) {
  const [alerts, setAlerts] = useState(initialAlerts);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
          <p className="text-gray-500 text-sm mt-1">Review active warnings and critical system notifications.</p>
        </div>
        <button onClick={() => setAlerts([])} className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <Check className="w-4 h-4" /> Acknowledge All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              layout
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ delay: idx * 0.1 }}
            className={`p-5 rounded-xl border flex gap-4 ${
              alert.type === 'critical' ? 'bg-red-50 border-red-100' : 
              alert.type === 'warning' ? 'bg-orange-50 border-orange-100' : 
              'bg-blue-50 border-blue-100'
            }`}
          >
            <div className={`mt-1 ${
              alert.type === 'critical' ? 'text-red-500' : 
              alert.type === 'warning' ? 'text-orange-500' : 
              'text-blue-500'
            }`}>
              {alert.type === 'critical' ? <ShieldAlert className="w-6 h-6" /> : 
               alert.type === 'warning' ? <AlertTriangle className="w-6 h-6" /> : 
               <Info className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-bold ${
                  alert.type === 'critical' ? 'text-red-900' : 
                  alert.type === 'warning' ? 'text-orange-900' : 
                  'text-blue-900'
                }`}>{alert.title}</h3>
                <span className="text-xs font-medium text-gray-500">{alert.time}</span>
              </div>
              <p className={`text-sm mt-1 ${
                alert.type === 'critical' ? 'text-red-700' : 
                alert.type === 'warning' ? 'text-orange-700' : 
                'text-blue-700'
              }`}>{alert.message}</p>
              
              <div className="mt-4 flex gap-3">
                <button className="px-3 py-1.5 bg-white shadow-sm rounded border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Investigate
                </button>
                <button onClick={() => setAlerts(alerts.filter(a => a.id !== alert.id))} className="px-3 py-1.5 rounded text-xs font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Resolve
                </button>
              </div>
            </div>
          </motion.div>
          ))}
        </AnimatePresence>
        {alerts.length === 0 && (
          <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-100 text-gray-500 font-medium">
            No active alerts.
          </div>
        )}
      </div>
    </div>
  );
}
