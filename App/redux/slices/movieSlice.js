import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteList: [],
  movieList: [],
  movieDetails: {}
};
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    onAddFavourite: (state, action) => {
      state.favouriteList = [...state.favouriteList, action.payload];
    },
    onDeleteFavourite: (state, action) => {
      state.favouriteList = state.favouriteList.filter(movie => movie.id !== action.payload);
    },
    onGetMovies: (state, action) => {
      state.movieList = action.payload;
    },
    onGetMovieDetails: (state, action) => {
      console.log('🚀  action.payload:', action.payload);
      state.movieDetails[action.payload.movieId] = action.payload.data;
    }
  }
});

export const {onAddFavourite, onDeleteFavourite, onGetMovies, onGetMovieDetails} =
  movieSlice.actions;
export const selectMovie = state => state.movie;

export default movieSlice.reducer;
