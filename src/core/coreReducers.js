import { combineReducers } from 'redux';
import featureToggleReducer from './featureToggles/featureToggleReducer';
import global from './global/globalReducer';

export default combineReducers({
  global,
  featureToggle: featureToggleReducer
});
