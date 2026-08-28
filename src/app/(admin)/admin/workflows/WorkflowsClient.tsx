"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitMerge, Plus, ArrowRight, Play, Settings } from "lucide-react";

export default function WorkflowsClient({ initialWorkflows }: { initialWorkflows: any[] }) {
  const [workflows, setWorkflows] = useState(initialWorkflows);

  const toggleStatus = (id: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === id) {
        return { ...wf, status: wf.status === 'Active' ? 'Paused' : 'Active' };
      }
      return wf;
    }));
  };

  const createWorkflow = () => {
    const name = prompt("Enter workflow name:");
    if (name) {
      setWorkflows(prev => [
        { id: Date.now().toString(), name, triggers: 0, avgTime: "-", status: "Active" },
        ...prev
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Automation Workflows</h1>
          <p className="text-gray-500 text-sm mt-1">Design and manage automated routing and approval processes.</p>
        </div>
        <button onClick={createWorkflow} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {workflows.map((wf, idx) => (
            <motion.div 
              key={wf.id}
              layout
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between group hover:border-primary/30 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <GitMerge className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${wf.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
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
                <button 
                  onClick={() => toggleStatus(wf.id)}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-colors flex justify-center items-center gap-2 ${wf.status === 'Active' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                >
                  <Play className="w-4 h-4" /> {wf.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {workflows.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-500 font-medium">
            No workflows configured.
          </div>
        )}
      </div>
    </div>
  );
}
