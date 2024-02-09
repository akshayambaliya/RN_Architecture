import AsyncStorage from '@react-native-async-storage/async-storage';

import localFeatureToggles from './featureToggles';

const {
  CORE_FEATURE_TOGGLES,
  CORE_LOAD_LOCAL_FEATURE_TOGGLES,
  CORE_FEATURE_TOGGLE_RESET,
  CORE_FEATURE_TOGGLE_SET,
  CORE_FEATURE_TOGGLE_GET_REQUEST,
  CORE_FEATURE_TOGGLE_GET_SUCCESS,
  CORE_FEATURE_TOGGLE_GET_FAIL,
} = require('../../constants/index').default;

export function setFeatureToggles(toggles) {
  return {
    type: CORE_FEATURE_TOGGLE_SET,
    toggles,
    payloadFunc: async () => {
      await AsyncStorage.mergeItem(CORE_FEATURE_TOGGLES, JSON.stringify(toggles));
    },
  };
}

export function getDeviceFeatureToggles() {
  return {
    types: [
      CORE_FEATURE_TOGGLE_GET_REQUEST,
      CORE_FEATURE_TOGGLE_GET_SUCCESS,
      CORE_FEATURE_TOGGLE_GET_FAIL,
    ],
    promise: async () => {
      const value = await AsyncStorage.getItem(CORE_FEATURE_TOGGLES);
      return JSON.parse(value) ?? {};
    },
  };
}


export function resetToggles() {
  return {
    type: CORE_FEATURE_TOGGLE_RESET,
    payloadFunc: () => {
      AsyncStorage.removeItem(CORE_FEATURE_TOGGLES);
    },
    localFeatureToggles,
  };
}

export function processLocalToggles() {
  return {
    type: CORE_LOAD_LOCAL_FEATURE_TOGGLES,
    localFeatureToggles,
  };
}
