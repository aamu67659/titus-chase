import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterCode = () => {
  const navigate = useNavigate();
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');

  const isCodeValid = code.length === 6 && /^\d+$/.test(code);

  const handleNext = () => {
    if (isCodeValid) {
      navigate('/billing');
    }
  };

  return (
    <div className="identity-page">
      <header className="identity-header">
        <div className="identity-logo">
          <svg viewBox="457 0 105 105" width="30" height="30">
            <path d="M494.525 0a3.69 3.69 0 0 0-3.691 3.686v25.83h68.244L528 .008 494.525 0M561.578 37.33a3.677 3.677 0 0 0-3.688-3.68h-25.828v68.242l29.504-31.086.012-33.476M524.236 104.369a3.688 3.688 0 0 0 3.678-3.688V74.854h-68.241l31.073 29.508 33.49.007M457.18 67.043a3.687 3.687 0 0 0 3.686 3.688h25.83V2.484l-29.512 31.078-.004 33.481" fill="white" />
          </svg>
        </div>
      </header>

      <main className="identity-content">
        <div className="content-wrapper">
          <p className="small-title">Confirm Your Identity</p>
          
          <div className="success-message">
            <i className="fa-solid fa-check"></i>
            <div>
              <p className="message-title">We sent a text to xxx-xxx-xxxx.</p>
              <p className="message-detail">If it doesn't arrive in the next few minutes, check your Do Not Disturb settings to see if you missed it or request another text.</p>
            </div>
          </div>

          <div className="code-entry-section">
            <div className="lock-icon-container">
                <i className="fa-solid fa-lock"></i>
            </div>
            <h1 className="large-title inline">Enter your code</h1>
          </div>
          
          <div className="code-form">
            <label htmlFor="verificationCode">Enter your code</label>
            <div className="code-input-wrapper">
              <input 
                type={showCode ? "text" : "password"} 
                id="verificationCode" 
                className="verification-input"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              <button 
                type="button" 
                className="show-code-btn"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="verification-links">
            <a href="#" className="help-link-small">
              Get another text <i className="fa-solid fa-chevron-right"></i>
            </a>
            <a href="#" className="help-link-small" onClick={() => navigate('/verify')}>
              Try a different method <i className="fa-solid fa-chevron-right"></i>
            </a>
          </div>

          <div className="action-buttons dual-buttons">
            <button className="cancel-btn" onClick={() => navigate('/verify')}>
              Cancel
            </button>
            <button 
              className={`next-btn ${!isCodeValid ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={!isCodeValid}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterCode;
