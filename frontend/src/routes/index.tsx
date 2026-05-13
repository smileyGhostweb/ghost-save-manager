import React from 'react';
import { Routes as RRoutes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SaveEditor from './pages/SaveEditor';
import ModTools from './pages/ModTools';
import GameDetection from './pages/GameDetection';
import CloudSync from './pages/CloudSync';
import AdminPanel from './pages/admin/AdminPanel';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Layout from './components/Layout';

const Routes: React.FC = () => {
  return (
    <RRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saves/:id" element={<SaveEditor />} />
        <Route path="/mods" element={<ModTools />} />
        <Route path="/detection" element={<GameDetection />} />
        <Route path="/cloud" element={<CloudSync />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </RRoutes>
  );
};

export default Routes;
