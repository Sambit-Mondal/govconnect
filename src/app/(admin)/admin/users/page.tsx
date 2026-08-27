"use client";

import { motion } from "framer-motion";
import { Users, Search, Filter, UserPlus, Shield, MoreVertical } from "lucide-react";

export default function UsersPage() {
  const usersList = [
    { id: "USR-001", name: "Suresh Kumar", email: "suresh@example.com", role: "Citizen", status: "Active", joined: "12 Aug 2026" },
    { id: "USR-002", name: "Anita Desai", email: "anita.d@gov.in", role: "Official", status: "Active", joined: "01 Jan 2026" },
    { id: "USR-003", name: "Rahul Sharma", email: "rahuls@example.com", role: "Citizen", status: "Suspended", joined: "15 Jul 2026" },
    { id: "USR-004", name: "System Admin", email: "admin@govconnect.in", role: "Admin", status: "Active", joined: "01 Jan 2025" },
    { id: "USR-005", name: "Priya Singh", email: "priya.singh@gov.in", role: "Official", status: "Active", joined: "10 Mar 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage citizens, officials, and system administrators.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite Official
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users by name, email, or ID..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-white transition-colors flex items-center gap-2 bg-white">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs uppercase">
                        {user.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                      user.role === 'Official' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.status === 'Active' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
