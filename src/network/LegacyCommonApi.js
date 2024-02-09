import { getHref } from '../utils/urls';

import Api from './Api';

/**
 * Use CommonApi.js if the API you're calling is NOT hosted on WebSphere.
 * LegacyCommonApi is used when calling an API that is hosted on WebSphere. WebSphere APIs are only able
 * to respond to GET and POST requests. All other methods need to use X-HTTP-Method-Override header,
 * this class will add the header for PUT and DELETE requests for a better developer experience
 */
export default class LegacyCommonApi extends Api {
  // $FlowFixMe
  constructor(options) {
    super(options);
    //this.baseUrl
  }

  // $FlowFixMe
  get(url, opts) {
    const options = Object.assign(
      {},
      {
        method: 'GET',
        url,
        body: null,
        callback: null,
      },
      opts,
    );

    return this.fetch(options);
  }

  // $FlowFixMe
  post(url, body = null, opts) {
    const options = Object.assign(
      {},
      {
        method: 'POST',
        url,
        body,
        callback: null,
      },
      opts,
    );

    return this.fetch(options);
  }

  /**
   * Returns a PUT request with the addition of bank specific configuration (headers, variant, etc)
   * @param {string} url Paths without base domain ('list/0') or full path url ('https://example.com/list/0'). Paths
   *                     without base domain will apply base domain from variant
   * @param {object} body The Payload
   * @param {ApiOptions} opts Values passed in the Api method call. Values here may not make it to actual RN fetch call
   *                          but are used to drive our project's Api behavior
   * @param {boolean} overrideWithPostMethod True by default, if true it will send a POST request + method override header
   *                                         as PUT. WebSphere apps that are behind apache only support GET and POST. Modern
   *                                         APIs that are hosted in PCF or OCP support all HTTP methods. If false it will
   *                                         send a PUT request with no method override header.
   */
  // $FlowFixMe
  put(url = null, body = null, opts, overrideWithPostMethod = true) {
    const options = Object.assign(
      {
        method: overrideWithPostMethod ? 'POST' : 'PUT',
        url,
        body,
        callback: null,
      },
      opts,
    );

    options.headers = options.headers || {};

    if (overrideWithPostMethod) {
      options.headers['X-HTTP-Method-Override'] = 'PUT';
    }

    return this.fetch(options);
  }

  // $FlowFixMe
  delete(url = null, body = null, opts) {
    const options = Object.assign(
      {
        method: 'POST',
        url,
        body,
        callback: null,
      },
      opts,
    );

    options.headers = options.headers || {};
    options.headers['X-HTTP-Method-Override'] = 'DELETE';

    return this.fetch(options);
  }
}
