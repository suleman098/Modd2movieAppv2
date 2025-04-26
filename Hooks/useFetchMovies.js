import { useState, useEffect } from "react";

const API_KEY = "apikey"; // Replace with your TMDb API key
const BEARER_TOKEN =
  "token"; // Replace with your TMDb Bearer token

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
