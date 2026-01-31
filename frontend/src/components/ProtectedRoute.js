import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [checking, setChecking] = useState(true);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    api.get('/me/')
      .then((res) => {
        if (!cancelled && res.data && res.data.is_superuser) {
          setIsSuperuser(true);
        }
      })
      .catch(() => {
        if (!cancelled) setIsSuperuser(false);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => { cancelled = true; };
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (checking) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Checking access...</div>;
  }

  if (!isSuperuser) {
    return <Navigate to="/" replace state={{ message: 'Admin access is limited to authorized users.' }} />;
  }

  return children;
};

export default ProtectedRoute;
