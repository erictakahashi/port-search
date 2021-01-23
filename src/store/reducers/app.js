import { appActions } from '../actions/app';

const initialState = {
  error: false,
  loading: false
};

export const app = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case appActions.HAS_ERROR:
      return {
        ...state,
        error: payload
      };

    case appActions.START_LOADING:
      return {
        ...state,
        loading: true
      };

    case appActions.STOP_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
