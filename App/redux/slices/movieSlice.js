import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteList: [],
  movieList: [],
  movieDetails: {}
};
const movieSlice = createSlice({
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
      state.movieDetails[action.payload.movieId] = action.payload.data;
    }
  }
});

export const {onAddFavourite, onDeleteFavourite, onGetMovies, onGetMovieDetails} =
  movieSlice.actions;
export const selectMovie = state => state.movie;

//extraReducers
movieSlice.extraReducers = builder => {
  builder.addCase(onAddFavourite, (state, action) => {
    persistStore(state);
  });
  builder.addCase(onDeleteFavourite, (state, action) => {
    persistStore(state);
  });
};

export default movieSlice.reducer;
