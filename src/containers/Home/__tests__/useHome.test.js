import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import * as ActionsPorts from '../../../store/actions/ports';
import { useHome } from '../useHome';

/**
* Factory function that will render the `useHome` hook.
*/
const buildHook = () => renderHook(useHome);

describe('useHome Hook', () => {
  let dispatch, dispatchFn;

  let computeDestination, computeOrigin;

  let getPorts, getPortsFn;

  let useSelector;

  const mockedPorts = ['A', 'B'];
  const destinationPorts = mockedPorts;
  const originPorts = mockedPorts;
  const ports = mockedPorts;

  const mockedValue = 'Value';
  const mockedEvent = { target: { value: mockedValue } };

  beforeEach(() => {
    dispatchFn = jest.fn();
    dispatch = jest.spyOn(ReactRedux, 'useDispatch');
    dispatch.mockReturnValue(dispatchFn);

    computeDestination = jest.spyOn(ActionsPorts, 'computeDestination');
    computeOrigin = jest.spyOn(ActionsPorts, 'computeOrigin');

    getPortsFn = jest.fn();
    getPorts = jest.spyOn(ActionsPorts, 'getPorts');
    getPorts.mockReturnValue(getPortsFn);

    useSelector = jest.spyOn(ReactRedux, 'useSelector');
    useSelector.mockReturnValue({
      destinationPorts, originPorts, ports
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call `dispatch` with `getPorts` method when the hook first mount', () => {
    buildHook();
    expect(dispatchFn).toHaveBeenCalledWith(getPortsFn);
  });

  it('should return `destinationPorts` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.destinationPorts).toEqual(destinationPorts);
  });

  it('should return `originPorts` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.originPorts).toEqual(originPorts);
  });

  it('should return `ports` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.ports).toEqual(ports);
  });

  describe('handleDestinationChange', () => {
    it('should call `dispatch` with `computeOrigin` when `handleDestinationChange` is triggered', () => {
      const { result: { current } } = buildHook();
      current.handleDestinationChange(mockedEvent);
      expect(computeOrigin).toHaveBeenCalledWith(mockedValue);
    });
  });

  describe('handleOriginChange', () => {
    it('should call `dispatch` with `computeDestination` when `handleOriginChange` is triggered', () => {
      const { result: { current } } = buildHook();
      current.handleOriginChange(mockedEvent);
      expect(computeDestination).toHaveBeenCalledWith(mockedValue);
    });
  });
});
