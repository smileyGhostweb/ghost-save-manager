import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search saves, mods..."
            className="input-neon pl-10 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors">
          <Bell size={20} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors">
          <Settings size={20} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
