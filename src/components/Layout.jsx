import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ username, onLogout }) {
  return (
    <>
      <Navbar username={username} onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
