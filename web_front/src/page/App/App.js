import React from 'react';
import {Header, Footer} from '../../layout';
import * as styles from './App.scss';

export class App extends React.Component {
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