import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Save, Zap, Cpu, Cloud, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Save, label: 'Save Editor', path: '/saves' },
    { icon: Zap, label: 'Mod Tools', path: '/mods' },
    { icon: Cpu, label: 'Game Detection', path: '/detection' },
    { icon: Cloud, label: 'Cloud Sync', path: '/cloud' },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-dark-card border-r border-dark-border flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-xl font-bold neon-glow">👻 GHOST</h1>
        <p className="text-xs text-gray-400">Save Manager</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === item.path
                ? 'bg-neon-purple text-white neon-border'
                : 'text-gray-400 hover:text-neon-cyan'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
              location.pathname === '/admin'
                ? 'bg-neon-purple text-white neon-border'
                : 'text-gray-400 hover:text-neon-cyan'
            }`}
          >
            <Settings size={20} />
            <span>Admin Panel</span>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-dark-border space-y-2">
        <p className="text-xs text-gray-500">Signed in as</p>
        <p className="text-sm font-semibold text-neon-cyan truncate">{user?.username}</p>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-neon-pink transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
