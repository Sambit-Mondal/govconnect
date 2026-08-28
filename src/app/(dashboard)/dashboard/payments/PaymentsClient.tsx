"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText, CheckCircle2, AlertCircle, RotateCcw, Wallet, ArrowRight, Download, Receipt } from "lucide-react";
import { useState } from "react";

export default function PaymentsPage({ initialTransactions }: { initialTransactions: any[] }) {
  const transactions = initialTransactions;
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const quickLinks = [
    { icon: <CreditCard className="w-5 h-5" />, label: "Payment History" },
    { icon: <Download className="w-5 h-5" />, label: "Download Receipt" },
    { icon: <RotateCcw className="w-5 h-5" />, label: "Refund Status" },
    { icon: <Wallet className="w-5 h-5" />, label: "Payment Methods" },
  ];

  const handlePay = (id: string) => {
    setIsProcessing(id);
    setTimeout(() => {
      alert(`Payment for ${id} processed successfully!`);
      setIsProcessing(null);
      // In real app, this would refresh data or redirect to payment gateway
    }, 1500);
  };

  const handleDownload = (id: string) => {
    alert(`Downloading receipt for ${id}...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
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
                <th className="px-6 py-4 font-semibold text-right">Action</th>
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
                  <td className="px-6 py-4 text-right">
                    {txn.status === 'Pending' ? (
                      <button 
                        onClick={() => handlePay(txn.id)}
                        disabled={isProcessing === txn.id}
                        className="px-3 py-1.5 text-xs font-bold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                      >
                        {isProcessing === txn.id ? "Processing..." : "Pay Now"}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDownload(txn.id)}
                        className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Receipt"
                      >
                        <Receipt className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
