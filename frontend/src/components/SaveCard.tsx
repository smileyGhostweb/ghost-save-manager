import React from 'react';
import { GameSave } from '../store/saveStore';
import { Download, Copy, Trash2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SaveCardProps {
  save: GameSave;
}

const SaveCard: React.FC<SaveCardProps> = ({ save }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Link to={`/saves/${save.id}`}>
      <div className="cyberpunk-card group cursor-pointer h-full">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-neon-cyan truncate group-hover:text-neon-pink transition-colors">
                {save.name}
              </h3>
              <p className="text-sm text-gray-400">{save.gameName}</p>
            </div>
            <span className="ml-2 px-2 py-1 bg-dark-bg rounded text-xs text-neon-green font-mono">
              {save.format.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatFileSize(save.size)}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {new Date(save.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <div className="pt-2 border-t border-dark-border flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="flex-1 px-2 py-1 bg-dark-bg hover:bg-neon-cyan hover:text-black rounded text-xs transition-colors flex items-center justify-center gap-1">
              <Download size={14} />
              Download
            </button>
            <button className="px-2 py-1 bg-dark-bg hover:bg-neon-purple rounded text-xs transition-colors">
              <Copy size={14} />
            </button>
            <button className="px-2 py-1 bg-dark-bg hover:bg-neon-pink rounded text-xs transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaveCard;
