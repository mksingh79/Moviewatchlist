const movieWatchList = document.getElementById("movie-watchlist")

let watchlisthere = JSON.parse(localStorage.getItem("w"))

watchlisthere.forEach(element => {
    movieWatchList.innerHTML += renderWatchList(JSON.parse(localStorage.getItem(element)))
})

function renderWatchList(_movieData){
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
                <br>
                <p id = "moviePlot">${_movieData.Plot}</p>
            </div>
            <button type="submit" id="removebtn" name= "${_movieData.imdbID}" onclick = "removemovie(name)">Remove</button>
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
                <a id = "movieRating">N/A</a> 
                <br>
                <a id = "movieRuntime">${_movieData.Runtime}</a>
                <a id = "movieGenre">${_movieData.Genre}</a>
                <br>
                <p id = "moviePlot">${_movieData.Plot}</p>
            </div>
            <button type="submit" id="removebtn" name= "${_movieData.imdbID}" onclick = "removemovie(name)">Remove</button>
        </div>
        `
        return renderMovie
    }
}

function removemovie(_movieId){
    watchlisthere.forEach(element => {
        if (_movieId === element){
            watchlisthere.splice(watchlisthere.indexOf(element), 1)
        } 
    })
    movieWatchList.textContent = ""
    watchlisthere.forEach(element => {
        movieWatchList.innerHTML += renderWatchList(JSON.parse(localStorage.getItem(element)))
    })
    
}
