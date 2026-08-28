"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, XCircle, Clock, Search, Filter, X } from "lucide-react";
import { approveApplication, rejectApplication } from "../../../actions/applicationActions";

export default function ApplicationsClient({ initialApplications }: { initialApplications: any[] }) {
  const [activeTab, setActiveTab] = useState("Pending Requests");
  const [isPending, startTransition] = useTransition();
  
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingApps = initialApplications.filter(app => app.status === "pending");
  const completedApps = initialApplications.filter(app => app.status === "approved" || app.status === "rejected");

  const displayApps = activeTab === "Pending Requests" ? pendingApps : completedApps;

  const handleApprove = (id: number) => {
    startTransition(async () => {
      await approveApplication(id);
      setSelectedApp(null);
    });
  };

  const handleReject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedApp) return;
    startTransition(async () => {
      await rejectApplication(selectedApp.id, rejectReason);
      setSelectedApp(null);
      setRejectReason("");
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">Review and process citizen applications and requests.</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("Pending Requests")}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "Pending Requests" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending Requests ({pendingApps.length})
        </button>
        <button
          onClick={() => setActiveTab("Approvals/Rejections")}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "Approvals/Rejections" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Approvals/Rejections ({completedApps.length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="py-4 px-6 font-semibold">Application ID</th>
                <th className="py-4 px-6 font-semibold">Applicant</th>
                <th className="py-4 px-6 font-semibold">Service</th>
                <th className="py-4 px-6 font-semibold">Date</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayApps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-mono text-gray-600">APP-{app.id}</td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{app.applicant}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{app.service}</p>
                    <p className="text-xs text-gray-500">{app.department}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{app.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'approved' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelectedApp(app)}
                      className="text-primary hover:text-primary/80 text-sm font-semibold"
                    >
                      {activeTab === "Pending Requests" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
              {displayApps.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No applications found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Review Application</h2>
                  <p className="text-sm text-gray-500 font-mono mt-1">APP-{selectedApp.id}</p>
                </div>
                <button onClick={() => { setSelectedApp(null); setRejectReason(""); }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Applicant</p>
                    <p className="text-sm text-gray-900">{selectedApp.applicant}</p>
                    <p className="text-sm text-gray-500">{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Service</p>
                    <p className="text-sm text-gray-900">{selectedApp.service}</p>
                    <p className="text-sm text-gray-500">{selectedApp.department}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Submitted Data</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                    {Object.keys(selectedApp.data).length > 0 ? (
                      Object.entries(selectedApp.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}: </span>
                          <span className="text-sm text-gray-900">{String(value)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No additional data provided.</p>
                    )}
                  </div>
                </div>

                {selectedApp.status === "rejected" && selectedApp.rejectionReason && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Rejection Reason</p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-800 text-sm">
                      {selectedApp.rejectionReason}
                    </div>
                  </div>
                )}

                {selectedApp.status === "pending" && (
                  <form id="reject-form" onSubmit={handleReject} className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Rejection (Optional)</label>
                    <textarea 
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="If rejecting, please provide a reason..."
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none h-24"
                    />
                  </form>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                {selectedApp.status === "pending" ? (
                  <>
                    <button 
                      type="submit" 
                      form="reject-form"
                      disabled={isPending}
                      className="px-4 py-2 text-red-600 bg-red-50 font-semibold hover:bg-red-100 rounded-lg disabled:opacity-50 transition-colors"
                    >
                      {isPending ? "Processing..." : "Reject"}
                    </button>
                    <button 
                      onClick={() => handleApprove(selectedApp.id)}
                      disabled={isPending}
                      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {isPending ? "Processing..." : "Approve"}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
