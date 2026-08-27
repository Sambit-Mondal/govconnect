"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home, ArrowLeft, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 bg-white min-h-screen relative overflow-hidden items-center justify-center">
      {/* Decorative Tricolor Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-green-600/5 to-transparent pointer-events-none"></div>

      {/* Very faint background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
        <Image 
          src="/ashok_stambha.png" 
          alt="Watermark" 
          width={800} 
          height={800} 
          className="object-contain" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-red-100">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-8xl font-extrabold tracking-tight text-gray-900 mb-4 opacity-20">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            The page or service you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 text-base font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-gray-100"
        >
          <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Helpful Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="text-sm text-primary hover:underline flex items-center gap-1">
              <Search className="w-4 h-4" /> Browse Services
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/track" className="text-sm text-primary hover:underline">
              Track Application
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/help" className="text-sm text-primary hover:underline">
              Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
