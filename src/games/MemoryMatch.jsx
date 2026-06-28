import React, { useState, useEffect } from 'react';
import { submitScore } from '../utils/firebase';

const EMOJIS = ['🍎', '🍌', '🍒', '🍉', '🍇', '🍓', '🥑', '🥝'];

function MemoryMatch({ username, dayIndex, onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Initialize game
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
  }, [dayIndex]);

  useEffect(() => {
    let timer;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  const handleCardClick = (index) => {
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());
    if (flipped.length === 2) return; // wait for flip back
    if (flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const match = cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji;
      if (match) {
        const newSolved = [...solved, ...newFlipped];
        setSolved(newSolved);
        setFlipped([]);
        
        if (newSolved.length === cards.length) {
          handleWin(Date.now() - startTime);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const handleWin = async (totalTimeMs) => {
    setIsFinished(true);
    // Score is inverse of time (faster is better). Example: 100000 - timeMs
    const score = Math.max(0, 100000 - totalTimeMs); 
    if (username) {
      await submitScore(username, dayIndex, score);
    }
    onComplete(totalTimeMs);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'Outfit' }}>
        Time: {(elapsed / 1000).toFixed(1)}s
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '8px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || solved.includes(idx);
          return (
            <div 
              key={card.id}
              onClick={() => handleCardClick(idx)}
              style={{
                aspectRatio: '1',
                background: isFlipped ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                cursor: isFlipped ? 'default' : 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {isFlipped ? card.emoji : '?'}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default MemoryMatch;
