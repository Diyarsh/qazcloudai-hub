import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInDemo: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoUser, setDemoUser] = useState<any>(null);

  useEffect(() => {
    // Check for saved demo user in localStorage
    const savedDemoUser = localStorage.getItem('demoUser');
    if (savedDemoUser) {
      const parsedUser = JSON.parse(savedDemoUser);
      setDemoUser(parsedUser);
      setUser(parsedUser);
      console.log('Loaded demo user from localStorage:', parsedUser);
    }

    // Only attempt auth if Supabase is configured
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    // Clear demo user from state and localStorage
    localStorage.removeItem('demoUser');
    setDemoUser(null);
    setUser(null);
    setSession(null);
    console.log('User signed out');
  };

  const signInDemo = (email: string) => {
    const mockUser = {
      id: 'demo-user',
      email,
      user_metadata: {
        full_name: email.split('@')[0]
      }
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('demoUser', JSON.stringify(mockUser));
    setDemoUser(mockUser);
    setUser(mockUser as any);
    console.log('Demo user signed in:', mockUser);
  };

  const value = {
    user: demoUser || user,
    session,
    loading,
    signOut,
    signInDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};