import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mail, Lock, User, GraduationCap } from 'lucide-react';
import './Login.css'; // Reusing layout CSS

function Signup() {
  const [role, setRole] = useState('client'); // 'client' or 'organizer'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Calls the mock/backend signup function from AuthContext
      await signup({ name, email, password, college, role });
      
      // Auto redirect to dashboard if organizer, else home
      if (role === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
          <h1>Join FlickyFest<span>.</span></h1>
          <p>Create an account to track your tickets or start managing massive events.</p>
          <div className="accent-blob" style={{ background: 'var(--success-color)' }}></div>
        </div>
        
        <div className="auth-split right-panel">
          <div className="auth-form-wrapper">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join the community today</p>

            <div className="role-selector">
              <button 
                type="button"
                className={`role-btn ${role === 'client' ? 'active' : ''}`}
                onClick={() => setRole('client')}
              >
                I am a Student / Attendee
              </button>
              <button 
                type="button"
                className={`role-btn ${role === 'organizer' ? 'active' : ''}`}
                onClick={() => setRole('organizer')}
              >
                I am an Organizer
              </button>
            </div>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder={role === 'organizer' ? "events@college.edu" : "you@college.edu"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>College / University</label>
                <div className="input-wrapper">
                  <GraduationCap size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter your college" 
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
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
                    placeholder="Create a strong password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button disabled={isLoading} type="submit" className="btn btn-primary w-100 login-btn">
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            
            <p className="auth-switch">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
