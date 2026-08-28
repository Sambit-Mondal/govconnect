"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark,
  Briefcase,
  FileBadge,
  ScrollText,
  MoreHorizontal
} from "lucide-react";

const services = [
  { icon: <Landmark className="w-8 h-8 text-green-600" />, label: "Land Records" },
  { icon: <Briefcase className="w-8 h-8 text-blue-600" />, label: "Business Registration" },
  { icon: <FileBadge className="w-8 h-8 text-purple-600" />, label: "Certificates" },
  { icon: <ScrollText className="w-8 h-8 text-orange-600" />, label: "Licenses" },
  { icon: <MoreHorizontal className="w-8 h-8 text-gray-400" />, label: "More" },
];

const departments = ["Revenue Department", "Transport Department", "Health Services", "Education Board", "Municipal Corporation"];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white min-h-screen relative overflow-hidden">

      <div className="flex-1 py-16 md:py-24 flex flex-col items-center relative z-10 w-full max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center w-full mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                One Platform.
              </h1>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
                Connected Government Services.
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
              Access multiple government services through a single, secure, and unified portal designed for citizens and businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/services"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                Explore Services
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-8 text-lg font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95"
              >
                Track Application
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Tricolor Aura behind Ashok Stambha */}
            <div className="absolute inset-0 m-auto w-[400px] h-[400px] z-0 pointer-events-none">
              <div className="absolute top-[10%] right-[15%] w-[250px] h-[250px] bg-orange-500/50 blur-[80px] rounded-full mix-blend-multiply"></div>
              <div className="absolute top-[30%] left-[25%] w-[200px] h-[200px] bg-white/80 blur-[60px] rounded-full z-10"></div>
              <div className="absolute bottom-[10%] left-[15%] w-[250px] h-[250px] bg-green-600/50 blur-[80px] rounded-full mix-blend-multiply"></div>
            </div>

            <div className="relative w-[320px] h-[450px] md:w-[450px] md:h-[600px] z-20 drop-shadow-2xl hover:scale-105 transition-transform duration-700">
              <Image
                src="/ashok_stambha.png"
                alt="Ashok Stambha - Satyameva Jayate"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain mix-blend-multiply"
                priority
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        {/* Services & Departments */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-white/50 p-8 md:p-12 space-y-12"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Popular Services</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {services.map((service, index) => (
                <Link key={index} href={`/services/${service.label.toLowerCase().replace(" ", "-")}`}>
                  <div className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all cursor-pointer h-full">
                    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300 mb-4">
                      {service.icon}
                    </div>
                    <span className="text-sm font-semibold text-center text-gray-700 group-hover:text-primary transition-colors">{service.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">Connected Departments</h3>
            <div className="flex flex-wrap gap-3">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="px-6 py-2.5 rounded-full border border-gray-200 bg-white/50 text-sm font-semibold text-gray-600 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer shadow-sm"
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
