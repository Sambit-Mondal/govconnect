"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Plus, MoreVertical, Users, FileText, X, Edit2, Trash2 } from "lucide-react";
import { addDepartment, editDepartment, deleteDepartment } from "../../../actions/departmentActions";

export default function DepartmentsPage({ initialDepartments }: { initialDepartments: any[] }) {
  const departments = initialDepartments;
  
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveDept = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      if (modalMode === "add") {
        await addDepartment(formData);
      } else if (modalMode === "edit" && selectedDept) {
        await editDepartment(selectedDept.rawId, formData);
      }
      setModalMode(null);
      setSelectedDept(null);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteDepartment(id);
      setDeleteConfirmId(null);
      setMenuOpenId(null);
    });
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage onboarded government departments and agencies.</p>
        </div>
        <button onClick={() => { setModalMode("add"); setSelectedDept(null); }} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <motion.div 
            key={dept.rawId}
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-visible group relative"
          >
            <div className="p-5 border-b border-gray-50 flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setMenuOpenId(menuOpenId === dept.rawId ? null : dept.rawId)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                
                {menuOpenId === dept.rawId && (
                  <div ref={menuRef} className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20">
                    <button 
                      onClick={() => { setModalMode("edit"); setSelectedDept(dept); setMenuOpenId(null); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" /> Edit
                    </button>
                    <button 
                      onClick={() => { setDeleteConfirmId(dept.rawId); setMenuOpenId(null); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" /> Delete
                    </button>
                  </div>
                )}
              </div>
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

            {/* Delete Confirmation Overlay */}
            {deleteConfirmId === dept.rawId && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-center items-center text-center z-10 border border-red-100">
                <Trash2 className="w-8 h-8 text-red-500 mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Delete Department?</h4>
                <p className="text-xs text-gray-500 mb-4">This action cannot be undone.</p>
                <div className="flex gap-2 w-full">
                  <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200">Cancel</button>
                  <button onClick={() => handleDelete(dept.rawId)} disabled={isPending} className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">
                    {isPending ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">{modalMode === "add" ? "Add Department" : "Edit Department"}</h2>
                <button onClick={() => { setModalMode(null); setSelectedDept(null); }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSaveDept} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department Name</label>
                  <input required name="name" defaultValue={selectedDept?.name || ""} type="text" placeholder="e.g. Health Services" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department Code</label>
                  <input required name="code" defaultValue={selectedDept?.id || ""} type="text" placeholder="e.g. DEPT-07" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                {modalMode === "edit" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select name="is_active" defaultValue={selectedDept?.status === "Active" ? "true" : "false"} className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                )}
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => { setModalMode(null); setSelectedDept(null); }} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isPending} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50">
                    {isPending ? "Saving..." : "Save Department"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
