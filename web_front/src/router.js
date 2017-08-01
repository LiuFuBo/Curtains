import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {
  App,
  Dashboard,
  InvalidPage,
  LoginPage,
  RegisterPage,
  PersonalPage,
  NewBlogPage
} from './page';

const app = () => (
  <App>
    <Switch>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/info" component={PersonalPage}/>
      <Route exact path="/blog" component={NewBlogPage}/>
      <Route path="*" component={InvalidPage}/>
    </Switch>
  </App>
);

export default (
  <Router>
    <Switch>
      <Route exact path="/" render={() =>
        <Redirect to="/dashboard"/>}
      />
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/register" component={RegisterPage}/>
      <Route path="/" component={app}/>
    </Switch>
  </Router>
);