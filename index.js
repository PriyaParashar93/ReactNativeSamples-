/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { store } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
