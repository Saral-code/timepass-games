// The exact date the platform launches (UTC Midnight)
// Month is 0-indexed in JS Dates (e.g., 5 is June)
const LAUNCH_DATE = new Date(Date.UTC(2026, 5, 29)); 

export const getDayIndex = () => {
  const now = new Date();
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const launchUTC = Date.UTC(LAUNCH_DATE.getUTCFullYear(), LAUNCH_DATE.getUTCMonth(), LAUNCH_DATE.getUTCDate());
  
  // If we haven't reached launch date, just return day 0
  if (nowUTC < launchUTC) return 0;

  const diffTime = nowUTC - launchUTC;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Modulo 365 so it loops back to day 0 after 365 days
  return diffDays % 365;
};

const THEMES = [
  { name: "Fruit Match", emojis: ['🍎', '🍌', '🍒', '🍉', '🍇', '🍓', '🥑', '🥝'] },
  { name: "Animal Match", emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'] },
  { name: "Sports Match", emojis: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'] },
  { name: "Space Match", emojis: ['🌍', '🌕', '☀️', '⭐', '☄️', '🚀', '🛸', '🛰️'] },
  { name: "Spooky Match", emojis: ['🎃', '👻', '🧛', '🧟', '🦇', '🕷️', '🕸️', '💀'] }
];

export const getGameForDay = (dayIndex) => {
  // We alternate between Memory Match and Math Quiz every day
  const isMemory = dayIndex % 2 === 0;
  
  if (isMemory) {
    // Pick a theme based on the day to keep it fresh
    const themeIndex = Math.floor(dayIndex / 2) % THEMES.length;
    const theme = THEMES[themeIndex];
    return {
      day: dayIndex,
      title: `Memory Match: ${theme.name}`,
      type: "memory",
      description: "Find all the matching pairs in the shortest time.",
      config: { emojis: theme.emojis }
    };
  } else {
    // Math difficulty scales slightly over the year, then loops
    const baseDifficulty = 10;
    const difficultyIncrease = Math.floor(dayIndex / 60) * 5; // Gets harder every 60 days
    return {
      day: dayIndex,
      title: "Speed Math",
      type: "math",
      description: "Solve 10 math problems as fast as possible. Wrong answers add a 2s penalty!",
      config: { difficulty: baseDifficulty + difficultyIncrease }
    };
  }
};
