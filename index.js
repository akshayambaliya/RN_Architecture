/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Root from './src/Root';
import { startNetworkLogging } from 'react-native-network-logger'
import devConfig from './src/config/devConfig';

{ devConfig.devTools && startNetworkLogging() }
AppRegistry.registerComponent(appName, () => Root);
