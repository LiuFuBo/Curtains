import {Router, Route, Link, browserHistory} from 'react-router';
import {Dashboard, InvalidPage} from './container';

export default routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard}>
      <Route path="home" component={Dashboard}/>
      <Route path="*" component={InvalidPage}/>
    </Route>
  </Router>
);