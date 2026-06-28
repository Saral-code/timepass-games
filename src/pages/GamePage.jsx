import React, { useState } from 'react';
import { getDayIndex, getGameForDay } from '../utils/time';
import { submitScore } from '../utils/firebase';

function GamePage({ username }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [manualScore, setManualScore] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dayIndex = getDayIndex();
  const gameConfig = getGameForDay(dayIndex);

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!manualScore || isSubmitting) return;
    
    setIsSubmitting(true);
    await submitScore(username, dayIndex, parseInt(manualScore));
    setResult(manualScore);
    setIsSubmitting(false);
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem', marginBottom: '16px', color: 'var(--text-muted)' }}>
          Day {dayIndex + 1} of 365
        </div>
        <h1 className="page-title text-gradient">{gameConfig.title}</h1>
        <p className="page-subtitle">{gameConfig.description}</p>
      </div>

      <div className="glass-panel" style={{ 
        width: '100%', 
        margin: '0 auto', 
        minHeight: '600px',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(30, 41, 59, 0.4)',
        padding: '24px'
      }}>
        {!isPlaying && !result ? (
          <>
            <h2 style={{ marginBottom: '24px' }}>Ready to Play?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center', maxWidth: '400px' }}>
              We've sourced today's amazing game from around the web! Play as many times as you want. Once you get your best score, you'll enter it manually on the honor system. Good luck, <strong style={{color: 'white'}}>{username}</strong>!
            </p>
            <button 
              className="btn-primary" 
              style={{ fontSize: '1.25rem', padding: '16px 40px' }}
              onClick={() => setIsPlaying(true)}
            >
              Load Game
            </button>
          </>
        ) : isPlaying && !result ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* The External Game Iframe */}
            <div style={{ width: '100%', height: '600px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--surface-border)', marginBottom: '24px' }}>
              <iframe 
                src={gameConfig.url}
                title={gameConfig.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            </div>
            
            {/* Self-Report Score System */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '16px' }}>Submit Your High Score</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Honor system! When you're done playing, enter your best score below.</p>
              
              <form onSubmit={handleScoreSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <input 
                  type="number" 
                  value={manualScore}
                  onChange={(e) => setManualScore(e.target.value)}
                  placeholder="0"
                  required
                  style={{
                    fontSize: '1.25rem',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--primary-color)',
                    background: 'transparent',
                    color: 'white',
                    width: '150px'
                  }}
                />
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ padding: '0 24px' }}>
                  {isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>🎉 Score Submitted!</h2>
            <p style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '24px', fontWeight: 'bold' }}>
              {result} pts
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your score is now on the global daily leaderboard!
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', letterSpacing: '2px' }}>
              🎮 Played: {gameConfig.title}<br/>🏆 Score: {result}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '12px' }}>Come back tomorrow for a brand new game!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;
