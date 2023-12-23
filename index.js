/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWrapper from './components/src/AppWrapper';
import {name as appName} from './app.json';
console.error = () => {};
console.warn = () => {};
AppRegistry.registerComponent(appName, () => AppWrapper);
