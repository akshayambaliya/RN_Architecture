import { createSelector } from 'reselect';
import _ from 'lodash';

export const getConnectionInfo = (state) =>
  _.get(state, 'core.global.connectionInfo', 'unknown');

export const getIsConnectedToInternet = createSelector(
  [getConnectionInfo],
  connectionInfo => connectionInfo !== 'none',
);
