import React from 'react';
import { Zap, Cpu, Eye, Microscope, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

interface DebugMenu {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  optionCount: number;
  color: string;
}

const ModTools: React.FC = () => {
  const debugMenus: DebugMenu[] = [
    {
      id: 'player',
      title: 'Player Debug Menu',
      description: 'God mode, speed control, XP multiplier, inventory testing',
      icon: <Zap size={32} />,
      optionCount: 50,
      color: 'from-neon-green to-neon-cyan',
    },
    {
      id: 'world',
      title: 'World Sandbox Menu',
      description: 'Weather, NPCs, terrain, physics, event triggers',
      icon: <Cpu size={32} />,
      optionCount: 60,
      color: 'from-neon-purple to-neon-pink',
    },
    {
      id: 'visual',
      title: 'Visual Test Menu',
      description: 'Shaders, bloom, FOV, themes, camera filters',
      icon: <Eye size={32} />,
      optionCount: 45,
      color: 'from-neon-pink to-neon-purple',
    },
    {
      id: 'qa',
      title: 'QA/Test Menu',
      description: 'Profiler, memory monitor, errors, benchmarks',
      icon: <Microscope size={32} />,
      optionCount: 55,
      color: 'from-neon-cyan to-neon-green',
    },
    {
      id: 'creator',
      title: 'Creator Tool Menu',
      description: 'Quests, dialogue, audio, plugins, localization',
      icon: <Wrench size={32} />,
      optionCount: 70,
      color: 'from-neon-purple to-neon-cyan',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold neon-glow mb-2">Mod Tools & Debug Menus</h1>
        <p className="text-gray-400">Development tools for testing and debugging (Dev use only)</p>
      </div>

      <div className="bg-neon-pink/10 border border-neon-pink rounded-lg p-4">
        <p className="text-sm text-neon-pink">
          ⚠️ These tools are for development and testing purposes only. Using them in multiplayer or competitive games may be prohibited.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {debugMenus.map((menu, index) => (
          <motion.div
            key={menu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`cyberpunk-card bg-gradient-to-br ${menu.color} bg-opacity-10 group cursor-pointer hover:shadow-lg transition-all`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-gray-300 group-hover:scale-110 transition-transform">
                  {menu.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neon-cyan">{menu.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{menu.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                <span className="text-xs text-gray-500">
                  <strong>{menu.optionCount}</strong> options available
                </span>
                <button className="px-3 py-1 bg-dark-bg hover:bg-neon-cyan hover:text-black rounded text-xs font-semibold transition-colors">
                  Open
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="cyberpunk-card">
          <h2 className="text-xl font-semibold text-neon-purple mb-4">SDK Integration</h2>
          <p className="text-gray-300 mb-4">Integrate mod SDK into your project for safe debugging and testing.</p>
          <div className="space-y-2 mb-4">
            <div className="p-2 bg-dark-bg rounded font-mono text-xs text-neon-green">
              npm install @ghostmanager/mod-sdk
            </div>
          </div>
          <button className="btn-neon w-full text-white">View Documentation</button>
        </div>

        <div className="cyberpunk-card">
          <h2 className="text-xl font-semibold text-neon-pink mb-4">Plugin System</h2>
          <p className="text-gray-300 mb-4">Create custom debug plugins and tools for your game.</p>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-400">Available plugin types:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✓ Overlay plugins</li>
              <li>✓ Data editor plugins</li>
              <li>✓ Performance monitoring</li>
            </ul>
          </div>
          <button className="btn-neon w-full text-white">Create Plugin</button>
        </div>
      </div>
    </div>
  );
};

export default ModTools;
