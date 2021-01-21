import renderer from 'react-test-renderer';
import 'jest-styled-components';

import variables from '../../../styles/variables';
import Styled from '../Navbar.styled';

describe('Navbar Styled Components', () => {
  describe('exported components', () => {
    it('should have a `Container` component', () => {
      expect(Styled.Container).toBeTruthy();
    });

    it('should have a `Title` component', () => {
      expect(Styled.Title).toBeTruthy();
    });

    it('should have a `Wrapper` component', () => {
      expect(Styled.Wrapper).toBeTruthy();
    });
  });

  describe('wrapper', () => {
    it('should have the proper style rules', () => {
      const wrapper = renderer.create(<Styled.Wrapper />).toJSON();

      expect(wrapper).toHaveStyleRule('padding-top', '20px');
      expect(wrapper).toHaveStyleRule('padding-bottom', '20px');
      expect(wrapper).toHaveStyleRule('background-color', variables.primaryColor);
    });
  });

  describe('title', () => {
    it('should have the proper style rules', () => {
      const title = renderer.create(<Styled.Title />).toJSON();

      expect(title).toHaveStyleRule('margin', '0');
      expect(title).toHaveStyleRule('color', variables.lightColor);
    });
  });
});
