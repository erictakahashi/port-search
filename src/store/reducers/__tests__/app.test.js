import { appActions } from '../../actions/app';
import { app } from '../app';

describe('app reducer', () => {
  it('should set the payload as the state `error` when `HAS_ERROR` action type is provided', () => {
    const errorData = 'Something went wrong';

    const state = app(null, {
      type: appActions.HAS_ERROR,
      payload: errorData
    });

    expect(state.error).toEqual(errorData);
  });

  it('should set the state `loading` to true when `START_LOADING` action type is provided', () => {
    const state = app(null, {
      type: appActions.START_LOADING,
      payload: null
    });

    expect(state.loading).toBeTruthy();
  });

  it('should set the state `loading` to false when `STOP_LOADING` action type is provided', () => {
    const initialState = { loading: true };

    const state = app(initialState, {
      type: appActions.STOP_LOADING,
      payload: null
    });

    expect(state.loading).toBeFalsy();
  });

  it('should return the current state by default when an invalid action is provided', () => {
    const initialState = { loading: false };

    const state = app(initialState, {
      type: 'TEST_TYPE',
      payload: 'test'
    });

    expect(state).toEqual(initialState);
  });
});
