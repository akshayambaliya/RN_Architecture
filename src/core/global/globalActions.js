
import NetInfo from '@react-native-community/netinfo';
const {
  CORE_UPDATE_CONNECTION_INFO,
  CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_BEGIN,
  CORE_APP_HAS_LAUNCHED,
  CORE_INTERNET_CONNECTION_ERROR_MODAL
} = require('../../constants/index').default;

export function updateConnectionInfo(payload) {
  return {
    type: CORE_UPDATE_CONNECTION_INFO,
    payload,
  };
}

export function updateDidStartupNetworkActionsBegin() {
  return {
    type: CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_BEGIN,
  };
}

export function initAppNetwork() {
  return (dispatch, getState) => {
    dispatch(updateDidStartupNetworkActionsBegin());
  };
}


export function onConnectionChange(type, dispatch, getState) {
  dispatch(updateConnectionInfo(type));
  const isConnected = type !== 'none';
  const { global } = getState().core;
  const hasConnection = isConnected;

  if (hasConnection && !global.isLoadingNetworkActions) {
    dispatch(initAppNetwork());
  } else if (!hasConnection) {
    // dispatch(routeActions.navigate({ routeName: CORE_INTERNET_CONNECTION_ERROR_MODAL }));
  }
}

const initNetworkEventListener = (dispatch, getState) => {
  NetInfo.fetch().then(connectionInfo => {
    onConnectionChange(connectionInfo.type, dispatch, getState);
  });

};

export function appHasLaunched() {
  return (dispatch, getState) => {
    if (getState().core.global.initialAppLaunch) {
      initNetworkEventListener(dispatch, getState);
      dispatch({ type: CORE_APP_HAS_LAUNCHED });
    }
  };
}
