import _ from 'lodash';

const {
  SHOW_LOADER,
  HIDE_LOADER,
  CORE_UPDATE_CONNECTION_INFO,
  CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_BEGIN,
  CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_COMPLETE,
  CORE_APP_HAS_LAUNCHED
} = require('../../constants/index').default;

export const initialState = {
  showLoader: false,
  showLoaderCount: 0,
  shouldPersistKeyboardDuringLoader: false,
  loaderType: undefined,
  connectionInfo: 'unknown',
  initialAppLaunch: true,
  didStartupNetworkActionsComplete: false,
  isLoadingNetworkActions: false,
};

// $FlowFixMe
export default function globalReducer(state = initialState, action = {}) {
  const shouldPersistKeyboardDuringLoader = _.get(
    action.payload,
    'shouldPersistKeyboardDuringLoader',
    false,
  );
  const loaderType = _.get(action.payload, 'loaderType');
  let showLoaderCount = state.showLoaderCount;
  switch (action.type) {
    case SHOW_LOADER:
      showLoaderCount += 1;
      return {
        ...state,
        showLoader: true,
        loaderType,
        showLoaderCount,
        shouldPersistKeyboardDuringLoader:
          showLoaderCount === 1
            ? shouldPersistKeyboardDuringLoader
            : state.shouldPersistKeyboardDuringLoader,
      };
    case HIDE_LOADER:
      showLoaderCount -= action.count ?? 1;
      return {
        ...state,
        showLoader: showLoaderCount > 0,
        showLoaderCount,
        shouldPersistKeyboardDuringLoader:
          showLoaderCount > 0 ? state.shouldPersistKeyboardDuringLoader : false,
      };
    case CORE_UPDATE_CONNECTION_INFO:
      return {
        ...state,
        connectionInfo: action.payload,
      };
    case CORE_APP_HAS_LAUNCHED:
      return {
        ...state,
        initialAppLaunch: false,
      };
    case CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_BEGIN:
      return {
        ...state,
        isLoadingNetworkActions: true,
      };
    default:
      return state;
  }
}
