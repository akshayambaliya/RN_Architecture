import _ from 'lodash';
export function filterFeatureToggles(featureToggles, searchText) {
  let filteredFeatureToggles = {};

  Object.keys(featureToggles).map(key => {
    const featureToggle = featureToggles[key];
    const { displayName, description, adobeTargetDescription } = featureToggle;

    if (
      displayName.toLowerCase().includes(searchText.toLowerCase()) ||
      (!!description && description.toLowerCase().includes(searchText.toLowerCase())) ||
      (!!adobeTargetDescription &&
        adobeTargetDescription.toLowerCase().includes(searchText.toLowerCase()))
    ) {
      filteredFeatureToggles = { ...filteredFeatureToggles, [key]: featureToggles[key] };
    } else {
      filteredFeatureToggles = { ...filteredFeatureToggles };
    }

    return true;
  });

  return filteredFeatureToggles;
}
