import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';

import * as ActionsPorts from '../../../store/actions/ports';
import Home from '../Home';
import Styled from '../Home.styled';

/**
 * Factory function that will create a `Home` shallow wrapper.
 */
const setup = () => shallow(<Home />);

describe('Home', () => {
  let dispatch, dispatchFn;

  let getPorts, getPortsFn;

  beforeEach(() => {
    dispatchFn = jest.fn();
    dispatch = jest.spyOn(ReactRedux, 'useDispatch');
    dispatch.mockReturnValue(dispatchFn);

    getPortsFn = jest.fn();
    getPorts = jest.spyOn(ActionsPorts, 'getPorts');
    getPorts.mockReturnValue(getPortsFn);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a `wrapper` container', () => {
    const component = setup();
    const wrapper = component.find(Styled.Wrapper);
    expect(wrapper.length).toBe(1);
  });

  it('should render a `navbar` component', () => {
    const component = setup();
    const navbar = component.find(Styled.Navbar);
    expect(navbar.length).toBe(1);
  });

  it('should call `dispatch` with `getPorts` method when component first mount', () => {
    setup();

    expect(dispatchFn).toHaveBeenCalledWith(getPortsFn);
  });
});
