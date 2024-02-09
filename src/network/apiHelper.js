import _ from 'lodash';
export const ERROR_NETWORK_TIMEOUT = 'timeout';

function getVerboseResponse(response, responseJson) {
  const { headers, ok, status } = response;
  return {
    body: responseJson,
    headers,
    ok,
    status,
  };
}

export function packageErrorWithMeta(objectToWrap, response) {
  return {
    errorMetaData: {
      url: response.url,
      status: response.status,
    },
    error: objectToWrap,
  };
}

export function apiHelper(
  options,
  apiConfig,
) {
  return (response) =>
    Promise.resolve(response)
      .then(preProcessor(options, apiConfig))
      .then(responseText)
      .then(postProcessor(options))
      .then(responseBody => {

        const url = response.url;
        return responseToJson(options, url)(responseBody);
      })
      .then(responseJson => {
        const verboseResponse = getVerboseResponse(response, responseJson);

        if (response.ok) {
          // Allows for overriding a success: If options.overrideSuccessAsFail returns true,
          // handle this as a fail instead
          if (
            options.overrideSuccessAsFail &&
            options.overrideSuccessAsFail(verboseResponse) === true
          ) {
            throw { payload: verboseResponse };
          } else if (options.verbose) {
            return verboseResponse;
          } else {
            return responseJson;
          }
        } else {
          // Allows for overriding a failure: If options.overrideFailAsSuccess returns true,
          // handle this as a success instead
          if (
            options.overrideFailAsSuccess &&
            options.overrideFailAsSuccess(verboseResponse) === true
          ) {
            return verboseResponse;
          }

          if (options.fallbackJSON) {
            console.warn(`Got ${response.status} for ${response.url} but using fallback content.`);
            return options.fallbackJSON;
          }

          throw { payload: verboseResponse };
        }
      })
      .catch(error => {
        throw packageErrorWithMeta(error, response);
      });
}

const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace);

// Had issues with some *.json files (HighlightedFeatures *cough *cough)
// Without stripping invalid characters first
const singleQuote = "'";
const singleSlash = '\\\\';
const doubleSlash = singleSlash + singleSlash;
const rafPrefix = 'ï»¿';
const cleanJsonFile = response => {
  let retVal = replaceAll(response, doubleSlash + singleQuote, '');
  retVal = replaceAll(retVal, singleSlash + singleQuote, '');
  retVal = replaceAll(retVal, rafPrefix, '');
  return retVal;
};

export const responseToJson = (options, url) => (responseBody) => {
  try {
    if (responseBody.length > 0) {
      return JSON.parse(responseBody);
    } else {
      return undefined;
    }
  } catch (e) {
    let fallbackJSON = {};
    console.warn(e, `Could not parse response body as json from ${url}`);
    if (options.fallbackJSON) {
      fallbackJSON = options.fallbackJSON;
    }
    return fallbackJSON;
  }
};

const responseText = response => response.text();


function preProcessor(options, { dispatch }) {
  return response => {
    return response;
  };
}

function postProcessor(options) {
  return response => {
    if (options.cleanJson === true) {
      return cleanJsonFile(response);
    }
    return response;
  };
}

/**
 * Inspired from https://github.com/github/fetch/issues/175#issuecomment-125779262
 * If promise fulfills before timeout, then fulfill with the response of the promise
 * If timeout fires first, then fulfill this promise by either resolving with fallback content or rejecting with a network error
 * @param {*} promise Promise to fire.  Initial intent is a network action where duration is unknown.
 * @param {*} timeInMS Time to wait, in milliseconds, before we fulfill with fallback
 * @param {*} url URL to attempt to return fallback content for
 * @param {*} fallbackJSON JSON object to be returned as fallback content
 */
export function timeout(
  promise,
  timeInMS,
  url,
  fallbackJSON,
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fallbackJSON) {
        const response = getFallbackJSONResponse(url, fallbackJSON);
        resolve(response);
      } else {
        reject({ error: ERROR_NETWORK_TIMEOUT });
      }
    }, timeInMS);
    promise.then(resolve, reject);
  });
}

export function getFallbackJSONResponse(url, fallbackJSON) {
  const headers = {
    get(key) {
      return undefined;
    },
  };
  const response = {
    url,
    ok: true,
    status: 200,
    headers,
    text: () => JSON.stringify(fallbackJSON),
  };
  return response;
}

