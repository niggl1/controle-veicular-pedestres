import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = 'usuario' | 'portaria' | 'gestao' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profile: UserProfile;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
  unitId?: string;
  unitName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  selectProfile: (profile: UserProfile) => void;
  organizationLogo: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: '@controle_acesso:user',
  TOKEN: '@controle_acesso:token',
};

// Mock user data for demonstration
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@teste.com': {
    id: '1',
    name: 'Administrador',
    email: 'admin@teste.com',
    password: '123456',
    profile: 'admin',
    organizationId: 'org1',
    organizationName: 'Condomínio Exemplo',
    organizationLogo: '',
  },
  'portaria@teste.com': {
    id: '2',
    name: 'Porteiro João',
    email: 'portaria@teste.com',
    password: '123456',
    profile: 'portaria',
    organizationId: 'org1',
    organizationName: 'Condomínio Exemplo',
    organizationLogo: '',
  },
  'morador@teste.com': {
    id: '3',
    name: 'Maria Silva',
    email: 'morador@teste.com',
    password: '123456',
    profile: 'usuario',
    organizationId: 'org1',
    organizationName: 'Condomínio Exemplo',
    organizationLogo: '',
    unitId: 'unit1',
    unitName: 'Bloco A - Apt 101',
  },
  'gestao@teste.com': {
    id: '4',
    name: 'Carlos Gestor',
    email: 'gestao@teste.com',
    password: '123456',
    profile: 'gestao',
    organizationId: 'org1',
    organizationName: 'Condomínio Exemplo',
    organizationLogo: '',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [organizationLogo, setOrganizationLogo] = useState<string | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setOrganizationLogo(parsedUser.organizationLogo || null);
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS[email.toLowerCase()];
      if (mockUser && mockUser.password === password) {
        const { password: _, ...userData } = mockUser;
        setUser(userData);
        setOrganizationLogo(userData.organizationLogo || null);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      setUser(null);
      setOrganizationLogo(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectProfile = (profile: UserProfile) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        selectProfile,
        organizationLogo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
