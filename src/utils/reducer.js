/**
Builds the state in such a way to support ancestry
e.g. buildAncestorState({}, {message: 'hi mom'}, 'grandma', 'mom', 'me') would create
{
  'grandma': {
    'mom': {
      'me': {
        'message': 'hi mom'
      }
    }
  }
}
it does this preserving existing state at each node
*/

const buildAncestorState = (state = {}, value, ancestors) => {
  if (ancestors.length === 0) {
    return {
      ...state,
      ...value,
    };
  }
  return {
    ...state,
    [ancestors[0]]: buildAncestorState(state[ancestors[0]], value, ancestors.slice(1)),
  };
};

export const requestHelper = (state, ...ancestorParams) => {
  const ancestors = ancestorParams;
  const newData = {
    isLoading: true,
  };
  return buildAncestorState(state, newData, ancestors);
};

export const ancestorHelper = (state, data, ...ancestorParams) => {
  const ancestors = ancestorParams;
  return buildAncestorState(state, data, ancestors);
};

export const successHelper = (state, payload = {}, ...ancestorParams) => {
  const ancestors = ancestorParams;
  const newData = {
    error: {}, // clearing error object before expanding payload incase payload has something named error
    ...payload,
    isLoading: false,
    isResponseSuccess: true,
    isFail: false,
    isResponseComplete: true,
    didInvalidate: false,
    lastUpdated: new Date().getTime(),
  };
  return buildAncestorState(state, newData, ancestors);
};

export const failHelper = (state, payload = {}, ...ancestorParams) => {
  const ancestors = ancestorParams;
  const newData = {
    error: payload,
    isFail: true,
    isOOBIntercept: payload.isOOBIntercept,
    isResponseSuccess: false,
    isResponseComplete: true,
    isLoading: false,
    didInvalidate: false,
    lastUpdated: new Date().getTime(),
  };
  return buildAncestorState(state, newData, ancestors);
};

