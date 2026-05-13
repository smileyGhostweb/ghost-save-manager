import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Settings, BarChart3, LogOut, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalSaves: number;
  reportedIssues: number;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'settings'>('overview');
  const [stats] = useState<AdminStats>({
    totalUsers: 1250,
    activeUsers: 342,
    totalSaves: 8450,
    reportedIssues: 12,
  });

  const recentUsers = [
    { id: '1', username: 'player_123', email: 'player@example.com', joined: '2025-05-13', status: 'active' },
    { id: '2', username: 'gamer_pro', email: 'gamer@example.com', joined: '2025-05-12', status: 'active' },
    { id: '3', username: 'dev_user', email: 'dev@example.com', joined: '2025-05-11', status: 'inactive' },
  ];

  const reportedMods = [
    { id: '1', name: 'Suspicious Mod v1.2', reporter: 'user_456', reason: 'Potential anti-cheat bypass', date: '2025-05-13' },
    { id: '2', name: 'Game Hack Tool', reporter: 'user_789', reason: 'Unauthorized game modification', date: '2025-05-12' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-glow mb-2">Admin Panel</h1>
          <p className="text-gray-400">👑 Digital Ghost Pulse - Full System Access</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-dark-border rounded-lg hover:border-neon-cyan transition-colors flex items-center gap-2">
            <Shield size={20} />
            Security
          </button>
          <button className="px-4 py-2 border border-dark-border rounded-lg hover:border-neon-cyan transition-colors flex items-center gap-2">
            <Settings size={20} />
            Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div className="cyberpunk-card" whileHover={{ scale: 1.05 }}>
          <p className="text-gray-400 text-xs">Total Users</p>
          <p className="text-2xl font-bold text-neon-cyan">{stats.totalUsers}</p>
          <p className="text-xs text-neon-green mt-1">↑ 24 this week</p>
        </motion.div>
        <motion.div className="cyberpunk-card" whileHover={{ scale: 1.05 }}>
          <p className="text-gray-400 text-xs">Active Users</p>
          <p className="text-2xl font-bold text-neon-purple">{stats.activeUsers}</p>
          <p className="text-xs text-gray-500 mt-1">27.4% online</p>
        </motion.div>
        <motion.div className="cyberpunk-card" whileHover={{ scale: 1.05 }}>
          <p className="text-gray-400 text-xs">Total Saves</p>
          <p className="text-2xl font-bold text-neon-pink">{stats.totalSaves}</p>
          <p className="text-xs text-neon-green mt-1">↑ 156 today</p>
        </motion.div>
        <motion.div className="cyberpunk-card" whileHover={{ scale: 1.05 }}>
          <p className="text-gray-400 text-xs">Reports</p>
          <p className="text-2xl font-bold text-neon-pink">{stats.reportedIssues}</p>
          <p className="text-xs text-gray-500 mt-1">Needs review</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-border">
        {(['overview', 'users', 'moderation', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition-colors capitalize ${
              activeTab === tab
                ? 'text-neon-cyan border-b-2 border-neon-cyan'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="cyberpunk-card">
            <h2 className="text-xl font-semibold text-neon-cyan mb-4 flex items-center gap-2">
              <TrendingUp size={24} />
              System Health
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">API Response Time</span>
                  <span className="text-sm font-bold text-neon-green">145ms</span>
                </div>
                <div className="bg-dark-bg rounded-full h-2">
                  <div className="bg-neon-green h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Server Load</span>
                  <span className="text-sm font-bold text-neon-cyan">34%</span>
                </div>
                <div className="bg-dark-bg rounded-full h-2">
                  <div className="bg-neon-cyan h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Database Health</span>
                  <span className="text-sm font-bold text-neon-purple">99.8%</span>
                </div>
                <div className="bg-dark-bg rounded-full h-2">
                  <div className="bg-neon-purple h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="cyberpunk-card">
            <h2 className="text-xl font-semibold text-neon-pink mb-4 flex items-center gap-2">
              <AlertTriangle size={24} />
              Recent Alerts
            </h2>
            <div className="space-y-2">
              <div className="p-2 bg-dark-bg border-l-2 border-neon-yellow rounded text-sm">
                <p className="font-semibold">High memory usage detected</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
              <div className="p-2 bg-dark-bg border-l-2 border-neon-green rounded text-sm">
                <p className="font-semibold">Backup completed successfully</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="cyberpunk-card">
          <h2 className="text-xl font-semibold text-neon-cyan mb-4 flex items-center gap-2">
            <Users size={24} />
            Recent Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-dark-border">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-400">Username</th>
                  <th className="text-left px-4 py-2 text-gray-400">Email</th>
                  <th className="text-left px-4 py-2 text-gray-400">Joined</th>
                  <th className="text-left px-4 py-2 text-gray-400">Status</th>
                  <th className="text-left px-4 py-2 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-dark-border hover:bg-dark-bg transition-colors">
                    <td className="px-4 py-3 text-neon-cyan font-semibold">{user.username}</td>
                    <td className="px-4 py-3 text-gray-400">{user.email}</td>
                    <td className="px-4 py-3 text-gray-500">{user.joined}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-neon-green/20 text-neon-green'
                          : 'bg-gray-700/20 text-gray-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-neon-purple hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="cyberpunk-card">
          <h2 className="text-xl font-semibold text-neon-pink mb-4 flex items-center gap-2">
            <Shield size={24} />
            Reported Content
          </h2>
          <div className="space-y-3">
            {reportedMods.map((report) => (
              <div key={report.id} className="p-4 bg-dark-bg rounded-lg border-l-2 border-neon-pink">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neon-cyan">{report.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">Reason: {report.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">Reported by {report.reporter} on {report.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-neon-green/20 text-neon-green rounded text-xs hover:bg-neon-green/30">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded text-xs hover:bg-neon-pink/30">
                      Ban
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="cyberpunk-card">
            <h2 className="text-xl font-semibold text-neon-purple mb-4">System Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <label className="text-neon-cyan">Maintenance Mode</label>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <label className="text-neon-cyan">Backup Enabled</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <label className="text-neon-cyan">Analytics</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="cyberpunk-card">
            <h2 className="text-xl font-semibold text-neon-pink mb-4">Danger Zone</h2>
            <button className="w-full px-4 py-2 border-2 border-neon-pink text-neon-pink rounded-lg hover:bg-neon-pink/10 transition-colors">
              Clear All Logs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
