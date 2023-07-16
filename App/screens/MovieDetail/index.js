import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {baseIMG} from '../../../config.json';
import {selectMovie} from '../../redux/slices/movieSlice';
import {addFavouriteThunk, deleteFavouriteThunk} from '../../redux/thunks/movieThunk';
import Back from '../../assets/Back.svg';
import Star from '../../assets/Star.svg';
import FavouriteIcon from '../../assets/FavouriteIcon.svg';
import FavouriteIconRed from '../../assets/FavouriteIconRed.svg';

const MovieDetail = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {movie} = route.params || {};
  const {favouriteList, movieDetails} = useSelector(selectMovie);

  const favouriteIdList = favouriteList.map(favourite => favourite.id);
  const [isFavourite, setIsFavourite] = useState(favouriteIdList.includes(movie?.id));

  //Calculate the rating from the vote average values
  const Rating = () => {
    const rating = (movieDetails[movie?.id]?.vote_average / 10) * 5;
    return rating.toFixed(1);
  };

  // Handle adding a movie to favorites
  const handleAddFavourite = () => {
    setIsFavourite(oldState => !oldState);
    dispatch(addFavouriteThunk(movie));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Movie added successfully to favorites',
      autoHide: true,
      visibilityTime: 2000
    });
  };

  // Handle removing a movie from favorites
  const handleDeleteFavourite = () => {
    setIsFavourite(oldState => !oldState);
    dispatch(deleteFavouriteThunk({movieId: movie.id}));
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: 'Movie removed successfully from favorites',
      autoHide: true,
      visibilityTime: 2000
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={{uri: `${baseIMG}${movie.poster_path}`}} style={styles.image} />
          <View style={styles.header}>
            <Back onPress={() => navigation.goBack()} />
            {isFavourite ? (
              <FavouriteIconRed onPress={handleDeleteFavourite} width={28} height={28} />
            ) : (
              <FavouriteIcon onPress={handleAddFavourite} width={28} height={28} />
            )}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{width: '85%'}}>
            <Text style={styles.movieTitle}>{movie?.title}</Text>
            <View style={styles.info}>
              <View style={styles.infoTitleContainer}>
                <Text style={styles.infoTitle}>Duration</Text>
                <Text style={[styles.infoTitle, styles.infoValue]}>
                  {movieDetails[movie?.id]?.runtime} min
                </Text>
              </View>
              <View style={styles.infoTitleContainer}>
                <Text style={styles.infoTitle}>Release date</Text>
                <Text style={(styles.infoTitle, styles.infoValue)}>{movie?.release_date}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rateContainer}>
            <Text style={styles.rate}>{Rating()}</Text>
            <Star />
          </View>
        </View>
        <View style={styles.category}>
          {movieDetails[movie?.id]?.genres?.map(genre => (
            <Text style={styles.genre}>{genre?.name}</Text>
          ))}
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <View style={styles.overviewText}>
            <Text>{movie?.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff'
  },
  overviewContainer: {display: 'flex', paddingTop: 15, paddingHorizontal: 10},
  overviewText: {padding: 20},
  overviewTitle: {color: '#000', fontSize: 24, fontWeight: '500'},
  movieTitle: {color: '#000', fontSize: 28, fontWeight: '500', marginBottom: 30},
  info: {display: 'flex', flexDirection: 'row', marginBottom: 20},
  infoTitleContainer: {display: 'flex', flexDirection: 'column'},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  infoTitle: {color: '#000', marginRight: 20},
  infoValue: {marginTop: 3, color: '#a2a2a2'},
  category: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  genre: {
    color: '#000',
    borderWidth: 1,
    borderRadius: 99,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 35,
    textAlign: 'center',
    marginRight: 10,
    marginTop: 5
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    padding: 15,
    width: '100%',
    height: 250,
    justifyContent: 'space-between'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '110%',
    height: 250,
    objectFit: 'cover',
    zIndex: -1
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15
  },
  rate: {color: '#000', fontSize: 15, fontWeight: '500', marginRight: 10},
  rateContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  }
});
