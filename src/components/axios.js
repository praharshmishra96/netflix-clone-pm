import axios from 'axios'

const tmdbInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

const dbInstance = axios.create({
    baseURL: "https://netflix-clone-backend-x9uj.onrender.com",
});

export {tmdbInstance, dbInstance};