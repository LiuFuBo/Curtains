import React, {PropTypes} from 'react';
import * as styles from './Button.scss';

export class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tabIndex: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const {className, label, tabIndex, disabled, onClick} = this.props;

    return (
      <button className={`${className ? className : ''} ${styles.actionButton}`} type="button" tabIndex={tabIndex} disabled={disabled} onClick={onClick}>
        <span>{label}</span>
      </button>
    );
  }
}