import Styled from './Home.styled';
import { useHome } from './useHome';

/**
 * Home container.
 */
const Home = () => {
  const { ports } = useHome();

  return (
    <Styled.Wrapper>
      <Styled.Navbar />

      <Styled.Container>
        <Styled.Fields>
          <Styled.SelectOrigin
            itemAttrLabel="name"
            itemAttrValue="code"
            items={ports}
            label="Origin"
          />
          <Styled.SelectGap />
          <Styled.SelectDestination
            itemAttrLabel="name"
            itemAttrValue="code"
            items={ports}
            label="Destination"
          />
        </Styled.Fields>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Home;
