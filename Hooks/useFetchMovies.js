import { useState, useEffect } from "react";

const API_KEY = "b381d7e57b37db0452a941baee9b4a95"; // Replace with your TMDb API key
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgxZDdlNTdiMzdkYjA0NTJhOTQxYmFlZTliNGE5NSIsIm5iZiI6MTczODg2MDY5NC4yNDYsInN1YiI6IjY3YTRlODk2ZjFkMDRmZTVlYTJmZWQ2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dROMcmIAKkcQWonrm9VLNn2BAUXV6NhXgkVT-VJDM2M"; // Replace with your TMDb Bearer token

export default function useFetchMovies(genreID) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreID) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        } else {
          setError("No results found.");
          console.error("Error fetching movies:", "No results found.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreID]);

  return { movies, loading, error };
}
