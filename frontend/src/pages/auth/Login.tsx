import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="cyberpunk-card neon-border">
          <h1 className="text-3xl font-bold text-center mb-8 neon-glow">Ghost Save Manager</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-neon w-full"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-neon w-full"
              required
            />
            
            {error && <p className="text-neon-pink text-sm">{error}</p>}
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-neon w-full text-white disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center text-gray-400 mt-4">
            No account? <a href="/register" className="text-neon-cyan hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
