import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar({ username, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="text-gradient">Timepass</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Today's Game
          </NavLink>
          <NavLink to="/leaderboards" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Leaderboards
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About
          </NavLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>{username}</span>
            {username && (
              <button 
                onClick={onLogout} 
                style={{ 
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.875rem' 
                }}
              >
                (Change)
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
