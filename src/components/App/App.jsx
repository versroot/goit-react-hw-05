import Navigation from "../Navigation/Navigation.jsx";
import { Routes, Route } from "react-router";
import Home from "../Home/Home.jsx";
import Movies from "../Movies/Movies.jsx";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage.jsx";
import Cast from "../Cast/Cast.jsx";
import Reviews from "../Reviews/Reviews.jsx";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}
