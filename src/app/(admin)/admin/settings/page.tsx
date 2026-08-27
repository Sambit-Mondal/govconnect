"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Shield, Database, Globe, Bell, Mail } from "lucide-react";

export default function SettingsPage() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure global platform settings, security, and preferences.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900">General Configuration</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                <input type="text" defaultValue="GovConnect" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input type="email" defaultValue="support@govconnect.in" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Maintenance Mode</h4>
                <p className="text-xs text-gray-500 mt-1">Disables citizen portal access. Admins can still login.</p>
              </div>
              <button 
                onClick={() => setMaintenance(!maintenance)}
                className={`w-12 h-6 rounded-full relative transition-colors ${maintenance ? 'bg-orange-500' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${maintenance ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Security & Authentication</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require 2FA for Officials</h4>
                <p className="text-xs text-gray-500">Force all government officials to use OTP or Authenticator app.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Strict IP Whitelisting (Admin Portal)</h4>
                <p className="text-xs text-gray-500">Only allow admin access from designated VPN IPs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
