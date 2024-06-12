import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ?? false);
  const [loading, setLoading] = useState(false);

  return { isAuthenticated, setIsAuthenticated, loading, setLoading };
};

export default useAuth;