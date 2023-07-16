import Http from './Http';
import {apiKey} from '../../config.json';

const getMovies = async () => {
  const res = await Http.get(`/trending/all/day?api_key=${apiKey}`);
  return res.data;
};
const getMovieDetails = async movieId => {
  const res = await Http.get(`/movie/${movieId}?api_key=${apiKey}`);
  return res.data;
};

export {getMovies, getMovieDetails};
