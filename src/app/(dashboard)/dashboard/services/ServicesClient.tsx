"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, FileText, Clock, CreditCard, X } from "lucide-react";
import { submitApplication } from "../../../actions/applicationActions";
import { useRouter } from "next/navigation";

export default function ServicesClient({ initialServices }: { initialServices: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filteredServices = initialServices.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedService) return;
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    startTransition(async () => {
      await submitApplication(selectedService.id, data);
      setSelectedService(null);
      router.push("/dashboard/applications");
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
      >
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Available Services</h1>
            <p className="text-gray-500">Apply for government services, licenses, and certificates.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name or department..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
            />
          </div>
        </div>
      </motion.div>

      {/* Services List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {filteredServices.length === 0 ? (
          <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-gray-100">
            No services found matching your search.
          </div>
        ) : (
          filteredServices.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">{service.name}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">{service.department}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.processingTime} Days</span>
                    <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> ₹{service.fee}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(service)}
                className="px-4 py-2 border border-primary/20 text-primary bg-primary/5 rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-1"
              >
                Apply Now <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </motion.div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Apply for Service</h2>
                  <p className="text-sm text-gray-500 font-mono mt-1">{selectedService.name}</p>
                </div>
                <button onClick={() => setSelectedService(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <form id="apply-form" onSubmit={handleApply} className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                    <p className="text-sm text-blue-800 font-medium flex items-center justify-between">
                      <span>Application Fee:</span>
                      <span className="font-bold text-lg">₹{selectedService.fee}</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Applicant Name</label>
                    <input required name="applicant_name" type="text" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Details / Notes</label>
                    <textarea name="notes" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-24 resize-none" placeholder="Enter any extra details required for the application..." />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="apply-form"
                  disabled={isPending}
                  className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {isPending ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
