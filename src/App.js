import { Switch, Route } from 'react-router-dom';

import paths from './constants/paths';
import Home from './containers/Home/Home';

const App = () => (
  <Switch>
    <Route exact strict path={paths.home} component={Home} />
  </Switch>
);

export default App;
