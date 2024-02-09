
import R from 'ramda';

let archivedAction = null;
/**
 * When ever its required to archived some action to dispatch later so we can reuse more and less depend on call back
 * First we can disatch ARCHIVED_ACTION type to store archived Action and when we need we can dispatch REPLAY_ARCHIVED_ACTION type
 * 
 * Main use case is if we are reusing some screen first we can store action and on reusable screen we can dispatch this store action so it work
 */
function replayMiddleware({ dispatch, getState }) {
  return next => action => {
    if (action.type === 'ARCHIVED_ACTION') {
      archivedAction = action.archivedAction;
    } else if (action.type === 'REPLAY_ARCHIVED_ACTION') {
      dispatch(archivedAction);
    }
    next(action);
  };
}

export default R.curry(replayMiddleware);
