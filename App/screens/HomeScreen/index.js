import React, {useState, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity} from 'react-native';
import XIconSvg from '../../assets/XIcon.svg';
import Search from '../../assets/Search.svg';
import Favourite from '../../assets/Favourite.svg';
import {MovieCard} from '../../components';
import {getMoviesThunk} from '../../redux/thunks/movieThunk';
import {selectMovie} from '../../redux/slices/movieSlice';
import {useDispatch, useSelector} from 'react-redux';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const {movieList} = useSelector(selectMovie);

  // Component for rendering a divider between list items
  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  // Fetch movies when the component mounts
  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  // Filter movies based on the search value
  const filteredMovies = useMemo(
    () =>
      movieList?.filter(movie => movie?.title?.toLowerCase().includes(inputValue?.toLowerCase())),
    [inputValue, movieList]
  );

  const keyExtractor = item => item.id?.toString();

  const renderFoodItem = ({item}) => <MovieCard key={item.id} movie={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Favourites')}
        style={styles.favouriteContainer}>
        <Favourite width={28} height={28} />
      </TouchableOpacity>
      <View style={styles.SearchContainer}>
        <Search style={styles.Search} />
        <TextInput
          onChangeText={text => setInputValue(text)}
          style={styles.SearchInput}
          placeholder="Rechercher"
          value={inputValue}
        />
        {inputValue !== '' && <XIconSvg onPress={() => setInputValue('')} />}
      </View>
      <FlatList
        numColumns={2}
        data={filteredMovies}
        keyExtractor={keyExtractor}
        renderItem={renderFoodItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemDivider}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  divider: {
    height: 10,
    width: '100%',
    backgroundColor: '#fff'
  },
  Search: {
    marginRight: 5
  },
  XIcon: {
    alignSelf: 'flex-start'
  },
  SearchInput: {
    width: 250,
    paddingHorizontal: 10,
    color: '#000',
    textAlign: 'left'
  },
  SearchContainer: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 1,
    width: '90%',
    height: 49,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center'
  },

  favouriteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15
  }
});
