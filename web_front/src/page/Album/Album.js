import React from 'react';
import {Http} from '../../util';
import * as styles from './Album.scss';

export class Album extends React.Component {
  componentDidMount() {
    Http.get('/api/images')
      .then(() => {

      })
      .catch(() => {

      });
  }

  render() {
    return (
      <div className={styles.page}>
      </div>
    );
  }
}