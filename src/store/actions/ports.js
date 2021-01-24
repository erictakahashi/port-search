import axios from '../../utils/api';

import { appActions } from './app';

export const portsActions = {
  SET_DESTINATION_PORTS: 'SET_DESTINATION_PORTS',
  SET_ORIGIN_PORTS: 'SET_ORIGIN_PORTS',
  SET_PORTS: 'SET_PORTS',
  SET_RATES: 'SET_RATES'
};

/**
 * Compute the array of ports destination:
 * It will remove the origin port from array of destination ports.
 * @param {string} originCode Code of the origin port.
 */
export const computeDestination = (originCode) => (dispatch, getState) => {
  const ports = getState().ports;
  const allPorts = ports.ports || [];
  const destinationPorts = ports.destinationPorts || [];

  if (!allPorts.length) return;

  if (!!destinationPorts.find(port => port.code === originCode))
    dispatch({
      type: portsActions.SET_DESTINATION_PORTS,
      payload: removePort(allPorts, originCode)
    });
};

/**
 * Compute the array of ports origin:
 * It will remove the destionation port from array of origin ports.
 * @param {string} destinationCode Code of the destination port.
 */
export const computeOrigin = (destinationCode) => (dispatch, getState) => {
  const ports = getState().ports;
  const allPorts = ports.ports || [];
  const originPorts = ports.originPorts || [];

  if (!allPorts.length) return;

  if (!!originPorts.find(port => port.code === destinationCode))
    dispatch({
      type: portsActions.SET_ORIGIN_PORTS,
      payload: removePort(allPorts, destinationCode)
    });
};

/**
 * Get ports from the API:
 * It will make the request when there are no `ports`
 * in the state.
 */
export const getPorts = () => async (dispatch, getState) => {
  const ports = getState().ports.ports;

  if (!ports || !ports.length) {
    dispatch({ type: appActions.START_LOADING });

    try {
      const response = await axios.get('/ports');
      const { data = [] } = response || {};

      if (!!data.length) {
        dispatch({
          type: portsActions.SET_DESTINATION_PORTS,
          payload: data
        });
        dispatch({
          type: portsActions.SET_ORIGIN_PORTS,
          payload: data
        });
        dispatch({
          type: portsActions.SET_PORTS,
          payload: data
        });
      }

    } catch (error) {
      dispatch({
        type: appActions.HAS_ERROR,
        payload: error
      });
    }

    dispatch({ type: appActions.STOP_LOADING });
  }
};

/**
 * It will remove the provided port from the provided
 * array of ports
 * @param {array} ports Array of ports.
 * @param {string} portCode The code of the port to be removed.
 */
export const removePort = (ports, portCode) => {
  const currentPorts = [...ports];
  const portIndex = currentPorts.findIndex(port => port.code === portCode);

  if (portIndex < 0) return currentPorts;

  currentPorts.splice(portIndex, 1);
  return currentPorts;
};
