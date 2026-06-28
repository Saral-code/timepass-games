import React, { useState, useEffect } from 'react';
import { getDayIndex, getGameForDay } from '../utils/time';
import { getDailyLeaderboard } from '../utils/firebase';

function LeaderboardsPage() {
  const currentDayIndex = getDayIndex();
  const currentGame = getGameForDay(currentDayIndex);
  
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getDailyLeaderboard(Number(currentDayIndex)).then(data => {
      setScores(data);
      setLoading(false);
    });
  }, [currentDayIndex]);

  return (
    <div className="container animate-fade-in">
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <h1 className="page-title text-gradient">Today's Leaderboard</h1>
        <p className="page-subtitle">Day {currentDayIndex + 1}: {currentGame.title}</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.9rem' }}>
          Every day is a fresh start. New day, new game, new winner!
        </p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', minHeight: '300px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--primary-color)' }}>
            Loading today's champions...
          </div>
        ) : scores.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            No scores yet today. Be the first to play and claim the #1 spot!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scores.map((scoreEntry, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                background: idx === 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                border: idx === 0 ? '1px solid var(--primary-color)' : '1px solid var(--surface-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ 
                    fontWeight: '800', 
                    fontSize: '1.25rem', 
                    color: idx === 0 ? '#fbbf24' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'var(--text-muted)' 
                  }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                    {scoreEntry.username}
                  </span>
                </div>
                <span style={{ color: 'var(--primary-color)', fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {scoreEntry.score.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardsPage;
