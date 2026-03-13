import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
        <p>Loading</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
