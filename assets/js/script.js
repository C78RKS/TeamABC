// globally scoped var's
// =====================================================================
var omdbKey = "38a65d1a";
var movieDiv = document.getElementById("movie");
var reviewsDiv = document.getElementById("reviews");
var nytKey = "F65iUnYMHIuXFqyxD64typ0dIZG0gqFF";

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
  nytDataRequest(movieTitle);
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
  // dynamically create elements
  var movieTitle = document.createElement("h2");
  var movieYear = document.createElement("p");
  var movieRated = document.createElement("p");
  var movieRuntime = document.createElement("p");
  var movieGenre = document.createElement("p");
  var movieDir = document.createElement("p");

  var taskbutton = document.createElement("button");

  // set content on elements
  movieTitle.textContent = "Title: " + title;
  movieYear.textContent = "Year: " + year;
  movieRated.textContent = "Rating: " + rated;
  movieRuntime.textContent = "Runtime: " + runtime;
  movieGenre.textContent = "Genre: " + genre;

  taskbutton.textContent = "Save to Watchlist";
  taskbutton.setAttribute("id", "save-button");
  taskbutton.setAttribute("class", "btn hover:cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5");
  movieTitle.setAttribute("class", "text-3xl");

  // remove existing data before append
  removeOmdbBeforeAppend(movieDiv);

  movieDir.textContent = "Director: " + director;
  // append elements to document
  movieDiv.appendChild(movieTitle);
  movieDiv.appendChild(movieYear);
  movieDiv.appendChild(movieRated);
  movieDiv.appendChild(movieRuntime);
  movieDiv.appendChild(movieGenre);
  movieDiv.appendChild(movieDir);
  movieDiv.appendChild(taskbutton);
}

// write a function which removes previously searched movie from document
// so that incoming search data replaces previously searced data and does
// not append below it
// =====================================================================
function removeOmdbBeforeAppend(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}

// write a function which makes a fetch/http request to the NYT API
// =====================================================================
function nytDataRequest(movie) {
  var nytUrl =
    "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" +
    movie +
    "&api-key=" +
    nytKey;

  fetch(nytUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //store returned data in var
      var nytTitle = data.results[0].display_title;
      var nytLink = data.results[0].link.url;
      var nytSummary = data.results[0].summary_short;
      console.log(nytTitle);
      console.log(nytLink);
      console.log(nytSummary);
      createReviewDataElements(nytTitle, nytLink, nytSummary);
    });
  }
  
  // write a function which dynamically creates elements to display
  // response data from NYT request
  // =====================================================================
  function createReviewDataElements(title, link, summary) {
    // dynamically create elements
    var nytTitle = document.createElement("h2");
    var nytLink = document.createElement("p");
    var nytSummary = document.createElement("p");

     // set content on elements
     nytTitle.textContent = "Title: " + title;
     nytLink.textContent = "Link: " + link;
     nytSummary.textContent = "Summary: " + summary;

     nytTitle.setAttribute("class", "text-3xl")

    removeOmdbBeforeAppend(reviewsDiv);

     reviewsDiv.appendChild(nytTitle);
     reviewsDiv.appendChild(nytLink);
     reviewsDiv.appendChild(nytSummary);
  }


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

// write a function which deletes movies from watchlist
// =====================================================================

// create an event listener for search bar submit form from document
// =====================================================================
var inputForm = document.getElementById("input-form");
// calls init function upon submit button
inputForm.addEventListener("submit", init);

// using event delegation, create an event listener for a button which
// saves movies to a watchlist
// =====================================================================

// using event delegation, create an event listener for a button "X"
// which deletes movies from watchlist
// =====================================================================
