import './style.css';

import MovieAPI from './displayApi';
import logo from './assests/logo.png';

const navLogo = document.getElementById('logo');
navLogo.src = logo;

MovieAPI.showMovies();
