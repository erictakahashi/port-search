import { portsActions } from '../../actions/ports';
import { ports } from '../ports';

describe('ports reducer', () => {
  const initialState = {
    ports: ['A', 'B'],
    rates: [1, 2]
  };

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

  it('should return the current state by default when an invalid action is provided', () => {
    const state = ports(initialState, {
      type: 'TEST_TYPE',
      payload: 'test'
    });

    expect(state).toEqual(initialState);
  });
});
