// globally scoped var's
// =====================================================================
var omdbKey = "38a65d1a";

// write a function which initializes code from event listener on submit button
// =====================================================================
function init(event) {
  event.preventDefault();
  //   targets element from html with id of "input-field"
  var inputField = document.getElementById("input-field");
  //   gets input value from search bar
  var movieTitle = inputField.value;
  //   sends http request to omdb for movie data, passing in movieTitle as an argument
  omdbDataRequest(movieTitle);
  //   resets search bar value to an empty string
  inputField.value = "";
}

// write a function which makes a fetch/http request to the OMDB API for data
// =====================================================================
function omdbDataRequest(movie) {
  var omdbUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbKey;

  fetch(omdbUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   stores desired data in var's
      var title = data.Title;
      var year = data.Year;
      var rated = data.Rated;
      var runtime = data.Runtime;
      var genre = data.Genre;
      var dir = data.Director;

      //   pass data into function call as arguments
      createMovieDataElements(title, year, rated, runtime, genre, dir);
    });
}

// write a function which dynamically creates elements to display
// response data from OMDB request
// =======================================================================
function createMovieDataElements(title, year, rated, runtime, genre, director) {
  // get element of "movie" from document
  var movieDiv = document.getElementById("movie");
  // dynamically create elements
  var movieTitle = document.createElement("h2");
  var movieYear = document.createElement("h3");
  var movieRated = document.createElement("h3");
  var movieRuntime = document.createElement("h3");
  var movieGenre = document.createElement("h3");
  var movieDir = document.createElement("h3");
  // set content on elements
  movieTitle.textContent = "Title: " + title;
  movieYear.textContent = "Year: " + year;
  movieRated.textContent = "Rating: " + rated;
  movieRuntime.textContent = "Runtime: " + runtime;
  movieGenre.textContent = "Genre: " + genre;
  movieDir.textContent = "Director: " + director;
  // append elements to document
  movieDiv.appendChild(movieTitle);
  movieDiv.appendChild(movieYear);
  movieDiv.appendChild(movieRated);
  movieDiv.appendChild(movieRuntime);
  movieDiv.appendChild(movieGenre);
  movieDiv.appendChild(movieDir);
}

// write a function which makes a fetch/http request to the OMDB API for posters
// =====================================================================

// write a function which dynamically creates elements to display
// response data from OMDB request
// =====================================================================

// write a function which removes previously searched movie from document
// so that incoming search data replaces previously searced data and does
// not append below it
// =====================================================================

// write a function which makes a fetch/http request to the NYT API
// =====================================================================

// write a function which dynamically creates elements to display
// response data from NYT request
// =====================================================================

// write a function which removes previous review from document
// so that incoming review data replaces previous review data and does
// not append below it
// =====================================================================

// write a function which gets local storage if it exists
// =====================================================================

// write a function which stores movies to local storage
// =====================================================================

// write a function which dynamically displays watchlist
// =====================================================================

// create an event listener for search bar submit form from document
// =====================================================================
var inputForm = document.getElementById("input-form");
// calls init function upon submit button
inputForm.addEventListener("submit", init);

// using event delegation, create an event listener for a button which
// saves movies to a watchlist
// =====================================================================
