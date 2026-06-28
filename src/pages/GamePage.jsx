import React, { useState } from 'react';
import MemoryMatch from '../games/MemoryMatch';
import MathQuiz from '../games/MathQuiz';
import { getDayIndex, getGameForDay } from '../utils/time';

function GamePage({ username }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  
  const dayIndex = getDayIndex();
  const gameConfig = getGameForDay(dayIndex);

  const handleGameComplete = (timeMs) => {
    setResult(timeMs);
  };

  const renderGame = () => {
    if (gameConfig.type === 'memory') {
      return <MemoryMatch username={username} dayIndex={dayIndex} onComplete={handleGameComplete} config={gameConfig.config} />;
    } else if (gameConfig.type === 'math') {
      return <MathQuiz username={username} dayIndex={dayIndex} onComplete={handleGameComplete} config={gameConfig.config} />;
    }
    return <div>Game type not found</div>;
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem', marginBottom: '16px', color: 'var(--text-muted)' }}>
          Day {dayIndex + 1} of 365
        </div>
        <h1 className="page-title text-gradient">{gameConfig.title}</h1>
        <p className="page-subtitle">{gameConfig.description}</p>
      </div>

      <div className="glass-panel" style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        minHeight: '400px',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(30, 41, 59, 0.4)'
      }}>
        {!isPlaying && !result ? (
          <>
            <h2 style={{ marginBottom: '24px' }}>Ready to Play?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center', maxWidth: '400px' }}>
              You can try as many times as you want! The game refreshes every time you reload the page, but only your best score matters, <strong style={{color: 'white'}}>{username}</strong>.
            </p>
            <button 
              className="btn-primary" 
              style={{ fontSize: '1.25rem', padding: '16px 40px' }}
              onClick={() => setIsPlaying(true)}
            >
              Start Game
            </button>
          </>
        ) : result ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>🎉 Finished!</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Time: {(result / 1000).toFixed(1)}s
            </p>
            <p style={{ color: 'var(--primary-color)', marginBottom: '24px' }}>
              Score submitted to the leaderboard!
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', letterSpacing: '2px' }}>
              🟦🟩🟦🟩<br/>🟩🟦🟩🟦<br/>🟦🟩🟦🟩
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '12px' }}>Copy and share your result!</p>
          </div>
        ) : (
          <div style={{ width: '100%', padding: '24px' }}>
            {renderGame()}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
