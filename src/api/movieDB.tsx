import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'c795fd244d96a62a9e93cb17e609b653',
    language: 'en-US',
  },
});

export default movieDB;
