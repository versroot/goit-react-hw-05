import { getReviews } from "../js/fetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import css from "./MovieReviews.module.css";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewData = await getReviews(movieId);
        setReviews(reviewData);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No review information found.</p>;

  return (
    <div>
      <h1>Reviews</h1>
      <ul className={css.reviewsList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviewItem}>
            <p className={css.author}>Author: {author}</p>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
