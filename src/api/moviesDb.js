import axios from 'axios';

const API_KEY = 'cafb1e3c514650f7fe286cf86f15db21';
const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMWUzYzUxNDY1MGY3ZmUyODZjZjg2ZjE1ZGIyMSIsInN1YiI6IjY1YjIzODlhYWIxYmM3MDE4NWE4ZTcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WWmEdDg9I54hCbPjfYQSiZiaWHZCGCDg-uWLbR9zhIo';

// endpoints
const baseUrl = 'https://api.themoviedb.org/3';
const trendingMovies_Endpoints = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMovies_Endpoints = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topratedMovies_Endpoints = `${baseUrl}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${API_KEY}`;

// dynemic movies endpoint
const movieDetailsEndpoint = id => `${baseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = id =>
  `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id =>
  `${baseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// person
const personDetailsEndpoint = id =>
  `${baseUrl}/person/${id}?api_key=${API_KEY}`;

const personMoviesEndpoint = id =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// get images of different widths,

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// api call
const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMovies_Endpoints);
};

export const fetchUpComingMovies = () => {
  return apiCall(upcomingMovies_Endpoints);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topratedMovies_Endpoints);
};

// movie screen apis
export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = movieId => {
  return apiCall(movieCreditsEndpoint(movieId));
};
export const fetchSimilarMovies = movieId => {
  return apiCall(similarMoviesEndpoint(movieId));
};

// person screen apis
export const fetchPersonDetails = personId => {
  return apiCall(personDetailsEndpoint(personId));
};
export const fetchPersonMovies = personId => {
  return apiCall(personMoviesEndpoint(personId));
};

// search screen apis
export const searchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
};
