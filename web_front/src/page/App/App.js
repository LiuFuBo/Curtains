import React from 'react';
import {Header, Footer} from '../../layout';
import * as styles from './App.scss';

export class App extends React.Component {
  componentWillMount() {
    this.loginByCache();
  }

  loginByCache() {
    const isLogin = sessionStorage.getItem('isLogin');

    if (!isLogin) {
      window.location.href = '/#/login';
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Header className={styles.header} />
        {
          this.props.children
        }
        <Footer/>
      </div>
    );
  }
}