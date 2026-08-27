"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Star } from "lucide-react";

export default function GrievancePage() {
  const [activeTab, setActiveTab] = useState("My Grievances");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const grievances = [
    { id: "GRV-001", subject: "Delay in Application", status: "Under Review", date: "10 Aug 2026", statusColor: "text-orange-600 bg-orange-50 border-orange-200" },
    { id: "GRV-002", subject: "Document Verification", status: "Assigned", date: "09 Aug 2026", statusColor: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "GRV-003", subject: "Payment Issue", status: "Resolved", date: "08 Aug 2026", statusColor: "text-green-600 bg-green-50 border-green-200" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Grievance & Feedback</h1>
        <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm">
          <MessageSquarePlus className="w-4 h-4" /> Raise New Grievance
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Grievances Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6 pt-4 gap-6">
            {["My Grievances", "Feedback History"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-colors relative ${
                  activeTab === tab ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="grievance-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Subject</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Updated On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTab === "My Grievances" ? (
                  grievances.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 font-bold text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-700 group-hover:text-primary transition-colors">{item.subject}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                      No feedback history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {activeTab === "My Grievances" && (
            <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50">
              <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                View All Grievances &rarr;
              </button>
            </div>
          )}
        </motion.div>

        {/* Right Panel - Feedback */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-80 flex-shrink-0"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Rate Your Experience</h2>
            <p className="text-sm text-gray-500 font-medium mb-6">How was your overall experience?</p>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 transition-colors ${
                      (hoverRating || rating) >= star 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "fill-gray-100 text-gray-200"
                    }`} 
                  />
                </button>
              ))}
            </div>

            <button 
              disabled={rating === 0}
              className={`w-full py-3.5 rounded-xl font-bold transition-all ${
                rating > 0 
                  ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Feedback
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
