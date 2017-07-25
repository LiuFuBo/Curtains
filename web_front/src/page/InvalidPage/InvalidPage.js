import React from 'react';
import * as styles from './InvalidPage.scss';

export class InvalidPage extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <img src="/images/404_tag.jpg"/>
      </div>
    );
  }
}