import { Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until loading finishes
    if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate({
        to: '/auth',
        search: { redirect: window.location.pathname },
      });
    }
  }, [loading, user, navigate]);

  // Optional: show spinner while auth state is loading
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user exists, render child routes
  return <Outlet />;
};
