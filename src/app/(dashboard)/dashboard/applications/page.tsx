"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, CheckCircle2, Clock, XCircle, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const applications = [
    { id: "GC-2026-001", name: "Business Registration", date: "10 Aug 2026", status: "In Progress", statusColor: "text-blue-600 bg-blue-50 border-blue-200", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "GC-2026-002", name: "Trade License Renewal", date: "05 Aug 2026", status: "Approved", statusColor: "text-green-600 bg-green-50 border-green-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "GC-2026-003", name: "Fire NOC", date: "28 Jul 2026", status: "Rejected", statusColor: "text-red-600 bg-red-50 border-red-200", icon: <XCircle className="w-3.5 h-3.5" /> },
    { id: "GC-2026-004", name: "Food License (FSSAI)", date: "15 Jul 2026", status: "Approved", statusColor: "text-green-600 bg-green-50 border-green-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  const filteredApps = activeTab === "All" 
    ? applications 
    : applications.filter(app => app.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
          New Application
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Name..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-2 pt-2">
          {["All", "In Progress", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
                activeTab === tab ? "text-primary" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="app-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Application ID</th>
                <th className="px-6 py-4 font-semibold">Service Name</th>
                <th className="px-6 py-4 font-semibold">Submitted On</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    {app.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${app.statusColor}`}>
                      {app.icon} {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/applications/${app.id}`} className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredApps.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No applications found for {activeTab}.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
