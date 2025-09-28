import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  checkAdminStatus: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  checkAdminStatus: async () => false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Mock authentication for demo purposes
      const mockCredentials = [
        { email: 'admin@dalinsi.com', password: 'temple123' },
        { email: 'admin@temple.org', password: 'admin' }
      ];
      
      const isValidLogin = mockCredentials.some(cred => 
        cred.email === email && cred.password === password
      );
      
      if (isValidLogin) {
        // Create mock user object
        const mockUser = {
          id: 'mock-admin-id',
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated'
        } as User;
        
        const mockSession = {
          user: mockUser,
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
          expires_at: Date.now() + 3600000,
          token_type: 'Bearer'
        } as Session;
        
        // Store in localStorage for persistence
        localStorage.setItem('mock_auth_session', JSON.stringify(mockSession));
        
        setUser(mockUser);
        setSession(mockSession);
        setIsAdmin(true);
        
        return { error: null };
      } else {
        return { 
          error: { 
            message: 'Invalid email or password',
            status: 401
          } as AuthError 
        };
      }
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
      }
      
      return { error };
    } catch (error) {
      console.error('SignIn failed:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      // Mock sign out
      localStorage.removeItem('mock_auth_session');
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      return;
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      if (!isSupabaseConfigured) {
        // Check for mock session in localStorage
        const savedSession = localStorage.getItem('mock_auth_session');
        if (savedSession) {
          try {
            const mockSession: Session = JSON.parse(savedSession);
            // Check if session is still valid (not expired)
            if (mockSession.expires_at && mockSession.expires_at > Date.now()) {
              setSession(mockSession);
              setUser(mockSession.user);
              setIsAdmin(true);
            } else {
              // Session expired, remove it
              localStorage.removeItem('mock_auth_session');
            }
          } catch (error) {
            console.error('Error parsing mock session:', error);
            localStorage.removeItem('mock_auth_session');
          }
        }
        setLoading(false);
        return;
      }
      
      // Real Supabase session handling
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const adminStatus = await checkAdminStatus(session.user.id);
          setIsAdmin(adminStatus);
        }
      }
      setLoading(false);
    };

    getSession();

    if (isSupabaseConfigured) {
      // Listen for auth changes only if Supabase is configured
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            console.log('User logged in:', session.user.email, 'ID:', session.user.id);
            const adminStatus = await checkAdminStatus(session.user.id);
            console.log('Admin status:', adminStatus);
            setIsAdmin(adminStatus);
          } else {
            console.log('No user session');
            setIsAdmin(false);
          }
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signIn,
    signOut,
    checkAdminStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};