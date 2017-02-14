import React from 'react';
import * as styles from './Footer.scss';

export class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>&copy; 2015 Copyright, Bonica Blog Theme - All rights reserved.</p>
        <div className={styles.nav}>
          <a href="#">home</a>
          <a href="#">book</a>
          <a href="#">comment</a>
          <a href="#">edit</a>
        </div>
      </footer>
    );
  }
}