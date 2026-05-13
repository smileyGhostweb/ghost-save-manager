import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSaveStore } from '../store/saveStore';
import { ChevronDown, Zap, Copy, Download, History } from 'lucide-react';

const SaveEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentSave, fetchSave, isLoading } = useSaveStore();
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchSave(id);
  }, [id, fetchSave]);

  if (isLoading || !currentSave) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold neon-glow">{currentSave.name}</h1>
          <p className="text-gray-400">{currentSave.gameName}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-neon flex items-center gap-2 text-white">
            <History size={20} />
            Backups
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              editMode
                ? 'bg-neon-pink text-white'
                : 'bg-dark-card border border-dark-border hover:border-neon-cyan'
            }`}
          >
            <Zap size={20} />
            {editMode ? 'Done Editing' : 'Edit Mode'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Format</p>
          <p className="text-lg font-bold text-neon-cyan">{currentSave.format.toUpperCase()}</p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Size</p>
          <p className="text-lg font-bold text-neon-purple">{(currentSave.size / 1024).toFixed(2)} KB</p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Backups</p>
          <p className="text-lg font-bold text-neon-pink">{currentSave.backupCount}</p>
        </div>
        <div className="cyberpunk-card">
          <p className="text-gray-400 text-xs">Last Modified</p>
          <p className="text-xs font-bold text-neon-green">
            {new Date(currentSave.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="cyberpunk-card">
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-neon w-full"
            />
          </div>

          <div className="cyberpunk-card space-y-2">
            <h3 className="font-semibold text-neon-cyan">Editable Fields</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {['XP', 'Coins', 'Level', 'Health', 'Energy', 'Inventory'].map((field) => (
                <button
                  key={field}
                  onClick={() => setSelectedField(field)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedField === field
                      ? 'bg-neon-purple text-white'
                      : 'text-gray-300 hover:bg-dark-bg'
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {selectedField ? (
            <div className="cyberpunk-card space-y-4">
              <h2 className="text-xl font-semibold text-neon-cyan">{selectedField}</h2>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Value</label>
                <input
                  type="text"
                  placeholder="Value"
                  defaultValue="0"
                  disabled={!editMode}
                  className="input-neon w-full disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Value</label>
                <input
                  type="text"
                  placeholder="Enter new value"
                  disabled={!editMode}
                  className="input-neon w-full disabled:opacity-50"
                />
              </div>
              {editMode && (
                <button className="w-full btn-neon text-white">
                  Update Field
                </button>
              )}
            </div>
          ) : (
            <div className="cyberpunk-card h-96 flex items-center justify-center">
              <p className="text-gray-400">Select a field to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveEditor;
