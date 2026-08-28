"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, Clock, Eye, Download, Trash2, Shield, Share2, Timer, History, X } from "lucide-react";
import { uploadDocument, deleteDocument } from "../../../actions/documentActions";

export default function DocumentVaultPage({ initialDocuments }: { initialDocuments: any[] }) {
  const [activeTab, setActiveTab] = useState("All Documents");

  const tabs = ["All Documents", "Identity", "Address", "Business", "Property", "Other"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await uploadDocument(formData);
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteDocument(id);
    });
  };

  const handleSimulateAction = (action: string, docName: string) => {
    alert(`Simulating ${action} for ${docName}. In a real app, this would open a PDF viewer or trigger a file download.`);
  };

  const documents = initialDocuments;

  const filteredDocs = activeTab === "All Documents" 
    ? documents 
    : documents.filter(doc => doc.type === activeTab);

  const features = [
    { icon: <Shield className="w-5 h-5" />, label: "Secure Storage" },
    { icon: <Share2 className="w-5 h-5" />, label: "Share Securely" },
    { icon: <Timer className="w-5 h-5" />, label: "Set Expiry" },
    { icon: <History className="w-5 h-5" />, label: "Access History" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">My Document Vault</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 justify-center shadow-sm">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab ? "text-primary" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="doc-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Document</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Uploaded On</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    {doc.name}
                  </td>
                  <td className="px-6 py-4">{doc.type}</td>
                  <td className="px-6 py-4">{doc.uploadedOn}</td>
                  <td className="px-6 py-4">
                    {doc.status === "Verified" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleSimulateAction('viewing', doc.name)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSimulateAction('downloading', doc.name)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        disabled={isPending}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocs.length === 0 && (
            <div className="p-8 text-center text-gray-500">No documents found in this category.</div>
          )}
        </div>
      </motion.div>

      {/* Vault Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Vault Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:text-primary text-gray-600 transition-colors">
                {feature.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700">{feature.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleUpload} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Document Name</label>
                  <input required name="name" type="text" placeholder="e.g. Aadhaar Card" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Document Type</label>
                  <select required name="type" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="Identity">Identity</option>
                    <option value="Address">Address</option>
                    <option value="Business">Business</option>
                    <option value="Property">Property</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">File</label>
                  <input required name="file" type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isPending} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50">
                    {isPending ? "Uploading..." : "Upload Document"}
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
