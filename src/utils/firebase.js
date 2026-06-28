import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

// TODO: Replace this with your actual Firebase project config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDRET9hGeQ6nbPFVcc8xFYNCbk6usJUEe0",
  authDomain: "timepass-games-f9719.firebaseapp.com",
  projectId: "timepass-games-f9719",
  storageBucket: "timepass-games-f9719.firebasestorage.app",
  messagingSenderId: "550193894027",
  appId: "1:550193894027:web:4e7396f5a710211a337a8e"
};

// Initialize Firebase only if the apiKey is provided to prevent crashes
let app, db;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  console.warn("Firebase is not configured. Please add your credentials to src/utils/firebase.js");
}

export const submitScore = async (username, gameDay, score) => {
  if (!db) {
    console.log("Mock Submit:", { username, gameDay, score });
    return;
  }
  try {
    await addDoc(collection(db, "scores"), {
      username,
      gameDay,
      score,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDailyLeaderboard = async (gameDay) => {
  if (!db) return [];
  try {
    const q = query(
      collection(db, "scores"), 
      // where("gameDay", "==", gameDay),
      orderBy("score", "desc"), 
      limit(100)
    );
    const querySnapshot = await getDocs(q);
    // In a real app we would filter by gameDay in the query, requiring an index
    // For now we do it client-side if no index is created
    let results = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      if(data.gameDay === gameDay) results.push(data);
    });
    return results.sort((a,b) => b.score - a.score);
  } catch(e) {
    console.error(e);
    return [];
  }
}

export { db };
