import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';

import mixins from '../mixins';

describe('mixins', () => {
  describe('exported mixins', () => {
    it('should have a `container` mixin', () => {
      expect(mixins.container).toBeTruthy();
    });

    it('should have a `isMobile` mixin', () => {
      expect(mixins.isMobile).toBeTruthy();
    });
  });

  describe('container', () => {
    it('should have the proper style rules', () => {
      const TestComp = styled.div`
        ${mixins.container}
      `;
      const testComp = renderer.create(<TestComp />).toJSON();

      expect(testComp).toHaveStyleRule('margin', 'auto');
      expect(testComp).toHaveStyleRule('padding-right', '20px');
      expect(testComp).toHaveStyleRule('padding-left', '20px');
      expect(testComp).toHaveStyleRule('max-width', '1140px');
    });
  });
});
