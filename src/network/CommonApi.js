import { getHref } from '../utils/urls';

import Api from './Api';

/**
 * Used to make API calls for Bank related APIs. Applies bank settings used by middleware and defaults
 * our base domain to bank.discover.com.
 *
 * @example
 * export default class NewFeatureApi extends BankApi {
 *   // Make POST request to bank.discover.com/new/feature/enrollment
 *   acceptTerms() {
 *     return this.fetch({ method: 'POST', url: 'new/feature/enrollment' });
 *   }
 * }
 */
export default class CommonApi extends Api {
  constructor(options) {
    super(options);

    //it will change baseUrl from api class and we can also get state using this.State()
    this.baseUri
  }
}
