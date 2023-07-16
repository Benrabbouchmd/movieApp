import {getMovieDetails, getMovies} from '../../services/movieService';
import {
  onAddFavourite,
  onDeleteFavourite,
  onGetMovieDetails,
  onGetMovies
} from '../slices/movieSlice';

const addFavouriteThunk = movie => async dispatch => {
  dispatch(onAddFavourite(movie));
};

const deleteFavouriteThunk =
  ({movieId}) =>
  async dispatch => {
    dispatch(onDeleteFavourite(movieId));
  };

const getMoviesThunk = () => async dispatch => {
  const res = await getMovies();
  dispatch(onGetMovies(res.results));
};
const getMovieDetailsThunk =
  ({movieId}) =>
  async dispatch => {
    const res = await getMovieDetails(movieId);
    dispatch(onGetMovieDetails({data: res, movieId: movieId}));
  };

export {addFavouriteThunk, getMovieDetailsThunk, deleteFavouriteThunk, getMoviesThunk};
