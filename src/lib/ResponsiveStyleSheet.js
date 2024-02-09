/**
 * Allows the user to use the following styles.
 * Styles that are deeper in the style tree will overwrite shallower
 * styles.
 *
 * ios - Style triggers if iOS
 * android - Style triggers if Android
 * tablet - Style triggers if on a tablet device
 * handset - Style triggers if on a handset device
 * notch - Style triggers if on a Face ID device with top notch (ie. iPhone X)
 * homeBar - Stlye triggers if device has a 'Home Indicator' bar at bottom of the screen
 */

import { StyleSheet, Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { flattenStyles } from './SheetHelper';

const isTablet = true;
// const hasNotch = DeviceInfo.hasNotch();

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const platformConfig = {
  isTablet,
  isIOS,
  isAndroid,
  // hasNotch,
};

export function getPlatformStyles(styles) {
  const platformStyles = {};

  Object.keys(styles).forEach(name => {
    platformStyles[name] = flattenStyles(styles[name], platformConfig);
  });

  return platformStyles;
}

const ResponsiveStyleSheet = {
  create(styles) {
    return StyleSheet.create(getPlatformStyles(styles));
  },
};

export default ResponsiveStyleSheet;
