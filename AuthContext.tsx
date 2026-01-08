import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface User {
  username: string;
}

interface StoredUser extends User {
  password: string; // In a real app, this would be a hash
  verified: boolean;
  verificationToken: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<{ username: string, verificationToken: string }>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  signup: async () => ({ username: '', verificationToken: '' }),
  logout: () => {},
  verifyEmail: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const item = sessionStorage.getItem('currentUser');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      return null;
    }
  });

  const getUsers = useCallback((): StoredUser[] => {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Failed to parse users from localStorage", error);
      return [];
    }
  }, []);

  const setUsers = useCallback((users: StoredUser[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  }, []);

  const signup = useCallback(async (username: string, password: string): Promise<{ username: string, verificationToken: string }> => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        return reject(new Error(t('errorUserExists')));
      }
      
      const verificationToken = Math.random().toString(36).substring(2);

      const newUser: StoredUser = { 
        username, 
        password, // In a real app, hash the password
        verified: false,
        verificationToken,
      };
      
      setUsers([...users, newUser]);

      // Don't log in, just return info needed for verification step
      resolve({ username, verificationToken });
    });
  }, [getUsers, setUsers, t]);

  const login = useCallback(async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const user = users.find((user) => user.username === username);

      if (!user) {
        return reject(new Error(t('errorUserNotFound')));
      }

      if (user.password !== password) { // In a real app, compare hashed passwords
        return reject(new Error(t('errorPasswordMismatch')));
      }
      
      if (!user.verified) {
        return reject(new Error(t('errorEmailNotVerified')));
      }

      const userToStore = { username: user.username };
      sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      resolve();
    });
  }, [getUsers, t]);

  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.verificationToken === token);
      
      if (userIndex === -1) {
        return reject(new Error(t('errorInvalidToken')));
      }

      const userToVerify = users[userIndex];
      userToVerify.verified = true;
      userToVerify.verificationToken = null;
      
      users[userIndex] = userToVerify;
      setUsers(users);

      const userToStore = { username: userToVerify.username };
      sessionStorage.setItem('currentUser', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      resolve();
    });
  }, [getUsers, setUsers, t]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  }, []);

  useEffect(() => {
    // This effect syncs state if user logs in/out in another tab
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'currentUser' && event.storageArea === sessionStorage) {
        if (!event.newValue) {
           setCurrentUser(null);
        } else {
          try {
             setCurrentUser(JSON.parse(event.newValue));
          } catch (error) {
            console.error("Failed to parse user from storage event", error);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const value = { currentUser, login, signup, logout, verifyEmail };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
