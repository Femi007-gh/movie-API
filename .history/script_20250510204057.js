

const moviesGrid = document.getElementById("MoviesGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector("button");
const searchResult = document.getElementById("SearchResult");
const pagination = document.getElementById("Pagination");

const apiKey = "c915027";
let currentPage = 1;
let currentSearch = "";

function fetchMovies(searchTerm, page = 1) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      moviesGrid.innerHTML = "";
      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const img = document.createElement("img");
          img.src = movie.Poster;
          img.alt = movie.Title;
          img.title = movie.Title;
          moviesGrid.appendChild(img);
        });
        
        // Setup pagination
        const totalResults = parseInt(data.totalResults);
        const totalPages = Math.ceil(totalResults / 10);
        showPaginationControls(totalPages);
      } else {
        moviesGrid.innerHTML = `<p>No movies found for "${searchTerm}".</p>`;
        pagination.innerHTML = "";
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      moviesGrid.innerHTML = `<p>Error fetching movie data.</p>`;
    });
}

function showPaginationControls(totalPages) {
  pagination.innerHTML = "";
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    fetchMovies(currentSearch, currentPage);
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    fetchMovies(currentSearch, currentPage);
  };

  pagination.appendChild(prevBtn);
  const pageDisplay = document.createElement("span");
  pageDisplay.textContent = ` Page ${currentPage} of ${totalPages} `;
  pagination.appendChild(pageDisplay);
  pagination.appendChild(nextBtn);
}

searchButton.onclick = function () {
  const movieName = searchInput.value.trim();
  if (movieName === '') {
    searchResult.innerHTML = '<p>Please enter a movie name.</p>';
    return;
  }

  currentSearch = movieName;
  currentPage = 1;
  searchResult.innerHTML = "";
  fetchMovies(movieName);
};