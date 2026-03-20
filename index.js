/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from './app.json';
import { store, persistor } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HomeScreen />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
