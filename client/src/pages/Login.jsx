import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Calls the mock/backend login function from AuthContext
      await login(email, password);
      
      // Redirect based on role (dummy logic: if email has 'organizer', go to dashboard)
      if (email.includes('organizer')) {
        navigate('/organizer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-btn">
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div className="auth-card">
        <div className="auth-split left-panel">
          <h1>FlickyFest<span>.</span></h1>
          <p>Discover, book, and host amazing events near your campus.</p>
          <div className="accent-blob"></div>
        </div>
        
        <div className="auth-split right-panel">
          <div className="auth-form-wrapper">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to your account to continue</p>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="you@college.edu" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button disabled={isLoading} type="submit" className="btn btn-primary w-100 login-btn">
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
