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
  
  // Modulo 90 so it loops back to day 0 after 90 days
  return diffDays % 90;
};

export const getGameForDay = (dayIndex) => {
  // We'll import schedule dynamically or return from a constant
  // For now, return a placeholder structure
  return {
    day: dayIndex,
    title: "Memory Match",
    type: "memory",
    description: "Find all the matching pairs in the shortest time."
  };
};
