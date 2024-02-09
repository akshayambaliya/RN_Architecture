export function flattenStyles(
  styleObject,
  platformConfig,
) {
  const {
    ios,
    android,
    tablet,
    handset,
    notch,
    ...style
  } = {
    ...styleObject,
  };

  let retVal = style;

  const flattenedStyles = [];

  if (ios && platformConfig.isIOS) {
    flattenedStyles.push(flattenStyles(ios, platformConfig));
  } else if (android && platformConfig.isAndroid) {
    flattenedStyles.push(flattenStyles(android, platformConfig));
  }

  if (platformConfig.isTablet) {
    if (tablet) {
      flattenedStyles.push(flattenStyles(tablet, platformConfig));
    }
  } else if (handset) {
    flattenedStyles.push(flattenStyles(handset, platformConfig));
  }
  if (notch && platformConfig.hasNotch) {
    flattenedStyles.push(flattenStyles(notch, platformConfig));
  }

  flattenedStyles.forEach(s => {
    retVal = { ...retVal, ...s };
  });

  return retVal;
}
