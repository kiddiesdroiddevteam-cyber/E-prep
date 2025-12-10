import React from 'react';
import './App.css'
import { router } from './router';
import { RouterProvider } from '@tanstack/react-router';

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;