const searchInput = document.getElementById('searchInput');
const searchButton = document.querySelector('button');
const moviesGrid = document.getElementById('MoviesGrid');

searchButton.onclick = function () {
  const movieName = searchInput.value.trim();

  if (movieName === '') {
    moviesGrid.innerHTML = '<p>Please enter a movie name.</p>';
    return;
  }

  // Use your OMDb API key (you received it via email)
  fetch(`https://www.omdbapi.com/?apikey=c915027&t=${movieName}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        moviesGrid.innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <img src="${data.Poster}" alt="${data.Title}" style="max-width: 200px; border-radius: 10px;">
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        `;
      } else {
        moviesGrid.innerHTML = `<p>Movie not found. Try another title.</p>`;
      }
    })
    .catch(error => {
      moviesGrid.innerHTML = `<p>Error fetching movie data. Please try again later.</p>`;
      console.error('Error:', error);
    });
};