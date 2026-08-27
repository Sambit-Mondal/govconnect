"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, Clock, CheckCircle2, FileText, Settings, ShieldCheck, ChevronRight, Zap } from "lucide-react";

export default function SmartServiceFinder() {
  const recommendedSteps = [
    { title: "Business Registration", duration: "7-10 Days" },
    { title: "Food License (FSSAI)", duration: "15-20 Days" },
    { title: "Shop & Establishment License", duration: "7-10 Days" },
    { title: "GST Registration", duration: "5-7 Days" },
    { title: "Fire NOC", duration: "10-15 Days" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Smart Service Finder</h1>
            <p className="text-gray-500">Tell us what you need, we will guide you.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="e.g. I want to start a restaurant business"
              defaultValue="I want to start a restaurant business"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
            />
          </div>
          <button className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary/20">
            Search
          </button>
        </div>
      </motion.div>

      {/* Recommended Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-transparent">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Recommended for you</h2>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">Restaurant Business Setup</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Most Relevant</span>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {recommendedSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                
                {/* Content */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex justify-between items-center group-hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-semibold text-gray-900">{step.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
              View All Steps & Documents <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50/50 p-6 flex justify-around border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Sparkles className="w-5 h-5 text-primary" /> Personalized
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Zap className="w-5 h-5 text-orange-500" /> Time Saving
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <ShieldCheck className="w-5 h-5 text-green-500" /> End-to-End Guidance
          </div>
        </div>
      </motion.div>
    </div>
  );
}
