import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Navigation = lazy(() => import("../Navigation/Navigation.jsx"));
const HomePage = lazy(() => import("../../Pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../../Pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("../../Pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const Cast = lazy(() => import("../Cast/Cast.jsx"));
const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));
const NotFoundPage = lazy(() =>
  import("../../Pages/NotFoundPage/NotFoundPage.jsx")
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
