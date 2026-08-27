"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Printer, 
  FileText,
  CheckCircle2,
  Circle,
  FileCheck
} from "lucide-react";

export default function ApplicationTrackingPage() {
  const params = useParams();
  const id = params.id as string || "GC-2026-001";

  const timeline = [
    { title: "Application Submitted", date: "10 Aug 2026, 10:30 AM", active: true, completed: true },
    { title: "Department A Verification", date: "10 Aug 2026, 11:45 AM", active: true, completed: true },
    { title: "Department B Processing", date: "11 Aug 2026, 02:20 PM", active: true, completed: false },
    { title: "Final Approval", date: "Pending", active: false, completed: false },
  ];

  const documents = [
    { name: "Identity Proof", status: "Uploaded" },
    { name: "Address Proof", status: "Uploaded" },
    { name: "Property Details", status: "Uploaded" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard" 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Application Details</h1>
        <button className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors">
          <Printer className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Status & Timeline */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Status Header */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mt-1">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Land Record Service</h2>
              <div className="text-sm text-gray-500 mt-1">Application ID: <span className="font-medium text-gray-900">{id}</span></div>
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                Status: <span className="text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">IN PROGRESS</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-6">Timeline</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute -left-[11px] top-0.5 bg-white rounded-full ${step.completed ? 'text-green-500' : step.active ? 'text-blue-500' : 'text-gray-300'}`}>
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
                  <div>
                    <h4 className={`text-sm font-bold ${step.active || step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-1 ${step.active || step.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Info & Documents */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Application Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-primary mb-4 border-b pb-2">Application Information</h3>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Applicant Name</span>
                <span className="font-medium text-gray-900">Protanu Banerjee</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Mobile Number</span>
                <span className="font-medium text-gray-900">9876543210</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Service</span>
                <span className="font-medium text-gray-900">Land Record</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Applied On</span>
                <span className="font-medium text-gray-900">10 Aug 2026</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">Current Department</span>
                <span className="font-medium text-gray-900">Department B</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-6 pb-2 border-b">
              <h3 className="text-base font-bold text-primary mb-2">Documents</h3>
            </div>
            <div className="p-6 pt-4 flex-1">
              <ul className="space-y-4">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {doc.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                View All Documents
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
