// index.js

import { getPopularMovies, searchMovies } from './api.js';
import { renderPopularMovies } from './home.js';
import { renderHomeSearch } from './search.js';
import { passMovie } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch popular movies
    const popularMovies = await getPopularMovies();

    async function searched() {
      // Get search query
      let searchQuery = document.getElementById("search-input").value;

      // Fetch searched movie(s)
      const homeSearch = await searchMovies(searchQuery);

      renderHomeSearch(homeSearch);

      // Pass movieId to details page
      const movieTitles = document.querySelectorAll(".movie-title");
      passMovie("movie.html", movieTitles);
    }

    // Render home page with popular movies
    renderPopularMovies(popularMovies);

    // Pass movieId to details page
    const movieTitles = document.querySelectorAll(".movie-title");
    passMovie("movie.html", movieTitles);

    // Render me page with searched movie(s)
    document.getElementById("home-search-btn").addEventListener("click", searched);

  } catch (error) {
    console.error('Error initializing the app:', error);
  }
});