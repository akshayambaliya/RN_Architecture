/**
 * This Middeware use if we want to perform any other action with redux dispatch action
 * 
 */

export default function fireAndForgetMiddleware({
  dispatch,
  getState,
}) {
  return next => action => {
    if (action.payloadFunc && typeof action.payloadFunc === 'function') {
      action.payloadFunc();
    }
    next(action);
  };
}