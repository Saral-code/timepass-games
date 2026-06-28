import React, { useState, useEffect } from 'react';
import { submitScore } from '../utils/firebase';

function MathQuiz({ username, dayIndex, onComplete, config }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate deterministic questions based on dayIndex so everyone gets the same quiz
  useEffect(() => {
    let q = [];
    const rand = (seed) => {
      let x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    // config.difficulty determines the max number size
    const diff = config.difficulty || 10;
    
    for (let i = 0; i < 10; i++) {
      let seed = dayIndex * 100 + i;
      let a = Math.floor(rand(seed) * diff) + 2;
      let b = Math.floor(rand(seed + 1) * diff) + 2;
      const operators = ['+', '-', '*'];
      let op = operators[Math.floor(rand(seed + 2) * operators.length)];
      
      // Ensure positive results for subtraction
      if (op === '-' && b > a) { let temp = a; a = b; b = temp; }
      
      let ans;
      if(op === '+') ans = a + b;
      if(op === '-') ans = a - b;
      if(op === '*') ans = a * b;
      
      q.push({ text: `${a} ${op} ${b}`, answer: ans });
    }
    setQuestions(q);
  }, [dayIndex, config.difficulty]);

  useEffect(() => {
    let timer;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFinished || questions.length === 0) return;
    if (!startTime) setStartTime(Date.now());
    
    if (parseInt(answer) === questions[currentIndex].answer) {
      if (currentIndex === questions.length - 1) {
        handleWin(Date.now() - startTime);
      } else {
        setCurrentIndex(c => c + 1);
        setAnswer('');
      }
    } else {
      // Penalty for wrong answer (adds 2 seconds)
      setStartTime(s => s - 2000);
      setAnswer('');
    }
  };

  const handleWin = async (totalTimeMs) => {
    setIsFinished(true);
    const score = Math.max(0, 100000 - totalTimeMs); 
    if (username) {
      await submitScore(username, dayIndex, score);
    }
    onComplete(totalTimeMs);
  };

  if (questions.length === 0) return null;

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'Outfit' }}>
        Time: {(elapsed / 1000).toFixed(1)}s
        <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Question {currentIndex + 1} of 10</div>
      </div>
      
      <div style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        marginBottom: '32px',
        color: 'var(--text-main)',
        background: 'rgba(255,255,255,0.05)',
        padding: '32px',
        borderRadius: '16px'
      }}>
        {questions[currentIndex].text} = ?
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <input 
          type="number" 
          value={answer}
          onChange={(e) => {
            if(!startTime) setStartTime(Date.now());
            setAnswer(e.target.value);
          }}
          autoFocus
          style={{
            fontSize: '2rem',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '2px solid var(--primary-color)',
            background: 'transparent',
            color: 'white',
            width: '150px',
            textAlign: 'center'
          }}
        />
        <button type="submit" className="btn-primary" style={{ fontSize: '1.5rem', padding: '0 32px' }}>
          Enter
        </button>
      </form>
      <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.9rem' }}>
        Wrong answers add +2 seconds penalty!
      </p>
    </div>
  );
}

export default MathQuiz;
