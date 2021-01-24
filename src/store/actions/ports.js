import axios from '../../utils/api';

import { appActions } from './app';

export const portsActions = {
  SET_DESTINATION_PORTS: 'SET_DESTINATION_PORTS',
  SET_ORIGIN_PORTS: 'SET_ORIGIN_PORTS',
  SET_PORTS: 'SET_PORTS',
  SET_RATES: 'SET_RATES',
  SET_SELECTED_DESTINATION: 'SET_SELECTED_DESTINATION',
  SET_SELECTED_ORIGIN: 'SET_SELECTED_ORIGIN'
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
        dispatch({ type: portsActions.SET_DESTINATION_PORTS, payload: data });
        dispatch({ type: portsActions.SET_ORIGIN_PORTS, payload: data });
        dispatch({ type: portsActions.SET_PORTS, payload: data });
      }

    } catch (error) {
      dispatch({ type: appActions.HAS_ERROR, payload: error });
    }

    dispatch({ type: appActions.STOP_LOADING });
  }
};

/**
 * Get rates from the API:
 * It will make the request when origin and
 * destination ports are provided.
 * @param {string} originPort Selected origin port.
 * @param {string} destinationPort Selected destination port.
 */
export const getRates = (originPort, destinationPort) => async (dispatch) => {
  if (!!originPort && !!destinationPort) {
    dispatch({ type: appActions.START_LOADING });

    try {
      const response = await axios.get(`/rates?origin=${originPort}&destination=${destinationPort}`);
      const { data = [] } = response || {};

      if (!!data.length)
        dispatch({ type: portsActions.SET_RATES, payload: data });

    } catch (error) {
      dispatch({ type: appActions.HAS_ERROR, payload: error });
    }

    dispatch({ type: appActions.STOP_LOADING });
  }
};

/**
 * Select the selected destination, and compute the array of destination ports.
 * @param {string} destinationCode Code of the destination port.
 */
export const selectDestination = (destinationCode) => (dispatch, getState) => {
  dispatch({ type: portsActions.SET_SELECTED_DESTINATION, payload: destinationCode });

  computeTargetPorts({
    dispatch,
    getState,
    portsArrayName: 'originPorts',
    action: portsActions.SET_ORIGIN_PORTS,
    portCode: destinationCode
  });
};

/**
 * Select the selected origin, and compute the array of origin ports.
 * @param {string} originCode Code of the origin port.
 */
export const selectOrigin = (originCode) => (dispatch, getState) => {
  dispatch({ type: portsActions.SET_SELECTED_ORIGIN, payload: originCode });

  computeTargetPorts({
    dispatch,
    getState,
    portsArrayName: 'destinationPorts',
    action: portsActions.SET_DESTINATION_PORTS,
    portCode: originCode
  });
};

/**
 * Compute the provided array of ports:
 * It will take the provided `portCode`, remove from `ports` array,
 * and set this new array as the `portsArrayName`, and then
 * dispatches the this new array.
 * @param {function} dispatch Dispatch method.
 * @param {function} getState The redux state.
 * @param {string} portsArrayName The name of the ports array that will should be computed.
 * @param {string} action The action to be dispatched.
 * @param {string} portCode The port code to be removed from the array of ports.
 */
export const computeTargetPorts = ({ dispatch, getState, portsArrayName, action, portCode }) => {
  const ports = getState().ports;
  const allPorts = ports.ports || [];
  const targetPorts = ports[portsArrayName] || [];

  if (!allPorts.length) return;

  if (!!targetPorts.find(port => port.code === portCode))
    dispatch({
      type: action,
      payload: removePort(allPorts, portCode)
    });
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
