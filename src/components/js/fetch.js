const API_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export function fetchTrendingMovies() {
  return fetch(`${API_URL}/trending/movie/day?language=en-US`, options)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch trending movies");
      return res.json();
    })
    .then((data) => data.results || []);
}

export function getMovieDetails(movieId) {
  return fetch(`${API_URL}/movie/${movieId}?language=en-US`, options).then(
    (res) => {
      if (!res.ok) throw new Error("Failed to get movie details");
      return res.json();
    }
  );
}

export function getMovieImg(movieId) {
  return fetch(`${API_URL}/movie/${movieId}/images`, options).then((res) => {
    if (!res.ok) throw new Error("Failed to get movie's image");
    return res.json();
  });
}

export function getCredits(movieId) {
  return fetch(`${API_URL}/movie/${movieId}/credits`, options)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to get credits");
      return res.json();
    })
    .then((data) => data.cast || []);
}

export function getReviews(movieId) {
  return fetch(`${API_URL}/movie/${movieId}/reviews`, options)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to get reviews");
      return res.json();
    })
    .then((data) => data.results || []);
}

export function getMovies(query) {
  return fetch(`${API_URL}/search/movie?query=${query}`, options)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to get movies");
      return res.json();
    })
    .then((data) => data.results || []);
}
