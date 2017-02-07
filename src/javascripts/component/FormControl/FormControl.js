import React, {PropTypes} from 'react';
import {ButtonGroup} from '../ButtonGroup';
import styles from './FormControl.scss';

export class FormControl extends React.PureComponent {
  static propTypes = {
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    cancel: PropTypes.func,
    submit: PropTypes.func
  };

  static defaultProps = {
    submitText: '',
    cancelText: '',
    cancel: () => {
    },
    submit: () => {
    }
  };

  buttons = [
    {
      label: this.props.cancelText,
      isDisabled: false,
      onClick: this.props.cancel
    },
    {
      label: this.props.submitText,
      isDisabled: false,
      onClick: this.props.submit
    }
  ];

  render() {
    return (
      <div className={styles.formControl}>
        <ButtonGroup
          buttons={this.buttons}
        />
      </div>
    );
  }
}