import React, { useState } from 'react';

function UsernameModal({ onSave }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length > 2) {
      localStorage.setItem('timepass_username', username.trim());
      onSave(username.trim());
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }} className="text-gradient">Choose Your Identity</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Pick a username to compete on the global leaderboards. No email required!
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="e.g. MasterGamer99"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--surface-border)',
              background: 'rgba(0,0,0,0.2)',
              color: 'white',
              fontFamily: 'Inter',
              fontSize: '1rem',
              outline: 'none'
            }}
            required
            minLength={3}
            maxLength={20}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Save Username
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsernameModal;
