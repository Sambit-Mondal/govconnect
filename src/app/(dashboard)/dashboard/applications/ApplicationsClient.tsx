"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, CheckCircle2, Clock, XCircle, Eye, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ApplicationsPage({ initialApplications }: { initialApplications: any[] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredApps = initialApplications.filter(app => {
    const matchesTab = activeTab === "All" || app.status === activeTab;
    const matchesSearch = app.id.toString().includes(searchQuery) || app.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <button 
          onClick={() => router.push('/dashboard/services')}
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 justify-center"
        >
          <Plus className="w-4 h-4" /> New Application
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or Service Name..."
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
                  <td className="px-6 py-4 font-bold text-gray-900">APP-{app.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    {app.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${
                      app.status === 'Approved' ? 'text-green-600 bg-green-50 border-green-200' :
                      app.status === 'Rejected' ? 'text-red-600 bg-red-50 border-red-200' :
                      'text-blue-600 bg-blue-50 border-blue-200'
                    }`}>
                      {app.status === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                       app.status === 'Rejected' ? <XCircle className="w-3.5 h-3.5" /> : 
                       <Clock className="w-3.5 h-3.5" />} {app.status}
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
              No applications found matching your criteria.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
