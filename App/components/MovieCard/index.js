import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFavouriteThunk, getMovieDetailsThunk} from '../../redux/thunks/movieThunk';
import {baseIMG} from '../../../config.json';
import Toast from 'react-native-toast-message';
import {selectMovie} from '../../redux/slices/movieSlice';
import Minus from '../../assets/Minus.svg';
import Star from '../../assets/Star.svg';

const MovieCard = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {favourite, movie} = props || {};
  const {movieDetails} = useSelector(selectMovie);

  // Calculate the rating of the movie
  const Rating = () => {
    const rating = (movieDetails[movie?.id]?.vote_average / 10) * 5;
    return rating.toFixed(1);
  };

  // Handle removing a movie from favorites
  const handleDeleteFavourite = () => {
    dispatch(deleteFavouriteThunk({movieId: movie.id}));
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: 'Movie removed successfully from favorites',
      autoHide: true,
      visibilityTime: 2000
    });
  };

  useEffect(() => {
    dispatch(getMovieDetailsThunk({movieId: movie.id}));
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', {movie: movie})}
      style={styles.CardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: `${baseIMG}${movie.poster_path}`}} style={styles.poster} />
        {favourite && (
          <TouchableOpacity onPress={handleDeleteFavourite} style={styles.minus}>
            <Minus width={25} height={25} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={{width: 153, marginTop: 5}}>{movie?.title}</Text>
      <View style={styles.rating}>
        <Text style={styles.rate}>{Rating()}</Text>
        <Star />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  CardContainer: {
    flex: 1 / 2,
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-between',
    padding: 10
  },
  poster: {width: 153, height: 200, objectFit: 'cover'},
  imageContainer: {position: 'relative'},
  minus: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 99,
    backgroundColor: '#fff',
    borderRadius: 99
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  rate: {marginRight: 5}
});
