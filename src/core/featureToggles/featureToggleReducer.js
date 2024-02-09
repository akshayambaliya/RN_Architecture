import update from 'immutability-helper';
import _ from 'lodash';

const {
  CORE_LOAD_LOCAL_FEATURE_TOGGLES,
  CORE_FEATURE_TOGGLE_GET_SUCCESS,
  CORE_FEATURE_TOGGLE_RESET,
  CORE_FEATURE_TOGGLE_SET,
} = require('../../constants/index').default;

export const initialState = {
  toggles: {},
};

export default function featureToggleReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case CORE_FEATURE_TOGGLE_GET_SUCCESS: {
      let newToggles = state.toggles;
      if (!!action.payload) {
        _.forEach(Object.keys(action.payload), toggleKey => {
          if (!!newToggles[toggleKey]) {
            const storedValue = _.get(
              action,
              `payload.${toggleKey}`,
              newToggles[toggleKey].defaultValue,
            );
            newToggles = update(newToggles, { [toggleKey]: { value: { $set: storedValue } } });
          } else {
            // TODO dipstach an action to remove a toggle that is on the device but not the featureToggles file.
          }
        });
      }
      return {
        ...state,
        toggles: newToggles,
      };
    }

    case CORE_FEATURE_TOGGLE_SET: {
      let toggles = state.toggles;

      _.forOwn(action.toggles, (toggleValue, toggleKey) => {
        if (!!state.toggles[toggleKey]) {
          toggles = update(toggles, { [toggleKey]: { value: { $set: toggleValue } } });
        }
      });

      return {
        ...state,
        toggles,
      };
    }

    case CORE_LOAD_LOCAL_FEATURE_TOGGLES:
    case CORE_FEATURE_TOGGLE_RESET: {
      console.log("CORE_LOAD_LOCAL_FEATURE_TOGGLES", action)
      const toggles = { ...action.localFeatureToggles };
      _.forEach(Object.keys(toggles), toggleKey => {
        _.set(toggles, `${toggleKey}.value`, toggles[toggleKey].defaultValue);
      });
      return {
        ...state,
        toggles,
      };
    }
    default:
      return state;
  }
}
