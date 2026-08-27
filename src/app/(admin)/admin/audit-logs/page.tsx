"use client";

import { motion } from "framer-motion";
import { FileText, Search, Filter, Download } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    { id: "LOG-9281", user: "Admin (admin@gov.in)", action: "Updated System Settings", entity: "Configuration", ip: "10.0.0.5", time: "2 mins ago" },
    { id: "LOG-9280", user: "System (Auto)", action: "Triggered Daily Backup", entity: "Database", ip: "127.0.0.1", time: "1 hour ago" },
    { id: "LOG-9279", user: "John Doe (ID: 45)", action: "Deleted Application GC-002", entity: "Application", ip: "192.168.1.12", time: "3 hours ago" },
    { id: "LOG-9278", user: "Ravi Kumar (Official)", action: "Approved Document 892", entity: "Document", ip: "10.0.1.20", time: "5 hours ago" },
    { id: "LOG-9277", user: "Admin (admin@gov.in)", action: "Added New Department", entity: "Department", ip: "10.0.0.5", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Track system-wide administrative and user activities.</p>
        </div>
        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search logs..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Log ID</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Entity</th>
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{log.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                  <td className="px-6 py-4 text-gray-700">{log.action}</td>
                  <td className="px-6 py-4 text-gray-500">{log.entity}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.ip}</td>
                  <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
