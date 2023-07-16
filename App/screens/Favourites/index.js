import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity} from 'react-native';
import Back from '../../assets/Back.svg';
import {MovieCard} from '../../components';
import {useSelector} from 'react-redux';
import {selectMovie} from '../../redux/slices/movieSlice';

const Favourites = () => {
  const navigation = useNavigation();
  const {favouriteList} = useSelector(selectMovie);

  // Rendering a divider between list items
  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  // Extract the key for each item in the list
  const keyExtractor = item => item.id?.toString();

  // Render each movie item using the MovieCard component
  const renderFoodItem = ({item}) => <MovieCard key={item.id} favourite movie={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.favouritesText}>Favourites</Text>
        <View />
      </View>
      <FlatList
        numColumns={2}
        data={favouriteList}
        keyExtractor={keyExtractor}
        renderItem={renderFoodItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemDivider}
      />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    padding: 15,
    marginBottom: 30
  },
  divider: {
    height: 10,
    width: '100%',
    backgroundColor: '#fff'
  },
  columnWrapper: {
    flex: 0.5
  },
  favouritesText: {color: '#000', fontSize: 24, fontWeight: '500'}
});
