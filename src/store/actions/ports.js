import axios from '../../utils/api';

import { appActions } from './app';

export const portsActions = {
  SET_PORTS: 'SET_PORTS',
  SET_RATES: 'SET_RATES'
};

/**
 * Get ports from the API:
 * It will make the request when there are no `ports`
 * in the state.
 */
export const getPorts = () => async (dispatch, getState) => {
  const ports = getState().ports;

  if (!ports || !ports.length) {
    dispatch({ type: appActions.START_LOADING });

    try {
      const response = await axios.get('/ports');
      const { data = [] } = response || {};

      if (!!data.length)
        dispatch({
          type: portsActions.SET_PORTS,
          payload: data
        });

    } catch (error) {
      dispatch({
        type: appActions.HAS_ERROR,
        payload: error
      });
    }

    dispatch({ type: appActions.STOP_LOADING });
  }
};
