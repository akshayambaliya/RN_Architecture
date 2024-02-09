export function handleSuccessTakeLeading(
  action,
  success,
  takeLeadingObservers,
  dispatch,
) {
  const [REQUEST] = action.types;
  const observers = takeLeadingObservers.get(REQUEST) ?? [];
  observers.forEach(observer => {
    observer.handleSuccess?.(success);
  });
}

export function handleFailTakeLeading(
  REQUEST,
  error,
  takeLeadingObservers,
  dispatch,
) {
  const observers = takeLeadingObservers.get(REQUEST) ?? [];
  observers.forEach(observer => {
    observer.handleFail?.(error);
  });
}

export function unregisterTakeLeading(REQUEST, takeLeadingObservers) {
  takeLeadingObservers.delete(REQUEST);
}

export function incrementInFlight(inFlightCalls, REQUEST) {
  inFlightCalls.set(REQUEST, (inFlightCalls.get(REQUEST) ?? 0) + 1);
}

export function decrementInFlight(inFlightCalls, REQUEST) {
  const decrementedCount = (inFlightCalls.get(REQUEST) ?? 0) - 1;
  decrementedCount <= 0
    ? inFlightCalls.delete(REQUEST)
    : inFlightCalls.set(REQUEST, decrementedCount);
}

/**
 * Return true if this is a takeLeading action and there is
 * an existing REQUEST type awaiting fulfillment.
 *
 * Since this action will not fire an actual http request it registers
 * the handleSuccess and handleFail callbacks so that when the original
 * network promise is fulfilled these callbacks will also be invoked.
 */
export function registerTakeLeading(
  action,
  inFlightCalls,
  takeLeadingObservers,
) {
  const { handleSuccess, showLoader, takeLeading, handleFail } = action;
  const [REQUEST] = action.types;

  if (takeLeading && inFlightCalls.has(REQUEST)) {
    takeLeadingObservers.set(REQUEST, [
      ...(takeLeadingObservers.get(REQUEST) ?? []),
      {
        handleSuccess,
        handleFail,
        showLoader,
      },
    ]);
    return true;
  }
  return false;
}
