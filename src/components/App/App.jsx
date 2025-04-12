import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Navigation = lazy(() => import("../Navigation/Navigation.jsx"));
const HomePage = lazy(() => import("../../pages1/HomePage/HomePage.js"));
const MoviesPage = lazy(() => import("../../pages1/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../../pages1/MovieDetailsPage/MovieDetailsPage.js")
);
const Cast = lazy(() => import("../Cast/Cast.jsx"));
const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages1/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
