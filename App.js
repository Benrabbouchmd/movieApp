import React from 'react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {store} from './App/redux/store/store';
import Route from './App/route/Route';

function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <Route />
      <Toast />
    </Provider>
  );
}

export default App;
