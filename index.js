const apiKey = '7011b5acfc7ee4ea8bc216e0947cfe24'; // Replace with your TMDb API Key
const apiUrl = 'https://api.themoviedb.org/3';

// Search for movies
async function searchMovies() {
  const query = document.getElementById('search-input').value.trim();
  if (query === '') return;

  const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Display movies on the home page
function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = ''; // Clear previous results

  if (movies.length === 0) {
    movieList.innerHTML = '<p class="text-center text-lg text-gray-500">No movies found.</p>';
  } else {
    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item', 'cursor-pointer');
      movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full rounded-lg shadow-lg">
        
        <div class=' flex items-center justify-between '>
        <h3 class="text-center text-lg mt-2">${movie.title}
        </h3>
        
        <i class='bx bx-right-arrow-alt bx-tada text-3xl' ></i>
        </div>
      `;
      movieItem.onclick = () => playMovie(movie.id);
      movieList.appendChild(movieItem);
    });
  }
}

// Redirect to the trailer page
function playMovie(movieId) {
  window.location.href = `trailer.html?movieId=${movieId}`;
}

// Fetch and display the latest movies on page load
async function fetchLatestMovies() {
  try {
    const response = await fetch(`${apiUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching latest movies:', error);
  }
}

// Load latest movies by default
document.addEventListener('DOMContentLoaded', fetchLatestMovies);
