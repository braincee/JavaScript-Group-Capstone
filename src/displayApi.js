
const movieURL = "https://api.tvmaze.com/search/shows?q=the";

export default class MovieAPI {
static showMovies = async () => {
    const res  = await fetch(movieURL);
    const result = await res.json();

    const displayMovie = document.querySelector(".movie-container");

    result.forEach((item) => {
        if (item.show.image !== null) {
            const div = document.createElement("div");
            div.classList.add("div-container");
            div.innerHTML = `<img src="${item.show.image.medium} alt="movie-image">
            <div class="media flex main-space-between">
             <li>${item.show.name}</li>
            <div>
              <p> 0 Likes</p>
            </div>
            </div>
            <button id="${item.show.id}">Comments</button>;
            `
            displayMovie.appendChild(div);
        }
    });

};
};