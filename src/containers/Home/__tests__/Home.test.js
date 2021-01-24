import { shallow } from 'enzyme';

import Home from '../Home';
import Styled from '../Home.styled';
import * as UseHome from '../useHome';

/**
 * Factory function that will create a `Home` shallow wrapper.
 */
const setup = () => shallow(<Home />);

describe('Home', () => {
  let useHome;

  const ports = ['A', 'B'];

  beforeEach(() => {
    useHome = jest.spyOn(UseHome, 'useHome');
    useHome.mockReturnValue({ ports });
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

  it('should render a `container`', () => {
    const component = setup();
    const container = component.find(Styled.Container);
    expect(container.length).toBe(1);
  });

  it('should render a `fields` container', () => {
    const component = setup();
    const fields = component.find(Styled.Fields);
    expect(fields.length).toBe(1);
  });

  it('should render an `select origin` component', () => {
    const component = setup();
    const selectOrigin = component.find(Styled.SelectOrigin);
    expect(selectOrigin.length).toBe(1);
  });

  it('should render an `select gap` component', () => {
    const component = setup();
    const selectGap = component.find(Styled.SelectGap);
    expect(selectGap.length).toBe(1);
  });

  it('should render an `select destination` component', () => {
    const component = setup();
    const selectDestination = component.find(Styled.SelectDestination);
    expect(selectDestination.length).toBe(1);
  });
});
