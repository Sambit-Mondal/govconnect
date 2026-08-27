"use client";

import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AIGovAssistPage() {
  const [message, setMessage] = useState("");

  const suggestedQueries = [
    "What is the status of my application?",
    "What documents are required for business registration?",
    "Which schemes am I eligible for?",
    "How to apply for a new license?",
  ];

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] min-h-[600px] flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AI GovAssist</h1>
      
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

        {/* Chat Area */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20 relative"
          >
            <Bot className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Hi Protanu! 👋
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium mb-12"
          >
            How can I help you today?
          </motion.p>

          <div className="w-full space-y-3">
            {suggestedQueries.map((query, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="w-full text-left p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 text-primary font-medium transition-all shadow-sm group flex justify-between items-center"
              >
                {query}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Send className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="relative flex items-center">
            <div className="absolute left-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full pl-14 pr-14 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900"
            />
            <button 
              className={`absolute right-3 p-2.5 rounded-lg transition-all ${
                message.length > 0 ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-400"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by AI • Always here to help
          </p>
        </div>
      </div>
    </div>
  );
}
