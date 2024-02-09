import { createSelector } from 'reselect';
import _ from 'lodash';

const getFeatureToggleValueHelper = (state, toggle) =>
  _.get(state, ['core', 'featureToggle', 'toggles', toggle, 'value'], false);

export const getFeatureToggleValue = createSelector(
  [getFeatureToggleValueHelper],
  toggles => toggles,
);

const getEligibleFeatureTogglesHelper = (state) => state.core.featureToggle.toggles;

const isTabletHelper = (state) => true;

export const getEligibleFeatureToggles = createSelector(
  [getEligibleFeatureTogglesHelper, isTabletHelper],
  (features, isTablet) => {
    const eligibleFeatures = {};
    Object.keys(features).forEach((key) => {
      const feature = features[key];
      eligibleFeatures[key] = feature;
    });
    return eligibleFeatures;
  },
);
