import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await getIdToken(user);
          localStorage.setItem('firebaseToken', token);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error getting token:', error);
          setCurrentUser(null);
        }
      } else {
        localStorage.removeItem('firebaseToken');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const userCredential = await signInWithPopup(auth, provider);
      const token = await getIdToken(userCredential.user);
      localStorage.setItem('firebaseToken', token);
      return { success: true };
    } catch (error) {
      // Log full error details for debugging
      console.error('Firebase login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Return more detailed error information
      return { 
        success: false, 
        error: error.message,
        code: error.code 
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('firebaseToken');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
