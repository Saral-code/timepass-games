// The exact date the platform launches (UTC Midnight)
const LAUNCH_DATE = new Date(Date.UTC(2026, 5, 29)); 

export const getDayIndex = () => {
  const now = new Date();
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const launchUTC = Date.UTC(LAUNCH_DATE.getUTCFullYear(), LAUNCH_DATE.getUTCMonth(), LAUNCH_DATE.getUTCDate());
  
  if (nowUTC < launchUTC) return 0;

  const diffTime = nowUTC - launchUTC;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Modulo 365 so it loops back to day 0 after 365 days
  return diffDays % 365;
};

// You can eventually expand this array to have exactly 365 unique URLs.
// For now, it will loop through these core games mathematically to guarantee 365 days of content.
const IFRAME_GAMES = [
  {
    title: "2048",
    description: "Combine matching numbers to reach 2048! (Use arrow keys or swipe)",
    url: "https://play2048.co/"
  },
  {
    title: "Hextris",
    description: "Rotate the hexagon to match colors and clear lines! (Use arrow keys)",
    url: "https://hextris.io/"
  },
  {
    title: "Flappy Bird",
    description: "Navigate the bird through the pipes! (Click or tap)",
    url: "https://flappybird.io/"
  },
  {
    title: "Pac-Man",
    description: "Eat all the dots and avoid the ghosts!",
    url: "https://freepacman.org/"
  },
  {
    title: "Tetris",
    description: "Clear lines by fitting the blocks together.",
    url: "https://tetris.com/play-tetris"
  }
];

export const getGameForDay = (dayIndex) => {
  // Loops through the array so you never hit an empty day, even if you don't have 365 URLs yet.
  const game = IFRAME_GAMES[dayIndex % IFRAME_GAMES.length];
  
  return {
    day: dayIndex,
    title: game.title,
    type: "iframe",
    description: game.description,
    url: game.url
  };
};
