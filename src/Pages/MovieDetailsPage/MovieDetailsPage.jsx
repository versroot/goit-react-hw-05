import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getMovieDetails } from "../../components/js/fetch";
import { getMovieImg } from "../../components/js/fetch";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [posterPath, setPosterPath] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

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
      <button className={css.button}>
        <Link to={backLinkRef.current || "/movies"}>← Go back</Link>
      </button>
      <div className={css.movieDetails}>
        {imageUrl && (
          <img src={imageUrl} alt={movieDetails.title} width={150} />
        )}
        <div className={css.movieInfo}>
          <h2>{`${movieDetails.title} (${year})`}</h2>
          <p>User score: {score}%</p>

          <p>Overview: {movieDetails.overview}</p>

          <p>Genres:</p>
          <ul>
            {movieDetails.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.addInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to={"cast"}>Cast</Link>
          </li>
          <li>
            <Link to={"reviews"}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
