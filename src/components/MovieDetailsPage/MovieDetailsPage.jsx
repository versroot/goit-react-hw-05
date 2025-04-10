import { useParams, Link, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../js/fetch";
import { getMovieImg } from "../js/fetch";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [posterPath, setPosterPath] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        const details = await getMovieDetails(movieId);
        const images = await getMovieImg(movieId);

        if (!details) throw new Error("Movie not found");
        if (!images) throw new Error("Images not found");

        const poster = images.posters?.[0]?.file_path; // check if exists
        setMovieDetails(details);
        setPosterPath(poster);
      } catch (err) {
        setError(err.message);
      }
    }

    loadDetails();
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!movieDetails) return <p>Loading...</p>;

  const year = new Date(movieDetails.release_date).getFullYear();
  const score = Math.round(movieDetails.vote_average * 10);
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <div>
      {imageUrl && <img src={imageUrl} alt={movieDetails.title} width={150} />}
      <h2>{`${movieDetails.title} (${year})`}</h2>
      <p>User score: {score}%</p>

      <p>Overview: {movieDetails.overview}</p>

      <p>Genres:</p>
      <ul>
        {movieDetails.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <p>Additional information</p>
      <ul>
        <li>
          <Link to={"cast"}>Cast</Link>
        </li>
        <li>
          <Link to={"reviews"}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
