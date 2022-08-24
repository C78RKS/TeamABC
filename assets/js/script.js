// globally scoped var's
// =====================================================================
var omdbKey = "38a65d1a";
var omdbUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey;

// write a function which makes a fetch/http request to the OMDB API for data
// =====================================================================
fetch (omdbUrl) 
    .then(function (response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);
    })


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


// using event delegation, create an event listener for a button which 
// saves movies to a watchlist
// =====================================================================