import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../js/fetch";
import { Link } from "react-router";

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
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
