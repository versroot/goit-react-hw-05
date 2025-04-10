import { getCredits } from "../js/fetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        const castData = await getCredits(movieId);
        setCast(castData);
      } catch (err) {
        setError("Failed to load cast");
        console.error(err);
      }
    }

    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast information found.</p>;

  return (
    <div>
      <h1>Cast</h1>
      <ul>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            {profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                width={100}
              />
            )}
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
