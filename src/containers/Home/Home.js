import Styled from './Home.styled';
import { useHome } from './useHome';

/**
 * Home container.
 */
const Home = () => {
  const {
    handleDestinationChange,
    handleOriginChange,
    destinationPorts = [],
    originPorts = [],
    ports = []
  } = useHome();

  return (
    <Styled.Wrapper>
      <Styled.Navbar />

      <Styled.Container>
        <Styled.Fields>
          <Styled.SelectOrigin
            itemAttrLabel="name"
            itemAttrValue="code"
            items={!originPorts.length ? ports : originPorts}
            label="Origin"
            onChange={handleOriginChange}
          />
          <Styled.SelectGap />
          <Styled.SelectDestination
            itemAttrLabel="name"
            itemAttrValue="code"
            items={!destinationPorts.length ? ports : destinationPorts}
            label="Destination"
            onChange={handleDestinationChange}
          />
        </Styled.Fields>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Home;
