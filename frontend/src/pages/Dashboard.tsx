import React, { useEffect } from 'react';
import { useSaveStore } from '../store/saveStore';
import { Upload, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import SaveCard from '../components/SaveCard';

const Dashboard: React.FC = () => {
  const { saves, fetchSaves, isLoading } = useSaveStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchSaves();
  }, [fetchSaves]);

  const filteredSaves = saves.filter((save) =>
    save.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    save.gameName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-glow">Dashboard</h1>
          <p className="text-gray-400">Manage your game saves and mods</p>
        </div>
        <button className="btn-neon flex items-center gap-2 text-white">
          <Upload size={20} />
          Upload Save
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-sm">Total Saves</p>
          <p className="text-2xl font-bold text-neon-cyan">{saves.length}</p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-sm">Storage Used</p>
          <p className="text-2xl font-bold text-neon-purple">
            {(saves.reduce((acc, s) => acc + s.size, 0) / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-sm">Backups Created</p>
          <p className="text-2xl font-bold text-neon-pink">
            {saves.reduce((acc, s) => acc + s.backupCount, 0)}
          </p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-sm">Last Modified</p>
          <p className="text-sm font-semibold text-neon-green">
            {saves.length > 0 ? new Date(saves[0].updatedAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search saves..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-neon pl-10 w-full"
            />
          </div>
          <button className="px-4 py-2 border border-dark-border rounded-lg hover:border-neon-cyan transition-colors flex items-center gap-2">
            <Filter size={20} />
            Filter
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
          </div>
        ) : filteredSaves.length === 0 ? (
          <div className="cyberpunk-card text-center py-12">
            <p className="text-gray-400 mb-4">No saves found</p>
            <button className="btn-neon text-white flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Upload your first save
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSaves.map((save, index) => (
              <motion.div
                key={save.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SaveCard save={save} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
