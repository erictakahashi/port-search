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
    rates,
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

        <RenderChart
          rates={rates}
          selectedDestination={selectedDestination}
          selectedOrigin={selectedOrigin}
        />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Home;

/**
 * It will display the chart or not depending on the available data.
 * @param {array} rates The rates to be displayed the chart.
 */
export const RenderChart = (props) => {
  const {
    rates = [],
    selectedDestination,
    selectedOrigin
  } = props;

  if (!rates.length || !selectedDestination || !selectedOrigin)
    return (
      <Styled.NoChart>
        Not enough data to display the chart.
      </Styled.NoChart>
    );

  return (
    <Styled.Chart
      chartType="Line"
      data={rates}
    />
  );
};
