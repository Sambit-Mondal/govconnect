"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Files, ShieldCheck, Settings, Edit3, Briefcase, Camera, Save, X } from "lucide-react";

export default function ProfileUI({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "personal", label: "Personal Details", icon: <Briefcase className="w-4 h-4" /> },
    { id: "documents", label: "Linked Documents", icon: <Files className="w-4 h-4" /> },
    { id: "applications", label: "Active Applications", icon: <FileText className="w-4 h-4" /> },
    { id: "consents", label: "Active Consents", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Settings className="w-4 h-4" /> },
  ];

  const stats = [
    { label: "Active Applications", value: user?.applications?.filter((a: any) => a.status === 'processing').length || 0 },
    { label: "Active Consents", value: user?.data_consents?.filter((c: any) => c.status === 'active').length || 0 },
    { label: "Documents", value: user?.documents?.length || 0 },
    { label: "Total Applications", value: user?.applications?.length || 0 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
    // In a real app, this would trigger a server action or API call to update the database
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 pb-20">
      
      {/* Left Panel - Profile Card & Nav */}
      <div className="w-full md:w-72 flex-shrink-0 space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-primary rounded-xl overflow-hidden shadow-lg relative"
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm text-primary hover:bg-gray-50 transition-colors">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{formData.name || "Citizen"}</h2>
            <p className="text-sm text-white/80 font-medium">{formData.email || "Email not provided"}</p>
            <p className="text-sm text-white/80 font-medium mb-4">Role: <span className="capitalize">{user?.role || "Citizen"}</span></p>
            
            <button 
              onClick={() => { setActiveTab("personal"); setIsEditing(true); }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-full text-white text-xs font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-2"
        >
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id !== "personal") setIsEditing(false); }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                  activeTab === tab.id 
                    ? "bg-primary/5 text-primary" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === tab.id ? "text-primary" : "text-gray-400"}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Right Panel - Content Area */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]"
        >
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Overview</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                      <div className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">{stat.label}</div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
                    <p className="text-base text-gray-900 font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                    <p className="text-base text-gray-900 font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Role</p>
                    <p className="text-base text-gray-900 font-medium capitalize">{user?.role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">User ID</p>
                    <p className="text-base text-gray-900 font-medium tracking-widest">{user?.id}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "personal" && (
              <motion.div key="personal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-bold bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      Edit Details
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-sm font-bold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "documents" && (
              <motion.div key="documents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Linked Documents</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Document Name</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Uploaded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {user?.documents?.length === 0 ? (
                        <tr><td colSpan={4} className="p-6 text-center text-gray-500">No documents linked yet.</td></tr>
                      ) : (
                        user?.documents?.map((doc: any) => (
                          <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-primary" /> {doc.name}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{doc.type}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-50 text-green-600 border border-green-200">
                                {doc.verification_status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "consents" && (
              <motion.div key="consents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Active Consents</h2>
                <div className="space-y-4">
                  {user?.data_consents?.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 border rounded-xl border-dashed">No active consents found.</div>
                  ) : (
                    user?.data_consents?.map((consent: any) => (
                      <div key={consent.id} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{consent.department?.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{consent.purpose}</p>
                          <span className="text-xs font-semibold text-gray-400">Granted: {new Date(consent.granted_at).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${consent.status === 'active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {consent.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* Fallback for un-implemented tabs */}
            {!["overview", "personal", "documents", "consents"].includes(activeTab) && (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Settings className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">{activeTab.replace('_', ' ')}</h3>
                  <p className="text-gray-500 text-sm max-w-sm">This section is currently under development. Please check back later for updates.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
