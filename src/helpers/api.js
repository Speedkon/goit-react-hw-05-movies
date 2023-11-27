import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "bff0848e79a71a719886e08586df4a8c";

export async function getTrendingMovies() {
    const response = await axios(`/trending/movie/day?api_key=${API_KEY}`);
    return response.data;
};

export async function fetchMovies(query) {
    const response = await axios(`/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data;
};

export async function getMovieDetails(movieId) {
    const response = await axios(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
};

export async function getCast(movieId) {
    const response = await axios(`/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data;
};

export async function getReviews(movieId) {
    const response = await axios(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
    return response.data;
};