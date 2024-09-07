import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner-container">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
