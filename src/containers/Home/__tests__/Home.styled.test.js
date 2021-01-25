import renderer from 'react-test-renderer';
import 'jest-styled-components';

import mixins from '../../../styles/mixins';
import Styled from '../Home.styled';

describe('Home Styled Components', () => {
  describe('exported components', () => {
    it('should have a `Chart` component', () => {
      expect(Styled.Chart).toBeTruthy();
    });

    it('should have a `Container` component', () => {
      expect(Styled.Container).toBeTruthy();
    });

    it('should have a `Fields` component', () => {
      expect(Styled.Fields).toBeTruthy();
    });

    it('should have a `Navbar` component', () => {
      expect(Styled.Navbar).toBeTruthy();
    });

    it('should have a `NoChart` component', () => {
      expect(Styled.NoChart).toBeTruthy();
    });

    it('should have a `SelectDestination` component', () => {
      expect(Styled.SelectDestination).toBeTruthy();
    });

    it('should have a `SelectGap` component', () => {
      expect(Styled.SelectGap).toBeTruthy();
    });

    it('should have a `SelectOrigin` component', () => {
      expect(Styled.SelectOrigin).toBeTruthy();
    });

    it('should have a `Wrapper` component', () => {
      expect(Styled.Wrapper).toBeTruthy();
    });
  });

  describe('fields', () => {
    it('should have the proper style rules', () => {
      const fields = renderer.create(<Styled.Fields />).toJSON();

      expect(fields).toHaveStyleRule('display', 'flex');
      expect(fields).toHaveStyleRule('padding-top', '30px');
      expect(fields).toHaveStyleRule('padding-bottom', '30px');

      const rawMedia = mixins.isMobile;
      const mediaQuery = rawMedia.replace('@media ', '');

      expect(fields).toHaveStyleRule('flex-direction', 'column', { media: mediaQuery });
    });
  });

  describe('select gap', () => {
    it('should have the proper style rules', () => {
      const selectGap = renderer.create(<Styled.SelectGap />).toJSON();

      expect(selectGap).toHaveStyleRule('width', '30px');

      const rawMedia = mixins.isMobile;
      const mediaQuery = rawMedia.replace('@media ', '');

      expect(selectGap).toHaveStyleRule('height', '30px', { media: mediaQuery });
    });
  });

  describe('no chart', () => {
    it('should have the proper style rules', () => {
      const noChart = renderer.create(<Styled.NoChart />).toJSON();

      expect(noChart).toHaveStyleRule('margin', '30px 0');
    });
  });
});
