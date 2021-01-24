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

  let getPorts, getPortsFn;

  let selectDestination, selectOrigin;

  let useSelector;

  const valueA = 'A';
  const valueB = 'B';
  const mockedPorts = [valueA, valueB];
  const destinationPorts = mockedPorts;
  const originPorts = mockedPorts;

  const mockedValue = 'Value';
  const mockedEvent = { target: { value: mockedValue } };

  beforeEach(() => {
    dispatchFn = jest.fn();
    dispatch = jest.spyOn(ReactRedux, 'useDispatch');
    dispatch.mockReturnValue(dispatchFn);

    getPortsFn = jest.fn();
    getPorts = jest.spyOn(ActionsPorts, 'getPorts');
    getPorts.mockReturnValue(getPortsFn);

    selectDestination = jest.spyOn(ActionsPorts, 'selectDestination');
    selectOrigin = jest.spyOn(ActionsPorts, 'selectOrigin');

    useSelector = jest.spyOn(ReactRedux, 'useSelector');
    useSelector.mockReturnValue({
      destinationPorts,
      originPorts,
      selectedDestination: valueA,
      selectedOrigin: valueB
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

  it('should return `selectedDestination` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.selectedDestination).toEqual(valueA);
  });

  it('should return `selectedOrigin` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.selectedOrigin).toEqual(valueB);
  });

  describe('handleDestinationChange', () => {
    it('should call `dispatch` with `selectDestination` when `handleDestinationChange` is triggered', () => {
      const { result: { current } } = buildHook();
      current.handleDestinationChange(mockedEvent);
      expect(selectDestination).toHaveBeenCalledWith(mockedValue);
    });
  });

  describe('handleOriginChange', () => {
    it('should call `dispatch` with `selectOrigin` when `handleOriginChange` is triggered', () => {
      const { result: { current } } = buildHook();
      current.handleOriginChange(mockedEvent);
      expect(selectOrigin).toHaveBeenCalledWith(mockedValue);
    });
  });
});
