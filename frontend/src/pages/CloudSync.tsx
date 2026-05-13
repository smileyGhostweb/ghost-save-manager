import React, { useState } from 'react';
import { Cloud, Download, Upload, Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CloudBackup {
  id: string;
  name: string;
  date: string;
  size: number;
  version: number;
}

const CloudSync: React.FC = () => {
  const [backups, setBackups] = useState<CloudBackup[]>([
    { id: '1', name: 'Save-v3.json', date: '2025-05-13', size: 256000, version: 3 },
    { id: '2', name: 'Save-v2.json', date: '2025-05-12', size: 248000, version: 2 },
    { id: '3', name: 'Save-v1.json', date: '2025-05-11', size: 240000, version: 1 },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [lastSync, setLastSync] = useState('2 minutes ago');

  const handleSync = async () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('Just now');
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold neon-glow mb-2">Cloud Sync</h1>
        <p className="text-gray-400">Backup and sync your saves across devices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Cloud Storage</p>
          <p className="text-2xl font-bold text-neon-cyan">2.4 GB / 10 GB</p>
          <div className="mt-2 bg-dark-bg rounded-full h-2">
            <div className="bg-neon-cyan h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Total Backups</p>
          <p className="text-2xl font-bold text-neon-purple">{backups.length}</p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Last Sync</p>
          <p className="text-lg font-bold text-neon-pink">{lastSync}</p>
        </div>
      </div>

      <div className="cyberpunk-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neon-purple">Sync Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div>
              <p className="font-semibold text-neon-cyan">Auto Sync</p>
              <p className="text-xs text-gray-400">Automatically sync saves every hour</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="w-5 h-5"
              />
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div>
              <p className="font-semibold text-neon-pink">Encryption</p>
              <p className="text-xs text-gray-400">AES-256 encryption enabled</p>
            </div>
            <span className="text-neon-green text-sm font-bold">✓ Enabled</span>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full btn-neon text-white flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSyncing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
              Syncing...
            </>
          ) : (
            <>
              <Cloud size={20} />
              Sync Now
            </>
          )}
        </button>
      </div>

      <div className="cyberpunk-card">
        <h2 className="text-xl font-semibold text-neon-cyan mb-4">Version History</h2>
        <div className="space-y-2">
          {backups.map((backup, index) => (
            <motion.div
              key={backup.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-dark-bg rounded-lg group hover:border-l-2 hover:border-neon-cyan transition-all"
            >
              <div className="flex-1">
                <p className="font-semibold text-neon-pink">{backup.name}</p>
                <p className="text-xs text-gray-500">{backup.date} • v{backup.version}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{formatFileSize(backup.size)}</span>
                <button className="p-2 hover:bg-neon-cyan hover:text-black rounded transition-colors opacity-0 group-hover:opacity-100">
                  <Download size={16} />
                </button>
                <button className="p-2 hover:bg-neon-purple rounded transition-colors opacity-0 group-hover:opacity-100">
                  <RotateCcw size={16} />
                </button>
                <button className="p-2 hover:bg-neon-pink rounded transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="cyberpunk-card">
        <h2 className="text-xl font-semibold text-neon-green mb-4">Offline Mode</h2>
        <p className="text-gray-300 mb-4">Continue editing saves without internet connection. Changes will sync when you reconnect.</p>
        <button className="btn-neon text-white w-full flex items-center justify-center gap-2">
          <Upload size={20} />
          Enable Offline Mode
        </button>
      </div>
    </div>
  );
};

export default CloudSync;
