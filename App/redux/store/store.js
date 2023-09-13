import {configureStore} from '@reduxjs/toolkit';
import movieReducer from '../slices/movieSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadPersistedState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('reduxState');
    if (serializedState !== null) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
};

export const store = configureStore({
  reducer: {
    movie: movieReducer
  },
  preloadedState: loadPersistedState(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const persistStore = async state => {
  try {
    const stateToPersist = JSON.stringify(state);
    await AsyncStorage.setItem('reduxState', stateToPersist);
  } catch (error) {
    console.error('Error storing Redux state:', error);
  }
};

store.subscribe(() => persistStore(store.getState()));

export default store;
