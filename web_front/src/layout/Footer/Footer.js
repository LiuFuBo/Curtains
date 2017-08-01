import React from 'react';
import * as styles from './Footer.scss';

export class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>&copy; 2015 Copyright, Bonica Blog Theme - All rights reserved.</p>
        <div className={styles.nav}>
          <a href="/#/dashboard">home</a>
          <a href="/#/blog">blog</a>
          <a href="/#/comment">comment</a>
          <a href="/#/info">edit</a>
        </div>
      </footer>
    );
  }
}