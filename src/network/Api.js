// Base Api class that all feature Apis extend

import _ from 'lodash';

import { apiHelper, getFallbackJSONResponse, timeout } from './apiHelper';

// To enable/disable universal endpoints, USE_UNIVERSAL_ENDPOINTS_IOS and USE_UNIVERSAL_ENDPOINTS_ANDROID need to be updated as well.
export const USE_UNIVERSAL_ENDPOINTS = false;
export const NETWORK_CALL_TIMEOUT_MS = 30000;

export default class Api {
  apiConfig;
  getState;
  dispatch;
  baseUri;
  variant;

  constructor(apiConfig) {
    this.apiConfig = apiConfig;
    this.dispatch = apiConfig.dispatch;
    this.getState = apiConfig.getState;
    this.baseUri = "https://dummy.restapiexample.com/api/v1/"
    //If just one base URl then we can set here
    //For multiple base URL we can cretea a new class and extend this one and replace baseUrl with this.baseUrl
  }

  fetch(apiOptions) {

    const promise = this._fetch(apiOptions).catch(error => {
      const fallbackJSON = apiOptions.fallbackJSON;
      if (!!fallbackJSON) {
        // if Json API fails, then return fallback response.
        console.warn('Unexpected error making API call, falling back to static JSON.');
        return getFallbackJSONResponse(apiOptions.url, fallbackJSON);
      } else {
        // If we need to handle specifically we can add here. Otherwise return error.
        console.warn('Unexpected error making API call with no fallback content');
        throw error;
      }
    });
    return promise.then(apiHelper(apiOptions, this.apiConfig));

  }

  _getURL(options) {
    let url = '';
    const path =
      !!this.baseUri && options.url.startsWith('/') ? options.url.substring(1) : options.url;
    url = this.baseUri + path;
    return url;
  }

  // Cookies automatically handled by fetch runtime
  async _fetch(apiOptions) {
    const options = {
      method: 'GET',
      ...apiOptions,
    };

    const httpRequest = {
      method: options.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Cache-Control': 'no-cache',
        // 'X-Client-Platform': '',
        // As of this writing (8/20/2016 RN 0.31.0) any header's key will be changed to lowercase
        // 'X-Application-Version': '',
        // Android native layer uses okhttp3 interceptor to set client platform, device os, AND a new key x-native-version (to distinguish between js and native code)
        // TODO implement equivalent behavior in iOS
        ...options.headers,
        // Below will override any headers given to the constructor of
        // the API object with headers given in networkMiddleware.js
        ...this.apiConfig.headers,
      },
    };


    // Set session token in auth header for every request that doens't have one
    // to get the data from redux we can use this.getState()
    // const xUsesTok = await AsyncStorage.getItem(' ');
    // const hasSession = xUsesTok != null && !httpRequest.headers.hasOwnProperty('Authorization');
    // if (hasSession) {
    //   httpRequest.headers.Authorization = `Bearer ${xUsesTok}`;
    // }


    if (options.body) {
      httpRequest.body = JSON.stringify(options.body);
    }

    // Logic around absolute & relative URLs, if absolute use it, otherwise use bank or card prefix based on network apiOptions
    const url = this._getURL(options);

    const state = this.getState();
    const connectionInfo = _.get(state, 'core.global.connectionInfo', 'unknown');
    const isConnectedToInternet = connectionInfo !== 'none';
    const timeoutMs = isConnectedToInternet ? options.timeoutMs || NETWORK_CALL_TIMEOUT_MS : 1;
    console.log("URL", url);
    console.log("httpReques", httpRequest);
    return timeout(fetch(url, httpRequest), timeoutMs, url, options.fallbackJSON);
  }
}
