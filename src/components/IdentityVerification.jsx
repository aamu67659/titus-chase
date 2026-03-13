import React from 'react';
import { useNavigate } from 'react-router-dom';

const IdentityVerification = () => {
  const navigate = useNavigate();

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
          <h1 className="large-title">Let's make sure it's you</h1>
          
          <p className="description">
            For your security, we need to confirm your identity. Choose a confirmation method to continue.
          </p>

          <div className="verification-options">
            <div className="option-item" onClick={() => {}}>
              <div className="option-icon text-icon">
                <i className="fa-solid fa-comment-sms"></i>
              </div>
              <div className="option-details">
                <h3>Get a text</h3>
                <p>We'll text a one-time code to your phone.</p>
              </div>
              <i className="fa-solid fa-chevron-right arrow-icon"></i>
            </div>

            <div className="option-item" onClick={() => {}}>
              <div className="option-icon call-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="option-details">
                <h3>Get a call</h3>
                <p>We'll call you with a one-time code.</p>
              </div>
              <i className="fa-solid fa-chevron-right arrow-icon"></i>
            </div>
          </div>

          <a href="#" className="help-link">
            Need help? Call us <i className="fa-solid fa-chevron-right"></i>
          </a>

          <div className="action-buttons">
            <button className="cancel-btn" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IdentityVerification;
