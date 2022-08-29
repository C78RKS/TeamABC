// globally scoped var's
// =====================================================================
var omdbKey = "38a65d1a";
var inputForm = document.getElementById("input-form");
var movieDiv = document.getElementById("movie");
var reviewsDiv = document.getElementById("reviews");
var savedMovies = document.querySelector("#saved-movies");
var nytKey = "F65iUnYMHIuXFqyxD64typ0dIZG0gqFF";
var list = [];

getLocalStorage();
renderList();

// write a function which initializes code from event listener on submit button
// =====================================================================
function init(event) {
  event.preventDefault();
  //   targets element from html with id of "input-field"
  var inputField = document.getElementById("input-field");
  //   gets input value from search bar
  var movieTitle = inputField.value;
  // if search bar input is empty, stop function
  if (movieTitle === "") {
    return;
  }
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
      // sendToLocalStorage(title);

      // call send to local function here, pass "title"
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
  movieTitle.textContent = title;
  movieYear.textContent = "Year: " + year;
  movieRated.textContent = "Rating: " + rated;
  movieRuntime.textContent = "Runtime: " + runtime;
  movieGenre.textContent = "Genre: " + genre;

  taskbutton.textContent = "Save to Watchlist";
  taskbutton.setAttribute("id", "save-button");
  taskbutton.setAttribute(
    "class",
    "btn hover:cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5"
  );
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
      // var nytTitle = data.results[0].display_title;
      // var nytLink = data.results[0].link.url;
      // var nytSummary = data.results[0].summary_short;
      // console.log(nytTitle);
      // console.log(nytLink);
      // console.log(nytSummary);

      var dataResults = data.results;
      console.log(dataResults);

      createReviewDataElements(dataResults);
    });
}

// write a function which dynamically creates elements to display
// response data from NYT request
// =====================================================================
function createReviewDataElements(array) {
  removeOmdbBeforeAppend(reviewsDiv);
  for (i = 0; i < array.length; i++) {
    // dynamically create elements
    var nytTitle = document.createElement("h2");
    var nytLink = document.createElement("a");
    var nytDiv = document.createElement("div");
    var nytSummary = document.createElement("p");
    // var nytAnchor = document.createElement("a");

    var link = array[i].link.url;
    nytLink.setAttribute("href", link);
    nytLink.setAttribute("class", "underline");
    nytLink.textContent = "Read review";

    nytDiv.setAttribute("class", "text-red-500 cust-fnt-sz mb-5");
    nytDiv.appendChild(nytLink);

    // set content on elements
    nytTitle.textContent = "Title: " + array[i].display_title;
    nytSummary.textContent = "Summary: " + array[i].summary_short;

    nytTitle.setAttribute("class", "text-3xl");

    reviewsDiv.appendChild(nytTitle);
    reviewsDiv.appendChild(nytSummary);
    reviewsDiv.appendChild(nytDiv);
  }
}

// write a function which gets local storage if it exists
// =====================================================================

function getLocalStorage() {
  var storedList = JSON.parse(localStorage.getItem("list"));

  if (storedList !== null) {
    list = storedList;
  }
}

// write a function which stores movies to local storage
// =====================================================================
function sendToLocalStorage() {
  var title = movieDiv.children[0].textContent;
  // if movie to be saved is already in watchlist, stop function
  for (i = 0; i < list.length; i++) {
    if (list[i] === title) {
      return;
    }
  }
  getLocalStorage();
  list.push(title);
  localStorage.setItem("list", JSON.stringify(list));
  renderList();
}

// write a function which dynamically displays watchlist
// =====================================================================
function renderList() {
  savedMovies.innerHTML = ""; //List of movies
  // if(list !== null) {
  //listCount.textContent = list.length; //counts the movies on the watch list
  for (var i = 0; i < list.length; i++) {
    var movie = list[i];

    var li = document.createElement("li");
    li.textContent = movie;
    li.setAttribute("data-index", i);
    li.setAttribute("class", "bg-blue-200 rounded-md mt-2");
    var button = document.createElement("button");
    button.textContent = "X";
    button.setAttribute(
      "class",
      "ml-2 px-1 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm text-center mr-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
    );

    li.appendChild(button);
    savedMovies.appendChild(li);
  }
  // }
}

// write a function which deletes movies from watchlist
// =====================================================================
function deleteMovie(event) {
  var element = event.target;

  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    list.splice(index, 1);
    console.log(list);
    localStorage.setItem("list", JSON.stringify(list));
    getLocalStorage();
    renderList();
  }
}

// create an event listener for search bar submit form from document
// =====================================================================
// calls init function upon submit button
inputForm.addEventListener("submit", init);

// using event delegation, create an event listener for a button which
// saves movies to a watchlist
// =====================================================================
movieDiv.addEventListener("click", sendToLocalStorage);

// using event delegation, create an event listener for a button "X"
// which deletes movies from watchlist
// =====================================================================
savedMovies.addEventListener("click", deleteMovie);
