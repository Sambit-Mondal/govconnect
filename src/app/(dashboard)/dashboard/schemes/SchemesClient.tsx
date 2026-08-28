"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Home, ChevronRight, CheckCircle2 } from "lucide-react";

export default function SchemeEligibilityPage({ initialSchemes }: { initialSchemes: any[] }) {
  const schemes = initialSchemes;

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Left Panel - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[45%] flex-shrink-0"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Scheme Eligibility Checker</h1>
        <p className="text-gray-500 mb-8">Answer a few questions to find schemes you are eligible for.</p>

        <form className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">What is your current occupation?</label>
            <select className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium appearance-none cursor-pointer">
              <option>Student</option>
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
              <option>Farmer</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Annual Income (Approx.)</label>
            <select className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium appearance-none cursor-pointer">
              <option>₹2,00,000 - ₹5,00,000</option>
              <option>Below ₹2,00,000</option>
              <option>₹5,00,000 - ₹10,00,000</option>
              <option>Above ₹10,00,000</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Are you a resident of India?</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 p-3.5 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Yes</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 p-3.5 border-2 border-gray-100 bg-white hover:bg-gray-50 rounded-xl cursor-pointer text-gray-500">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="font-semibold">No</span>
              </label>
            </div>
          </div>

          <button type="button" onClick={() => alert("Eligibility checked! Showing best matching schemes.")} className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
            Check Eligibility
          </button>
        </form>
      </motion.div>

      {/* Right Panel - Results */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">You may be eligible for</h2>
          </div>

          <div className="space-y-4">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all group cursor-pointer bg-white">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scheme.bg}`}>
                    {scheme.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{scheme.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">{scheme.description}</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <button className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
              View All Eligible Schemes <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
