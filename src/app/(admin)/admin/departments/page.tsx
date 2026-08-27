"use client";

import { motion } from "framer-motion";
import { Building2, Plus, MoreVertical, Users, FileText } from "lucide-react";

export default function DepartmentsPage() {
  const departments = [
    { id: "DEPT-01", name: "Ministry of Road Transport", services: 12, users: 450, status: "Active" },
    { id: "DEPT-02", name: "Department of Revenue", services: 8, users: 1250, status: "Active" },
    { id: "DEPT-03", name: "Health Services", services: 24, users: 890, status: "Active" },
    { id: "DEPT-04", name: "Municipal Corporation", services: 45, users: 3200, status: "Maintenance" },
    { id: "DEPT-05", name: "Education Board", services: 15, users: 670, status: "Active" },
    { id: "DEPT-06", name: "Police Department", services: 6, users: 2100, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage onboarded government departments and agencies.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <motion.div 
            key={dept.id}
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="p-5 border-b border-gray-50 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-gray-400">{dept.id}</span>
                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${dept.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {dept.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">{dept.name}</h3>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-gray-900">{dept.services}</strong> Services</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span><strong className="text-gray-900">{dept.users}</strong> Officials</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
