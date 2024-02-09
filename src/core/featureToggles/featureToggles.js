import _ from 'lodash';

const {
  NEW_FEATURE_TOGGLE,
} = require('../../constants/index').default;
/**
 * Feature Toggles
 */
const featureToggles = {

  /**
   * @alias NEW_FEATURE_TOGGLE
   * @author 'New Feature For User'
   * @description 'When turned on, new feature is enabled'
   * @default false
   */
  [NEW_FEATURE_TOGGLE]: {
    displayName: 'New Feature For User',
    description: 'When turned on, new feature is enabled',
    defaultValue: false,
  },

};


export default featureToggles;
