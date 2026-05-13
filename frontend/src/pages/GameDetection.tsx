import React, { useState } from 'react';
import { Upload, Cpu, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DetectionResult {
  engine: string;
  confidence: number;
  saveFormat: string;
  structure: string[];
  recommendations: string[];
}

const GameDetection: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        engine: 'Unity',
        confidence: 92,
        saveFormat: 'JSON',
        structure: ['player', 'world', 'inventory', 'progress'],
        recommendations: [
          'Use JSON editor for save files',
          'Install Unity Mod SDK',
          'Check save encryption status',
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold neon-glow mb-2">Game Detection</h1>
        <p className="text-gray-400">Upload a screenshot or project file to detect game engine and structure</p>
      </div>

      <div className="bg-neon-cyan/10 border border-neon-cyan rounded-lg p-4 flex gap-3">
        <AlertCircle size={20} className="text-neon-cyan flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-300">
          <p className="font-semibold mb-1">🔐 Privacy First</p>
          <p>All analysis is performed locally or with encrypted transmission. Your game files are never stored on our servers.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="cyberpunk-card">
          <h2 className="font-semibold text-neon-purple mb-4">Upload Screenshot</h2>
          <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center cursor-pointer hover:border-neon-cyan transition-colors">
            <Upload size={32} className="mx-auto mb-2 text-gray-500" />
            <p className="text-gray-300">Drag screenshot here or click to select</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>

        <div className="cyberpunk-card">
          <h2 className="font-semibold text-neon-pink mb-4">Upload Project File</h2>
          <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center cursor-pointer hover:border-neon-cyan transition-colors">
            <Cpu size={32} className="mx-auto mb-2 text-gray-500" />
            <p className="text-gray-300">Drag project file here or click to select</p>
            <p className="text-xs text-gray-500 mt-1">JSON, XML, or project config</p>
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cyberpunk-card text-center py-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-neon-cyan"></div>
            <span className="text-gray-300">Analyzing file...</span>
          </div>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="cyberpunk-card">
            <h3 className="text-xl font-semibold text-neon-green mb-4">Detection Results</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-xs">Game Engine</p>
                <p className="text-2xl font-bold text-neon-cyan">{result.engine}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-dark-bg rounded-full h-2">
                    <div
                      className="bg-neon-green h-2 rounded-full"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-lg font-bold text-neon-green">{result.confidence}%</p>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-border pt-4">
              <p className="text-gray-400 text-xs mb-2">Save Format: <span className="text-neon-cyan font-mono">{result.saveFormat}</span></p>
              <p className="text-gray-400 text-xs mb-3">Detected Structure:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.structure.map((item) => (
                  <span key={item} className="px-2 py-1 bg-dark-bg text-neon-purple text-xs rounded font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="cyberpunk-card">
            <h3 className="font-semibold text-neon-purple mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-neon-pink">→</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameDetection;
