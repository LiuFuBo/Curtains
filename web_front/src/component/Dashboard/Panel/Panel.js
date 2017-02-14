import React, {PropTypes} from 'react';
import * as styles from './Panel.scss';

export class Panel extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className} = this.props;

    return (
      <div className={`${styles.panel} ${className ? className : ''}`}>
        {
          this.props.children
        }
      </div>
    );
  }
}