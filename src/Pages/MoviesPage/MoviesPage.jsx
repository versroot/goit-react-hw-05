import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../components/js/fetch";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const changeSearchText = (e) => {
    const value = e.target.value;
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) return;

    async function loadMovies() {
      try {
        const movies = await getMovies(query);
        if (movies.length === 0) {
          throw new Error("No movies found");
        }
        setMovies(movies);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      }
    }

    loadMovies();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={changeSearchText}
        placeholder="Search for movies..."
      />
      <h2>Movies</h2>

      {!query && <p>Enter a search term to begin.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {query && !error && movies.length === 0 && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
