import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {
  App,
  Dashboard,
  InvalidPage,
  LoginPage,
  RegisterPage,
  PersonalPage,
  NewBlogPage
} from './page';

export default (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (
        <App>
          <Dashboard/>
        </App>
      )}/>
      <Route exact path="/dashboard" render={() => (
        <App>
          <Dashboard/>
        </App>
      )}/>
      <Route exact path="/info" render={() => (
        <App>
          <PersonalPage/>
        </App>
      )}/>
      <Route exact path="/blog" render={() => (
        <App>
          <NewBlogPage/>
        </App>
      )}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/register" component={() => (
        <App>
          <RegisterPage/>
        </App>
      )}/>
      <Route component={InvalidPage}/>
    </Switch>
  </Router>
);