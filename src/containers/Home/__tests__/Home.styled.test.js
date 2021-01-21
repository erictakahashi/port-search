import Styled from '../Home.styled';

describe('Home Styled Components', () => {
  describe('exported components', () => {
    it('should have a `Wrapper` component', () => {
      expect(Styled.Wrapper).toBeTruthy();
    });

    it('should have a `Navbar` component', () => {
      expect(Styled.Navbar).toBeTruthy();
    });
  });
});
