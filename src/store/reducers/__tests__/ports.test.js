import { portsActions } from '../../actions/ports';
import { ports } from '../ports';

describe('ports reducer', () => {
  const allPorts = ['A', 'B'];
  const initialState = {
    destinationPorts: allPorts,
    originPorts: allPorts,
    ports: allPorts,
    rates: [1, 2]
  };

  it('should set the payload as the state `destinationPorts` when `SET_DESTINATION_PORTS` action type is provided', () => {
    const portsData = [{ name: 'A' }];

    const state = ports(initialState, {
      type: portsActions.SET_DESTINATION_PORTS,
      payload: portsData
    });

    expect(state.destinationPorts).toEqual(portsData);
  });

  it('should set the payload as the state `originPorts` when `SET_ORIGIN_PORTS` action type is provided', () => {
    const portsData = [{ name: 'A' }];

    const state = ports(initialState, {
      type: portsActions.SET_ORIGIN_PORTS,
      payload: portsData
    });

    expect(state.originPorts).toEqual(portsData);
  });

  it('should set the payload as the state `ports` when `SET_PORTS` action type is provided', () => {
    const portsData = [{ name: 'A' }];

    const state = ports(initialState, {
      type: portsActions.SET_PORTS,
      payload: portsData
    });

    expect(state.ports).toEqual(portsData);
  });

  it('should set the payload as the state `rates` when `SET_RATES` action type is provided', () => {
    const rateData = [{ low: 100, high: 800 }];

    const state = ports(initialState, {
      type: portsActions.SET_RATES,
      payload: rateData
    });

    expect(state.rates).toEqual(rateData);
  });

  it('should set the payload as the state `selectedDestination` when `SET_SELECTED_DESTINATION` action type is provided', () => {
    const selectedValue = 'A';

    const state = ports(initialState, {
      type: portsActions.SET_SELECTED_DESTINATION,
      payload: selectedValue
    });

    expect(state.selectedDestination).toEqual(selectedValue);
  });

  it('should set the payload as the state `selectedOrigin` when `SET_SELECTED_ORIGIN` action type is provided', () => {
    const selectedValue = 'A';

    const state = ports(initialState, {
      type: portsActions.SET_SELECTED_ORIGIN,
      payload: selectedValue
    });

    expect(state.selectedOrigin).toEqual(selectedValue);
  });

  it('should return the current state by default when an invalid action is provided', () => {
    const state = ports(initialState, {
      type: 'TEST_TYPE',
      payload: 'test'
    });

    expect(state).toEqual(initialState);
  });
});
