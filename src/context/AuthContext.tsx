import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { signInRequest } from '~/services/hooks/useAuth';
import { api } from '../services/api';
import { SignInRequestData } from '~/types/auth';
import { clearLocalStorage, getLocalStorage } from '~/utils/localStorageFormat';
import { User } from '~/types/me';

type Component = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInRequestData) => Promise<void>;
  signOut: () => void;
  user: User | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Component) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { '@RemedixAccess_token': access } = parseCookies();
    async function getData() {
      await getMeInformations();
    }
    if (access) {
      getData();
    }
  }, []);

  function signOut() {
    destroyCookie(null, '@RemedixAccess_token', { path: '/' });
    destroyCookie(null, '@RemedixRefresh_token', { path: '/' });
    clearLocalStorage();
    setIsAuthenticated(false);
    Router.push('/login');
  }

  async function getMeInformations() {
    // let financial = await getFinancialMe();
    // setUser(financial);
    // setIsAuthenticated(true);
  }

  async function signIn(credentials: SignInRequestData) {
    try {
      const { token } = await signInRequest(credentials);
      setCookie(undefined, '@RemedixAccess_token', token, {
        maxAge: 60 * 60 * 24, // 24 hour
        path: '/',
      });
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        await getMeInformations();
        // setUser(financial);
        // setIsAuthenticated(true);
        Router.push('/');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
