"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText, CheckCircle2, AlertCircle, RotateCcw, Wallet, ArrowRight, Download } from "lucide-react";

export default function PaymentsPage() {
  const transactions = [
    { id: "TXN-001", purpose: "Land Record Fee", amount: "₹500", status: "Paid", date: "10 Aug 2026", statusColor: "text-green-600 bg-green-50" },
    { id: "TXN-002", purpose: "Certificate Fee", amount: "₹700", status: "Pending", date: "10 Aug 2026", statusColor: "text-orange-600 bg-orange-50" },
    { id: "TXN-003", purpose: "Business Reg. Fee", amount: "₹1,200", status: "Paid", date: "08 Aug 2026", statusColor: "text-green-600 bg-green-50" },
  ];

  const quickLinks = [
    { icon: <CreditCard className="w-5 h-5" />, label: "Payment History" },
    { icon: <Download className="w-5 h-5" />, label: "Download Receipt" },
    { icon: <RotateCcw className="w-5 h-5" />, label: "Refund Status" },
    { icon: <Wallet className="w-5 h-5" />, label: "Payment Methods" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments & Transactions</h1>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="w-24 h-24 text-orange-600" />
          </div>
          <h2 className="text-4xl font-bold text-orange-600 mb-2">₹1,200</h2>
          <p className="text-gray-500 font-medium mb-4">Pending Payments</p>
          <button className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
            Pay Now
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <CheckCircle2 className="w-24 h-24 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-green-600 mb-2">₹5,600</h2>
          <p className="text-gray-500 font-medium">Paid Payments</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-24 h-24 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-blue-600 mb-2">2</h2>
          <p className="text-gray-500 font-medium">Receipts Available</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Purpose</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{txn.purpose}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${txn.statusColor}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-center bg-gray-50/50">
          <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
            View All Transactions &rarr;
          </button>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
      >
        {quickLinks.map((link, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:border-primary/30 hover:shadow-md cursor-pointer transition-all group">
            <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              {link.icon}
            </div>
            <span className="font-semibold text-gray-700 text-sm">{link.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
