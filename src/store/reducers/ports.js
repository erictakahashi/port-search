import { portsActions } from '../actions/ports';

const initialState = {
  ports: [],
  rates: []
};

export const ports = (state = initialState, { type, payload = {} }) => {
  switch (type) {
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
