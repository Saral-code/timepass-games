import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import GamePage from './pages/GamePage'
import LeaderboardsPage from './pages/LeaderboardsPage'
import AboutPage from './pages/AboutPage'
import UsernameModal from './components/UsernameModal'

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('timepass_username');
    if (stored) {
      setUsername(stored);
    }
  }, []);

  return (
    <>
      {!username && <UsernameModal onSave={setUsername} />}
      <Routes>
        <Route path="/" element={<Layout username={username} onLogout={() => {
          localStorage.removeItem('timepass_username');
          setUsername(null);
        }} />}>
          <Route index element={<GamePage username={username} />} />
          <Route path="leaderboards" element={<LeaderboardsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
