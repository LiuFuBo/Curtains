import React, {PropTypes} from 'react';
import styles from './TextInput.scss';

export class TextInput extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    name: '',
    text: '',
    onChange: () => {
    }
  };

  render() {
    const {name, text, onChange} = this.props;

    return (
      <input className={styles.textInput} type="text" name={name} value={text} onChange={e => onChange(e.target.value, name)}/>
    );
  }
}