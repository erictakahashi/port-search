import axios from '../../../utils/api';
import { appActions } from '../app';
import {
  computeTargetPorts,
  getPorts,
  portsActions,
  removePort,
  selectDestination,
  selectOrigin
} from '../ports';

describe('ports action', () => {
  let get;

  let dispatch, getState;

  const valueA = { code: 'A', value: 'Value A' };
  const valueB = { code: 'B', value: 'Value B' };
  const ports = [valueA, valueB];
  const portsState = { ports };

  beforeEach(() => {
    get = jest.spyOn(axios, 'get');

    dispatch = jest.fn();
    getState = jest.fn();
    getState.mockReturnValue({ ports: portsState });
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
        getState.mockReturnValue({ ports: portsState });

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

        getState.mockReturnValue({ ports: { ports: [] } });
        get.mockReturnValue(promiseTimeout);

        getPorts()(dispatch, getState);

        const expectedPath = '/ports';
        expect(get).toHaveBeenCalledWith(expectedPath);

        expect(dispatch).toHaveBeenCalledWith({ type: appActions.START_LOADING });

        await get();

        expect(dispatch).toHaveBeenCalledWith({ type: appActions.STOP_LOADING });
      });

      it('should call dispatch with `SET_DESTINATION_PORTS`, `SET_ORIGIN_PORTS`, and `SET_PORTS` action and the `get` response data as the payload', () => {
        const promiseResolve = new Promise((resolve) => (
          setTimeout(() => resolve({ data: ports }), 100)
        ));

        getState.mockReturnValue({ ports: { ports: [] } });
        get.mockReturnValue(promiseResolve);

        getPorts()(dispatch, getState);

        return get().then(resolve => {
          expect(dispatch).toHaveBeenCalledWith({
            type: portsActions.SET_DESTINATION_PORTS,
            payload: resolve.data
          });
          expect(dispatch).toHaveBeenCalledWith({
            type: portsActions.SET_ORIGIN_PORTS,
            payload: resolve.data
          });
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

        getState.mockReturnValue({ ports: { ports: [] } });
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

  describe('selectDestination', () => {
    it('should call `dispatch` with `SET_SELECTED_DESTINATION` and `destinationCode`', () => {
      const code = 'A';
      selectDestination(code)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: portsActions.SET_SELECTED_DESTINATION,
        payload: code
      });
    });
  });

  describe('selectOrigin', () => {
    it('should call `dispatch` with `SET_SELECTED_ORIGIN` and `destinationCode`', () => {
      const code = 'A';
      selectOrigin(code)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: portsActions.SET_SELECTED_ORIGIN,
        payload: code
      });
    });
  });

  describe('computeTargetPorts', () => {
    const arrayName = 'originPorts';
    const testAction = 'action';

    it('should not call `dispatch` when there are no ports', () => {
      getState.mockReturnValue({ ports: { ports: [] } });

      computeTargetPorts({
        dispatch,
        getState,
        portsArrayName: arrayName,
        action: testAction,
        portCode: 'A'
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should not call `dispatch` when the provided port is not part of `destinationPorts`', () => {
      getState.mockReturnValue({
        ports: {
          ports,
          originPorts: [valueA]
        }
      });

      computeTargetPorts({
        dispatch,
        getState,
        portsArrayName: arrayName,
        action: testAction,
        portCode: 'B'
      });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should call `dispatch` when the provided port is part of `destinationPorts`', () => {
      getState.mockReturnValue({
        ports: {
          ports,
          originPorts: [valueA]
        }
      });

      const code = 'A';
      computeTargetPorts({
        dispatch,
        getState,
        portsArrayName: arrayName,
        action: testAction,
        portCode: code
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: testAction,
        payload: removePort(ports, code)
      });
    });
  });

  describe('removePort', () => {
    it('should return the provided `ports` when the `portCode` is not part of the array of ports', () => {
      const computedPorts = removePort(ports, 'C');
      expect(computedPorts).toEqual(ports);
    });

    it('should return the array of `ports` without the item corresponding to the provided `portCode`', () => {
      const computedPorts = removePort(ports, 'A');
      expect(computedPorts).toEqual([valueB]);
    });
  });
});
