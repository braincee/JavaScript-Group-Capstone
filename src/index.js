import './style.css';

 const movieUrl = "https://api.tvmaze.com/search/shows?q=die";

 fetch(movieUrl)
 .then(response => response.json())
 .then(data => console.log(data));