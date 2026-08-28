"use client";

import dynamic from "next/dynamic";
import { Search, Filter, MapPin, Building2, Shield, HeartPulse, Map, Navigation } from "lucide-react";
import { useState } from "react";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function NearbyClient({ initialOffices }: { initialOffices: any[] }) {
  const [activeCategory, setActiveCategory] = useState("RTO");

  const categories = [
    { label: "RTO", icon: <Building2 className="w-4 h-4" /> },
    { label: "Hospital", icon: <HeartPulse className="w-4 h-4" /> },
    { label: "Police", icon: <Shield className="w-4 h-4" /> },
    { label: "Passport", icon: <Map className="w-4 h-4" /> },
    { label: "Service", icon: <MapPin className="w-4 h-4" /> },
  ];

  const filteredOffices = initialOffices.filter(o => o.type.toLowerCase() === activeCategory.toLowerCase());
  const nearestOffice = filteredOffices.length > 0 ? filteredOffices[0] : null;

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] min-h-[600px] flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nearby Government Services</h1>

      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col relative">
        
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 flex gap-4 z-10 bg-white">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search e.g. RTO, Passport Office, Hospital..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
            />
          </div>
          <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-blue-50/50 z-0">
          <MapComponent offices={filteredOffices} />

          {/* Nearest Card Overlay */}
          {nearestOffice && (
            <div className="absolute bottom-6 right-6 z-[400]">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 w-80">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">Nearest {nearestOffice.type}</h3>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">2.4 km away</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{nearestOffice.name}, {nearestOffice.address}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-green-600">Open</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Chips */}
        <div className="p-4 bg-white border-t border-gray-100 flex overflow-x-auto gap-3 hide-scrollbar z-10">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => setActiveCategory(category.label)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                activeCategory === category.label
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary"
              }`}
            >
              <span className={activeCategory === category.label ? "text-white" : "text-gray-400"}>
                {category.icon}
              </span>
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
