/**
 * Appliation constants
 *
 * Primarily used to define app route constants and action type constants
 *
 * keyMirror makes the value equivalent to they key despite it looking like a null when being initialized
 */

import keymirror from 'keymirror';
import actions from './actions';
export default keymirror({
  ...actions,

  SHOW_LOADER: null,
  HIDE_LOADER: null,
  SHOW_TOAST_MESSAGE: null,
  HIDE_TOAST_MESSAGE: null,
  SET_RIGHT_DRAWER_CONTENT: null,
  CORE_UPDATE_CONNECTION_INFO: null,
  CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_BEGIN: null,
  CORE_APP_HAS_LAUNCHED: null,
  CORE_INTERNET_CONNECTION_ERROR_MODAL: null,
  CORE_UPDATE_DID_STARTUP_NETWORK_ACTIONS_COMPLETE: null,

  CORE_FEATURE_TOGGLES: null,
  CORE_LOAD_LOCAL_FEATURE_TOGGLES: null,
  CORE_FEATURE_TOGGLE_RESET: null,
  CORE_FEATURE_TOGGLE_SET: null,
  CORE_FEATURE_TOGGLE_GET_REQUEST: null,
  CORE_FEATURE_TOGGLE_GET_SUCCESS: null,
  CORE_FEATURE_TOGGLE_GET_FAIL: null,

  NEW_FEATURE_TOGGLE: null
});
