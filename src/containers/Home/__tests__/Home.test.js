import { shallow } from 'enzyme';

import Home from '../Home';
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

  const mockedPorts = ['A', 'B'];
  const destinationPorts = mockedPorts;
  const originPorts = mockedPorts;
  const ports = mockedPorts;

  beforeEach(() => {
    useHome = jest.spyOn(UseHome, 'useHome');
    handleDestinationChange = jest.fn();
    handleOriginChange = jest.fn();
    useHome.mockReturnValue({
      handleDestinationChange,
      handleOriginChange,
      destinationPorts,
      originPorts,
      ports
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

  describe('select origin', () => {
    it('should have the proper props', () => {
      const component = setup();
      const selectOrigin = component.find(Styled.SelectOrigin);

      const itemAttrLabelProp = selectOrigin.prop('itemAttrLabel');
      expect(itemAttrLabelProp).toBe('name');

      const itemAttrValueProp = selectOrigin.prop('itemAttrValue');
      expect(itemAttrValueProp).toBe('code');

      const labelProp = selectOrigin.prop('label');
      expect(labelProp).toBe('Origin');
    });

    it('should set `originPorts` as the `items` when there are origin ports data', () => {
      const component = setup();
      const selectOrigin = component.find(Styled.SelectOrigin);

      const itemsProp = selectOrigin.prop('items');
      expect(itemsProp).toEqual(originPorts);
    });

    it('should set `ports` as the `items` when there are no origin ports data', () => {
      useHome.mockReturnValue({
        handleDestinationChange,
        handleOriginChange,
        destinationPorts,
        ports
      });

      const component = setup();
      const selectOrigin = component.find(Styled.SelectOrigin);

      const itemsProp = selectOrigin.prop('items');
      expect(itemsProp).toEqual(ports);
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

      const labelProp = selectDestination.prop('label');
      expect(labelProp).toBe('Destination');
    });

    it('should set `originPorts` as the `items` when there are origin ports data', () => {
      const component = setup();
      const selectDestination = component.find(Styled.SelectDestination);

      const itemsProp = selectDestination.prop('items');
      expect(itemsProp).toEqual(destinationPorts);
    });

    it('should set `ports` as the `items` when there are no origin ports data', () => {
      useHome.mockReturnValue({
        handleDestinationChange,
        handleOriginChange,
        destinationPorts,
        ports
      });

      const component = setup();
      const selectDestination = component.find(Styled.SelectDestination);

      const itemsProp = selectDestination.prop('items');
      expect(itemsProp).toEqual(ports);
    });

    it('should call `handleDestinationChange` when select destination change', () => {
      const component = setup();
      const selectDestination = component.find(Styled.SelectDestination);
      const onChangeProp = selectDestination.prop('onChange');

      onChangeProp();

      expect(handleDestinationChange).toHaveBeenCalled();
    });
  });
});
