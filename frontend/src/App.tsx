import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-gray-100">
        <Routes />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
