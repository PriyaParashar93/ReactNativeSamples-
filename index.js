/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import componentScreen from './src/screens/componentScreen';

AppRegistry.registerComponent(appName, () => componentScreen);