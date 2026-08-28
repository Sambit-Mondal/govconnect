"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Search, Filter, CheckCircle2, XCircle } from "lucide-react";

export default function ApiMonitoringPage({ initialRequests }: { initialRequests: any[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [filterMethod, setFilterMethod] = useState<string | null>(null);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLiveStream) {
      interval = setInterval(() => {
        const newRequest = {
          id: `req-${Date.now()}`,
          endpoint: ["/api/auth/login", "/api/users/profile", "/api/data/consents", "/api/services/status"][Math.floor(Math.random() * 4)],
          method: Math.random() > 0.3 ? "GET" : "POST",
          status: Math.random() > 0.1 ? 200 : (Math.random() > 0.5 ? 401 : 500),
          latency: `${Math.floor(Math.random() * 300) + 20}ms`,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          time: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setRequests(prev => [newRequest, ...prev].slice(0, 50));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLiveStream]);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) || req.ip.includes(searchQuery);
    const matchesFilter = filterMethod ? req.method === filterMethod : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Monitoring</h1>
          <p className="text-gray-500 text-sm mt-1">Track real-time API requests and performance metrics.</p>
        </div>
        <button 
          onClick={() => setIsLiveStream(!isLiveStream)}
          className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 ${
            isLiveStream ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Activity className={`w-4 h-4 ${isLiveStream ? 'animate-pulse' : ''}`} /> 
          {isLiveStream ? 'Stop Stream' : 'Live Stream'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Total Requests (24h)</h3>
          <p className="text-3xl font-bold text-gray-900">124,592</p>
          <span className="text-sm text-green-600 font-medium">+12% from yesterday</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Average Latency</h3>
          <p className="text-3xl font-bold text-gray-900">142ms</p>
          <span className="text-sm text-green-600 font-medium">-5ms from yesterday</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Error Rate (5xx)</h3>
          <p className="text-3xl font-bold text-gray-900">0.08%</p>
          <span className="text-sm text-green-600 font-medium">Stable</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search endpoints or IPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <button 
            onClick={() => setFilterMethod(prev => prev === 'GET' ? 'POST' : prev === 'POST' ? null : 'GET')}
            className={`px-4 py-2 border text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              filterMethod ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20' : 'border-gray-200 text-gray-700 hover:bg-white bg-white'
            }`}
          >
            <Filter className="w-4 h-4" /> 
            {filterMethod ? `Filter: ${filterMethod}` : 'Filters'}
          </button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Endpoint</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Latency</th>
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredRequests.map((req) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, backgroundColor: "#f0f9ff" }}
                    animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                    exit={{ opacity: 0 }}
                    key={req.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-gray-900">{req.endpoint}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md ${req.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {req.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {req.status === 200 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        <span className={`font-semibold ${req.status === 200 ? 'text-green-600' : req.status >= 500 ? 'text-red-600' : 'text-orange-600'}`}>
                          {req.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono">{req.latency}</td>
                    <td className="px-6 py-4 text-gray-500">{req.ip}</td>
                    <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">{req.time}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No requests found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
