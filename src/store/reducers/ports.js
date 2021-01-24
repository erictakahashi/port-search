import { portsActions } from '../actions/ports';

const initialState = {
  destinationPorts: [],
  originPorts: [],
  ports: [],
  rates: []
};

export const ports = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case portsActions.SET_DESTINATION_PORTS:
      return {
        ...state,
        destinationPorts: [...payload]
      };

    case portsActions.SET_ORIGIN_PORTS:
      return {
        ...state,
        originPorts: [...payload]
      };

    case portsActions.SET_PORTS:
      return {
        ...state,
        ports: [...payload]
      };

    case portsActions.SET_RATES:
      return {
        ...state,
        rates: [...payload]
      };

    default:
      return state;
  }
};
