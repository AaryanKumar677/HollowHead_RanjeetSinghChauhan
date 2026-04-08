import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Dummy local state for UI testing
  // Set to null to test logged-out state, or { name: 'Aaryan', role: 'client' } to test logged-in state
  const [currentUser, setCurrentUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Simulate an API check on initial load
  useEffect(() => {
    const checkLoggedStatus = async () => {
      // TODO (Backend): Ranjeet - Call your /api/auth/me endpoint here.
      // E.g., const res = await fetch('/api/auth/me', { headers: { Authorization: ...} });
      
      // MOCK LOGIC FOR NOW: Check local storage for dummy data
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkLoggedStatus();
  }, []);

  // Login Function
  const login = async (email, password) => {
    // TODO (Backend): Ranjeet - Replace with your fetch/axios logic
    // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({email, password}) })
    
    // MOCK LOGIN LOGIC (Just for UI testing)
    const mockUser = {
      name: email.split('@')[0],
      email: email,
      role: email.includes('organizer') ? 'organizer' : 'client',
      avatar: "https://i.pravatar.cc/150?img=11"
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return { success: true };
  };

  // Signup Function
  const signup = async (userData) => {
    // TODO (Backend): Ranjeet - Replace with your POST request
    // e.g. await axios.post('/api/auth/signup', userData);

    // MOCK SIGNUP LOGIC
    const mockUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      college: userData.college,
      avatar: "https://i.pravatar.cc/150?img=11"
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return { success: true };
  };

  // Logout Function
  const logout = () => {
    // TODO (Backend): Ranjeet - Destroy tokens or hit logout endpoint if needed
    
    // MOCK LOGOUT
    localStorage.removeItem('mockUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
