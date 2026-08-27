"use client";

import { motion } from "framer-motion";
import { GitMerge, Plus, ArrowRight, Play, Settings } from "lucide-react";

export default function WorkflowsPage() {
  const workflows = [
    { name: "Standard License Approval", triggers: 450, avgTime: "2.4 Days", status: "Active" },
    { name: "Grievance Auto-Routing", triggers: 1240, avgTime: "15 Mins", status: "Active" },
    { name: "Payment Verification Sync", triggers: 3500, avgTime: "5 Secs", status: "Active" },
    { name: "Document Expiry Reminder", triggers: 120, avgTime: "-", status: "Paused" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation Workflows</h1>
          <p className="text-gray-500 text-sm mt-1">Design and manage automated routing and approval processes.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((wf, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between group hover:border-primary/30 transition-colors"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <GitMerge className="w-5 h-5" />
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${wf.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {wf.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{wf.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div><strong className="text-gray-900">{wf.triggers}</strong> Runs</div>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <div>Avg Time: <strong className="text-gray-900">{wf.avgTime}</strong></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex justify-center items-center gap-2">
                <Settings className="w-4 h-4" /> Edit
              </button>
              <button className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors flex justify-center items-center gap-2 ${wf.status === 'Active' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                <Play className="w-4 h-4" /> {wf.status === 'Active' ? 'Pause' : 'Resume'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
