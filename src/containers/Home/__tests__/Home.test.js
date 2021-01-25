import { shallow } from 'enzyme';

import Home, { RenderChart } from '../Home';
import Styled from '../Home.styled';
import * as UseHome from '../useHome';

/**
 * Factory function that will create a `Home` shallow wrapper.
 */
const setup = () => shallow(<Home />);

describe('Home', () => {
  let useHome,
    handleDestinationChange,
    handleOriginChange;

  const valueA = 'A';
  const valueB = 'B';
  const mockedPorts = [valueA, valueB];
  const destinationPorts = mockedPorts;
  const originPorts = mockedPorts;

  const rates = mockedPorts;

  beforeEach(() => {
    useHome = jest.spyOn(UseHome, 'useHome');
    handleDestinationChange = jest.fn();
    handleOriginChange = jest.fn();
    useHome.mockReturnValue({
      handleDestinationChange,
      handleOriginChange,
      destinationPorts,
      originPorts,
      rates,
      selectedDestination: valueA,
      selectedOrigin: valueB
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a `wrapper` container', () => {
    const component = setup();
    const wrapper = component.find(Styled.Wrapper);
    expect(wrapper.length).toBe(1);
  });

  it('should render a `navbar` component', () => {
    const component = setup();
    const navbar = component.find(Styled.Navbar);
    expect(navbar.length).toBe(1);
  });

  it('should render a `container`', () => {
    const component = setup();
    const container = component.find(Styled.Container);
    expect(container.length).toBe(1);
  });

  it('should render a `fields` container', () => {
    const component = setup();
    const fields = component.find(Styled.Fields);
    expect(fields.length).toBe(1);
  });

  it('should render an `select origin` component', () => {
    const component = setup();
    const selectOrigin = component.find(Styled.SelectOrigin);
    expect(selectOrigin.length).toBe(1);
  });

  it('should render an `select gap` component', () => {
    const component = setup();
    const selectGap = component.find(Styled.SelectGap);
    expect(selectGap.length).toBe(1);
  });

  it('should render an `select destination` component', () => {
    const component = setup();
    const selectDestination = component.find(Styled.SelectDestination);
    expect(selectDestination.length).toBe(1);
  });

  it('should render a `RenderChart` component', () => {
    const component = setup();
    const renderChart = component.find(RenderChart);
    expect(renderChart.length).toBe(1);
  });

  describe('select origin', () => {
    it('should have the proper props', () => {
      const component = setup();
      const selectOrigin = component.find(Styled.SelectOrigin);

      const itemAttrLabelProp = selectOrigin.prop('itemAttrLabel');
      expect(itemAttrLabelProp).toBe('name');

      const itemAttrValueProp = selectOrigin.prop('itemAttrValue');
      expect(itemAttrValueProp).toBe('code');

      const itemsProp = selectOrigin.prop('items');
      expect(itemsProp).toEqual(originPorts);

      const labelProp = selectOrigin.prop('label');
      expect(labelProp).toBe('Origin');

      const selectedValueProp = selectOrigin.prop('selectedValue');
      expect(selectedValueProp).toBe(valueB);
    });

    it('should call `handleOriginChange` when select origin change', () => {
      const component = setup();
      const selectOrigin = component.find(Styled.SelectOrigin);
      const onChangeProp = selectOrigin.prop('onChange');

      onChangeProp();

      expect(handleOriginChange).toHaveBeenCalled();
    });
  });

  describe('select destination', () => {
    it('should have the proper props', () => {
      const component = setup();
      const selectDestination = component.find(Styled.SelectDestination);

      const itemAttrLabelProp = selectDestination.prop('itemAttrLabel');
      expect(itemAttrLabelProp).toBe('name');

      const itemAttrValueProp = selectDestination.prop('itemAttrValue');
      expect(itemAttrValueProp).toBe('code');

      const itemsProp = selectDestination.prop('items');
      expect(itemsProp).toEqual(destinationPorts);

      const labelProp = selectDestination.prop('label');
      expect(labelProp).toBe('Destination');

      const selectedValueProp = selectDestination.prop('selectedValue');
      expect(selectedValueProp).toBe(valueA);
    });

    it('should call `handleDestinationChange` when select destination change', () => {
      const component = setup();
      const selectDestination = component.find(Styled.SelectDestination);
      const onChangeProp = selectDestination.prop('onChange');

      onChangeProp();

      expect(handleDestinationChange).toHaveBeenCalled();
    });
  });

  describe('RenderChart', () => {
    it('should render `no chart` when `rates`, or `selectedDestination`, or `selectedOrigin` are not provided', () => {
      const component = shallow(<RenderChart />);
      const noChart = component.find(Styled.NoChart);
      expect(noChart.length).toBe(1);
    });

    it('should render `chart` when `rates`, `selectedDestination`, and `selectedOrigin` are provided', () => {
      const component = shallow(
        <RenderChart
          rates={rates}
          selectedDestination={valueA}
          selectedOrigin={valueB}
        />
      );
      const chart = component.find(Styled.Chart);
      expect(chart.length).toBe(1);
    });
  });
});
