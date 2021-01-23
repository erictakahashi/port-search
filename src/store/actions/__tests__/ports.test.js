import axios from '../../../utils/api';
import { appActions } from '../app';
import { getPorts, portsActions } from '../ports';

describe('ports action', () => {
  let get;

  let dispatch, getState;

  const ports = ['A', 'B'];

  beforeAll(() => {
    get = jest.spyOn(axios, 'get');

    dispatch = jest.fn();
    getState = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('exported actions', () => {
    it('should have a `SET_PORTS` actions', () => {
      expect(portsActions.SET_PORTS).toBeTruthy();
    });

    it('should have a `SET_RATES` actions', () => {
      expect(portsActions.SET_RATES).toBeTruthy();
    });
  });

  describe('getPorts', () => {
    describe('pre existing `ports` data in the state', () => {
      it('should not call axios `get` nor `dispatch`', () => {
        getState.mockReturnValue({ ports });

        getPorts()(dispatch, getState);

        expect(get).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('no pre existing `ports` data  in the state', () => {
      it('should call axios `get` with the proper path, call dispatch with `START_LOADING` action, and call dispatch with `STOP_LOADING` once the `get` promise is done', async () => {
        const promiseTimeout = new Promise((resolve) => (
          setTimeout(() => resolve(), 100)
        ));

        getState.mockReturnValue({ ports: [] });
        get.mockReturnValue(promiseTimeout);

        getPorts()(dispatch, getState);

        const expectedPath = '/ports';
        expect(get).toHaveBeenCalledWith(expectedPath);

        expect(dispatch).toHaveBeenCalledWith({ type: appActions.START_LOADING });

        await get();

        expect(dispatch).toHaveBeenCalledWith({ type: appActions.STOP_LOADING });
      });

      it('should call dispatch with `SET_PORTS` action and the `get` response data as the payload', () => {
        const promiseResolve = new Promise((resolve) => (
          setTimeout(() => resolve({ data: ports }), 100)
        ));

        getState.mockReturnValue({ ports: [] });
        get.mockReturnValue(promiseResolve);

        getPorts()(dispatch, getState);

        return get().then(resolve => {
          expect(dispatch).toHaveBeenCalledWith({
            type: portsActions.SET_PORTS,
            payload: resolve.data
          });
        });
      });

      it('should call dispatch with `HAS_ERROR` action and the `get` error as the payload', () => {
        const error = 'Error';
        const promiseReject = new Promise((_, reject) => (
          setTimeout(() => reject(error), 100)
        ));

        getState.mockReturnValue({ ports: [] });
        get.mockReturnValue(promiseReject);

        getPorts()(dispatch, getState);

        return get().catch(er => {
          expect(dispatch).toHaveBeenCalledWith({
            type: appActions.HAS_ERROR,
            payload: er
          });
        });
      });
    });
  });
});
