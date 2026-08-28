"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Check, Circle, Search, Bot, Vault, FileSearch, MessageSquareWarning, MapPin } from "lucide-react";

export default function CitizenDashboard() {
  const stats = [
    { label: "Applications In Progress", value: 2, icon: <FileText className="w-5 h-5 text-blue-500" />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Applications Approved", value: 1, icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Applications Rejected", value: 0, icon: <XCircle className="w-5 h-5 text-red-500" />, color: "text-red-600", bg: "bg-red-50" },
    { label: "Active Consents", value: 3, icon: <ShieldCheck className="w-5 h-5 text-orange-500" />, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Pending Payments", value: "₹1,200", isPayment: true, color: "text-gray-900", bg: "bg-white" },
  ];

  const applications = [
    { id: "GC-2026-001", service: "Land Record", status: "In Progress", updatedOn: "10 Aug 2026", statusColor: "text-blue-600 bg-blue-50" },
    { id: "GC-2026-002", service: "Certificate", status: "Approved", updatedOn: "09 Aug 2026", statusColor: "text-green-600 bg-green-50" },
    { id: "GC-2026-003", service: "Business Reg.", status: "Submitted", updatedOn: "08 Aug 2026", statusColor: "text-orange-600 bg-orange-50" },
  ];

  const quickActions = [
    { icon: <Search className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />, label: "Smart Service Finder", href: "/dashboard/services" },

    { icon: <Vault className="w-6 h-6 text-blue-600/70 group-hover:text-blue-600 transition-colors" />, label: "Document Vault", href: "/dashboard/documents" },
    { icon: <FileSearch className="w-6 h-6 text-green-600/70 group-hover:text-green-600 transition-colors" />, label: "Scheme Checker", href: "/dashboard/schemes" },
    { icon: <MessageSquareWarning className="w-6 h-6 text-red-600/70 group-hover:text-red-600 transition-colors" />, label: "Grievance", href: "/dashboard/grievances" },
    { icon: <MapPin className="w-6 h-6 text-orange-600/70 group-hover:text-orange-600 transition-colors" />, label: "Nearby Offices", href: "/dashboard/nearby" },
  ];

  const timeline = [
    { title: "Submitted", active: true, completed: true },
    { title: "Department A Verification", active: true, completed: true },
    { title: "Department B Processing", active: true, completed: false },
    { title: "Final Approval", active: false, completed: false },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-shadow ${stat.isPayment ? 'col-span-1 lg:col-span-1 border-orange-100 bg-orange-50/10' : ''}`}
          >
            <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-medium text-gray-500 mb-2">{stat.label}</div>
            {stat.isPayment && (
              <button className="mt-1 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-md shadow-sm transition-colors">
                Pay Now
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">My Applications</h2>
          </div>
          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Application ID</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Updated On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{app.id}</td>
                    <td className="px-6 py-4 text-gray-600">{app.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{app.updatedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100">
            <Link href="/dashboard/applications" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center transition-colors">
              View All Applications <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>

        {/* Application Progress & Notifications */}
        <div className="space-y-6">
          {/* Progress Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">Application Progress</h2>
            <p className="text-sm text-gray-500 font-medium mb-6">GC-2026-001</p>
            
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute -left-[11px] bg-white rounded-full ${step.completed ? 'text-green-500' : step.active ? 'text-blue-500' : 'text-gray-300'}`}>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 fill-white" />
                    ) : step.active ? (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 stroke-[2]" />
                    )}
                  </div>
                  <h3 className={`text-sm font-medium ${step.active || step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col"
          >
            <div className="p-6 pb-2">
              <h2 className="text-lg font-bold text-gray-900">Recent Notifications</h2>
            </div>
            <div className="p-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  Your application GC-2026-001 is under process at Department B.
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  Consent request from Department C.
                </li>
              </ul>
            </div>
            <div className="p-4 border-t border-gray-100 text-right">
              <Link href="/dashboard/notifications" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                View All
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, idx) => (
            <Link key={idx} href={action.href}>
              <div className="flex flex-col items-center justify-center text-center p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md hover:bg-gray-50/50 cursor-pointer transition-all group h-full">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-all border border-gray-100 group-hover:border-primary/10">
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
