
import _ from 'lodash';
import { makeNetworkCall } from './networkMiddlewareUtils';

export default function networkPromiseMiddleware({
  dispatch,
  getState,
}) {
  const inFlightCalls = new Map();
  const takeLeadingObservers = new Map();
  return (next) => async (action) => {
    if (action.networkPromise && _.isArray(action.types)) {
      const { showLoader, } = action;
      const state = getState();
      //Any Common Header IF we want to pass
      const headers = {};
      await makeNetworkCall(
        { dispatch, getState },
        action,
        headers,
        inFlightCalls,
        takeLeadingObservers,
      );
    } else {
      next(action);
    }
  };
}
