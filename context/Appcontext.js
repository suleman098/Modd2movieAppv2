import React, { createContext, useContext } from "react";

const MoodContext = createContext();
const YouTubeAPIKeyContext = createContext();

const moods = [
  { category: 35, name: "Cheerful", emoji: "😁", categoryName: "Comedy" },
  {
    category: 99,
    name: "Reflective",
    emoji: "🤔",
    categoryName: "Documentary",
  },
  { category: 27, name: "Gloomy", emoji: "😕", categoryName: "Horror" },
  { category: 35, name: "Humorous", emoji: "🤣", categoryName: "Comedy" },
  { category: 10402, name: "Melancholy", emoji: "😶", categoryName: "Music" },
  { category: 14, name: "Idyllic", emoji: "🤩", categoryName: "Fantasy" },
  { category: 10751, name: "Chill", emoji: "😎", categoryName: "Family" },
  { category: 10749, name: "Romantic", emoji: "🥰", categoryName: "Romance" },
  { category: 878, name: "Weird", emoji: "🤨", categoryName: "Sci-Fi" },
  { category: 10770, name: "Horny", emoji: "🤤", categoryName: "TV Movie" },
  { category: 16, name: "Sleepy", emoji: "🥱", categoryName: "Animation" },
  { category: 28, name: "Angry", emoji: "😡", categoryName: "Action" },
  { category: 9648, name: "Fearful", emoji: "😨", categoryName: "Mystery" },
  { category: 18, name: "Lonely", emoji: "😢", categoryName: "Drama" },
  { category: 53, name: "Tense", emoji: "😬", categoryName: "Thriller" },
  { category: 36, name: "Thoughtful", emoji: "🤓", categoryName: "History" },
  {
    category: 12,
    name: "Thrill-seeking",
    emoji: "🤪",
    categoryName: "Adventure",
  },
  { category: 80, name: "Playful", emoji: "🙃", categoryName: "Crime" },
];

const YOUTUBE_API_KEY = "AIzaSyBJsdhjo_aKxZmR6m8Gglu6WadsLQtRTC4"; // Replace with your YouTube API key

export function MoodProvider({ children }) {
  return (
    <MoodContext.Provider value={moods}>
      <YouTubeAPIKeyContext.Provider value={YOUTUBE_API_KEY}>
        {children}
      </YouTubeAPIKeyContext.Provider>
    </MoodContext.Provider>
  );
}

export function useMoods() {
  return useContext(MoodContext);
}

export function useYouTubeAPIKey() {
  return useContext(YouTubeAPIKeyContext);
}

export default function Appcontext() {
  return <div></div>;
}
