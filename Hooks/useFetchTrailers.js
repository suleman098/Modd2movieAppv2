import { useState, useEffect, useCallback } from "react";
import { useYouTubeAPIKey } from "../context/Appcontext";

export default function useFetchTrailers(movieTitle) {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const YOUTUBE_API_KEY = useYouTubeAPIKey();

  const fetchTrailers = useCallback(async () => {
    if (!movieTitle) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movieTitle + " trailer"
        )}&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items) {
        setTrailers(data.items);
      } else {
        setError("No trailers found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [movieTitle, YOUTUBE_API_KEY]);

  useEffect(() => {
    fetchTrailers();
  }, [movieTitle]);

  return { trailers, loading, error, fetchTrailers };
}
