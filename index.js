const movieName = document.getElementById("movie")
const movieList = document.getElementById("movie-list")
const watchlist = document.getElementById("watchlist")

let movieContainer = ""
let localData = {}
let localArray = []
let movieID = []
let watchListArray = []
let watchListObj = {}

document.getElementById("searchbtn").addEventListener("click", async () => {
    
    localStorage.clear()
    movieList.innerHTML = ""
    localArray = []

    const response = await fetch (`http://www.omdbapi.com/?s=${movieName.value}&apikey=97d00e09`)
    const data = await response.json()
   
    if (data.Error === "Movie not found!"){
        movieContainer = `
            <h3>No movie found</h3>
        `
        movieList.innerHTML = movieContainer
        movieName.value = ""
    } else if (movieName.value === ""){
        movieContainer = `
            <h3>Please enter a movie title</h3>
        `
        movieList.innerHTML = movieContainer
        movieName.value = ""
    } else{        
        data.Search.forEach(element => {
            if (!(localArray.includes(element.imdbID))){
                localArray.push(element.imdbID)
                localStorage.setItem("watchlist", JSON.stringify(localArray))
            }
    })        
    getMovieDetails()
    movieName.value = ""
    }   
})

function getMovieDetails(){

    movieID = JSON.parse(localStorage.getItem("watchlist"))
    movieID.forEach(element => {
        fetch (`http://www.omdbapi.com/?i=${element}&apikey=97d00e09`)
        .then(response => response.json())
        .then(data => {
                localData.Poster = data.Poster
                localData.Title = data.Title
                if(data.Ratings != ""){
                    localData.Ratings = data.Ratings[0].Value
                } else {
                    localData.Ratings = "Ratings not available"
                }
                localData.Genre = data.Genre
                localData.Runtime = data.Runtime
                localData.Plot = data.Plot
                localData.Year = data.Year
                localData.imdbID = data.imdbID
                localStorage.setItem(localData.imdbID, JSON.stringify(localData))
                movieList.innerHTML += renderMovieList(localData)
            })
        })
        localStorage.clear("watchlist")
}

function renderMovieList(_movieData){
    if (_movieData.Ratings != "N/A"){ //check for when movie rating array is []
            let renderMovie = `
            <div id = "movieContainer">
                <img src = ${_movieData.Poster} id = "movie-poster">
                <div id ="movieDetails">
                    <a id = "movieTitle">${_movieData.Title}</a>
                    <a id = "movieYear">(${_movieData.Year})</a>
                    <a id = "movieRating">${_movieData.Ratings}</a>
                    <br>
                    <a id = "movieRuntime">${_movieData.Runtime}</a>
                    <a id = "movieGenre">${_movieData.Genre}</a>
                    <a>${_movieData.imdbID}</a>
                    <br>
                    <p id = "moviePlot">${_movieData.Plot}</p>
                </div>
                <input type = "checkbox" id = "watch-list" name= "${_movieData.imdbID}" onclick = "saveMovie(name)">
                <label for = "watch-list">Watchlist</label> 
            </div>
            `
            return renderMovie
        } else {
            let renderMovie = `
            <div id = "movieContainer">
                <img src = ${_movieData.Poster} id = "movie-poster">
                <div id ="movieDetails">
                    <a id = "movieTitle">${_movieData.Title}</a>
                    <a id = "movieYear">(${_movieData.Year})</a>
                    <a id = "movieRating">Ratings not available</a> 
                    <br>
                    <a id = "movieRuntime">${_movieData.Runtime}</a>
                    <a id = "movieGenre">${_movieData.Genre}</a>
                    <a>${_movieData.imdbID}</a>
                    <br>
                    <p id = "moviePlot">${_movieData.Plot}</p>
                </div>
                <input type = "checkbox" id = "watch-list" name="${_movieData.imdbID}" onclick = "saveMovie(name)">
                <label for = "watch-list">Watchlist</label> 
            </div>
            `
            return renderMovie
        }
}

function saveMovie(_movieId){
    watchListArray = []
    document.querySelectorAll("#watch-list").forEach(element => {
        if (element.checked){
            watchListArray.push(element.name)
        }
    })
    localStorage.setItem("w", JSON.stringify(watchListArray))
    console.log(watchListArray)
}


