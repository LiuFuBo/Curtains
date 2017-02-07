import React, {PropTypes} from 'react';
import styles from './ButtonGroup.scss';

export class ButtonGroup extends React.PureComponent {
  // button contains label, isDisabled, onClick
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      isDisabled: PropTypes.bool,
      onClick: PropTypes.func
    }))
  };

  static defaultProps = {
    buttons: []
  };

  render() {
    const {buttons} = this.props;

    return (
      <div className={styles.buttonGroup}>
        {
          buttons.map((item, i) => (
            <button key={i} type="button" disabled={item.isDisabled} onClick={item.onClick}>{item.label}</button>
          ))
        }
      </div>
    );
  }
}