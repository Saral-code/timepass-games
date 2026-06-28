import React from 'react';

function AboutPage() {
  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title text-gradient">The 90-Day Challenge</h1>
        <p className="page-subtitle">One global game, every single day.</p>
      </div>
      
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
        <h2 style={{ marginBottom: '16px' }}>How it works</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
          Timepass is a daily gaming experience shared by everyone in the world. 
          Every day at exactly UTC midnight, a new mini-game unlocks. 
        </p>
        
        <ul style={{ marginBottom: '24px', marginLeft: '24px', color: 'var(--text-muted)' }}>
          <li style={{ marginBottom: '8px' }}><strong>90 Days:</strong> The season lasts for exactly 90 days.</li>
          <li style={{ marginBottom: '8px' }}><strong>Global Sync:</strong> You are playing the exact same game as everyone else on Earth.</li>
          <li style={{ marginBottom: '8px' }}><strong>Leaderboards:</strong> Compete on the daily leaderboard. Every day is a fresh start and a new chance to be #1!</li>
        </ul>

        <h2 style={{ marginBottom: '16px' }}>The Games</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          We've curated a list of highly replayable core game engines (like Memory, Pattern Matching, Logic Puzzles). 
          Each of the 90 days features a unique, handcrafted level variation of these games.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
