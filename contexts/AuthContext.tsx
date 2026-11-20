import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, category: string) => Promise<{ error: AuthError | null; session: Session | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  sendPasswordReset: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    let receivedAuthEvent = false;
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!active) return;
        receivedAuthEvent = true;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!active || receivedAuthEvent) return;
        setSession(session);
        setUser(session?.user ?? null);
      })
      .catch(() => {
        if (active && !receivedAuthEvent) toast.error('Could not restore your session. Please sign in again.');
      })
      .finally(() => { if (active) setLoading(false); });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, category: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
        data: {
          full_name: fullName,
          category,
        }
      }
    });
    return { error, session: data.session };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const sendPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Could not sign out. Please try again.');
      return;
    }
    toast.info("Signed out successfully");
    navigate(
        {
            to: '/',
          })
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, sendPasswordReset, updatePassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
