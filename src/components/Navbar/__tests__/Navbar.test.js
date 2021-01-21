import { shallow } from 'enzyme';

import Navbar from '../Navbar';
import Styled from '../Navbar.styled';

/**
 * Factory function that will create a `Navbar` shallow wrapper.
 */
const setup = () => shallow(<Navbar />);

describe('Navbar', () => {
  it('should render a `wrapper` container', () => {
    const component = setup();
    const wrapper = component.find(Styled.Wrapper);
    expect(wrapper.length).toBe(1);
  });

  it('should render a `container` component', () => {
    const component = setup();
    const wrapper = component.find(Styled.Container);
    expect(wrapper.length).toBe(1);
  });

  it('should render a `title` component', () => {
    const component = setup();
    const wrapper = component.find(Styled.Title);
    expect(wrapper.length).toBe(1);
  });
});
