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
    selectedDestination,
    selectedOrigin
  } = useHome();

  return (
    <Styled.Wrapper>
      <Styled.Navbar />

      <Styled.Container>
        <Styled.Fields>
          <Styled.SelectOrigin
            itemAttrLabel="name"
            itemAttrValue="code"
            items={originPorts}
            label="Origin"
            onChange={handleOriginChange}
            selectedValue={selectedOrigin}
          />
          <Styled.SelectGap />
          <Styled.SelectDestination
            itemAttrLabel="name"
            itemAttrValue="code"
            items={destinationPorts}
            label="Destination"
            onChange={handleDestinationChange}
            selectedValue={selectedDestination}
          />
        </Styled.Fields>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Home;
