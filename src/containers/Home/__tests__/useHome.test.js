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

  let useSelector;

  const ports = ['A', 'B'];

  beforeEach(() => {
    dispatchFn = jest.fn();
    dispatch = jest.spyOn(ReactRedux, 'useDispatch');
    dispatch.mockReturnValue(dispatchFn);

    getPortsFn = jest.fn();
    getPorts = jest.spyOn(ActionsPorts, 'getPorts');
    getPorts.mockReturnValue(getPortsFn);

    useSelector = jest.spyOn(ReactRedux, 'useSelector');
    useSelector.mockReturnValue(ports);
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

  it('should return `ports` from store', () => {
    const { result: { current } } = buildHook();
    expect(current.ports).toEqual(ports);
  });
});
