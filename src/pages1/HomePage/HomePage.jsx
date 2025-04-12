import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../components/js/fetch";
import MovieList from "../../components/MovieList/MovieList";

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await fetchTrendingMovies();
        setMovies(movies);
      } catch (err) {
        setError(err.message);
      }
    }

    loadMovies();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (movies.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h2>Trending Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
}
