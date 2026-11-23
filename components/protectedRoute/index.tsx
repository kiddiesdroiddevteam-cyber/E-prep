import { Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait until loading finishes
    if (!loading && !user) {
      // Redirect to login if not authenticated
      const authUrl = new URL('/auth', window.location.origin);
      authUrl.searchParams.set('redirect', `${window.location.pathname}${window.location.search}`);
      window.location.replace(authUrl.href);
    }
  }, [loading, user]);

  // Optional: show spinner while auth state is loading
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? <Outlet /> : null;
};
