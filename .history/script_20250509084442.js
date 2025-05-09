const movieTitles = [
  "Inception", "The Dark Knight", "The Avengers", "Titanic",
  "The Matrix", "Frozen", "Avatar", "Toy Story",
  "Black Panther", "Joker", "Naruto", "Bleach",
  "One Piece", "Your Name", "Spirited Away", "Attack on Titan",
  "Death Note", "My Hero Academia", "Demon Slayer", "Dragon Ball Z"
];

const moviesGrid = document.getElementById("MoviesGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("button");
const searchResult = document.getElementById("SearchResult");

const apiKey = "c915027";

// Load all 20 posters on page load
movieTitles.forEach(title => {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        const img = document.createElement("img");
        img.src = data.Poster;
        img.alt = data.Title;
        moviesGrid.appendChild(img);
      }
    });
});

// Search button functionality
searchButton.onclick = function () {
  const movieName = searchInput.value.trim();

  if (movieName === '') {
    searchResult.innerHTML = '<p>Please enter a movie name.</p>';
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        searchResult.innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <img src="${data.Poster}" alt="${data.Title}" style="max-width: 200px; border-radius: 10px;">
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        `;
      } else {
        searchResult.innerHTML = `<p>Movie not found. Try another title.</p>`;
      }
    })
    .catch(error => {
      searchResult.innerHTML = `<p>Error fetching movie data.</p>`;
      console.error('Error:', error);
    });
};