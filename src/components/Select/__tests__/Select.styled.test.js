import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Styled from '../Select.styled';

describe('Select Styled Components', () => {
  describe('exported components', () => {
    it('should have a `FormControl` component', () => {
      expect(Styled.FormControl).toBeTruthy();
    });

    it('should have a `Label` component', () => {
      expect(Styled.Label).toBeTruthy();
    });

    it('should have a `Select` component', () => {
      expect(Styled.Select).toBeTruthy();
    });

    it('should have a `SelectItem` component', () => {
      expect(Styled.SelectItem).toBeTruthy();
    });
  });

  describe('FormControl', () => {
    it('should have the proper style rules', () => {
      const formControl = renderer.create(<Styled.FormControl />).toJSON();

      expect(formControl).toHaveStyleRule('min-width', '200px', { modifier: '&&' });
    });
  });
});
