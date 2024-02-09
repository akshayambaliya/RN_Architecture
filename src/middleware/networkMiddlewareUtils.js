import _ from 'lodash';
import CONST from '../constants/index';
import {
  handleSuccessTakeLeading,
  handleFailTakeLeading,
  unregisterTakeLeading,
  incrementInFlight,
  decrementInFlight,
  registerTakeLeading,
} from './networkMiddlewareTakeLeadingUtils';

import { getIsConnectedToInternet } from './networkMiddlewareSelector';


export function makeNetworkCall(
  store,
  action,
  headers,
  inFlightCalls,
  takeLeadingObservers
) {
  const dispatch = store.dispatch;
  const getState = store.getState;
  const {
    networkPromise,
    types,
    handleSuccess,
    showLoader,
    shouldPersistKeyboardDuringLoader,
    loaderType,
    ...rest
  } = action;
  const [REQUEST, SUCCESS, FAILURE] = types;

  dispatch({ ...rest, type: REQUEST });

  if (!_.isFunction(networkPromise)) {
    console.error("Your action's `promise` must be a function", action);
    return;
  }

  if (showLoader) {
    dispatch({
      type: CONST.SHOW_LOADER,
      payload: {
        shouldPersistKeyboardDuringLoader,
        loaderType,
      },
    });
  }

  if (registerTakeLeading(action, inFlightCalls, takeLeadingObservers)) {
    return;
  }

  const myPromise = networkPromise({ dispatch, getState, headers });
  if (!myPromise || !_.isFunction(myPromise.then)) {
    console.error("Your action's `promise` is a function but it does not return a promise", action);
    return;
  }

  incrementInFlight(inFlightCalls, REQUEST);
  return myPromise
    .then(
      success => {
        const loaderCount = getHideLoaderCount(action, takeLeadingObservers);
        decrementInFlight(inFlightCalls, REQUEST);
        try {
          dispatch({
            ...rest,
            payload: success,
            type: SUCCESS,
          });
        } catch (e) {
          console.warn(e);
          dispatch({ type: SUCCESS });
        }

        if (handleSuccess) {
          try {
            handleSuccess(success);
          } catch (e) {
            console.error(
              `Error in success callback for network promise for action: ${e}`,
              action.types,
            );
          }
        }
        handleSuccessTakeLeading(action, success, takeLeadingObservers, dispatch);
        if (loaderCount > 0) {
          dispatch({ type: CONST.HIDE_LOADER, count: loaderCount });
        }
        unregisterTakeLeading(REQUEST, takeLeadingObservers);
      },
      failure => {
        const loaderCount = getHideLoaderCount(action, takeLeadingObservers);
        decrementInFlight(inFlightCalls, REQUEST);
        const state = getState();

        if (!getIsConnectedToInternet(state)) {
          handleNetworkCallReachabilityFailure(store, action, takeLeadingObservers);
        } else {
          //Manage Api Common APi Error Here
        }

        if (loaderCount > 0) {
          dispatch({ type: CONST.HIDE_LOADER, count: loaderCount });
        }
        unregisterTakeLeading(REQUEST, takeLeadingObservers);
      },
    )
    .catch(error => {
      const loaderCount = getHideLoaderCount(action, takeLeadingObservers);
      decrementInFlight(inFlightCalls, REQUEST);
      dispatch({ ...rest, payload: error, type: FAILURE });
      if (loaderCount > 0) {
        dispatch({ type: CONST.HIDE_LOADER, count: loaderCount });
      }
      unregisterTakeLeading(REQUEST, takeLeadingObservers);
    });
}

function getHideLoaderCount(action, takeLeadingObservers) {
  const observers = takeLeadingObservers.get(action.types[0]) ?? [];
  return observers.reduce(
    (acc, observer) => (acc + observer.showLoader ? 1 : 0),
    action.showLoader ? 1 : 0,
  );
}

export function handleNetworkCallReachabilityFailure(
  store,
  action,
  takeLeadingObservers,
) {
  const dispatch = store.dispatch;
  const getState = store.getState;
  const { types, handleFail, ...rest } = action;
  const [REQUEST, , FAILURE] = types;

  dispatch({ ...rest, type: FAILURE });

  showInternetConnectivityModal(dispatch, getState);

  if (handleFail) {
    handleFail({ isInternetFail: true });
  }
  if (!!takeLeadingObservers) {
    handleFailTakeLeading(REQUEST, { isInternetFail: true }, takeLeadingObservers, dispatch);
  }
}

export function showInternetConnectivityModal(dispatch, getState) {
}
