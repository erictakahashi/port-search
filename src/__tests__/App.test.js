import { Switch, Route } from 'react-router-dom';
import { shallow } from 'enzyme';

import paths from '../constants/paths';
import Home from '../containers/Home/Home';

import App from '../App';

/**
 * Factory function that will an `App` shallow wrapper.
 */
const setup = () => shallow(<App />);

describe('App', () => {
  it('should have a `switch` wrapper', () => {
    const component = setup();
    const switchWrapper = component.find(Switch);
    expect(switchWrapper.length).toBe(1);
  });

  describe('home route', () => {
    let homeRoute;

    beforeAll(() => {
      const component = setup();
      homeRoute = component.find(Route).find({ path: paths.home });
    });

    it('should render home route', () => {
      expect(homeRoute.length).toBe(1);
    });

    it('should have the proper props', () => {
      const exact = homeRoute.prop('exact');
      expect(exact).toBeTruthy();

      const strict = homeRoute.prop('strict');
      expect(strict).toBeTruthy();

      const componentProp = homeRoute.prop('component');
      expect(componentProp).toEqual(Home);
    });
  });
});
