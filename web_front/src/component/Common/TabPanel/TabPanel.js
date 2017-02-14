import React, {PropTypes} from 'react';
import * as styles from './TabPanel.scss';

export class TabPanel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool
  };

  render() {
    const {children, classPrefix, className, isActive} = this.props;

    return (
      <div className={`${isActive ? styles.active : styles.hidden} ${classPrefix}Panel ${className ? className : ''}`}>
        {children}
      </div>
    );
  }
}