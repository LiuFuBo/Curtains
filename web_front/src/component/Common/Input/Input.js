import React, {PropTypes} from 'react';
import * as styles from './Input.scss';

export class Input extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf([
      'text',
      'password'
    ]),
    tabIndex: PropTypes.string,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    type: 'text'
  };

  render() {
    const {id, className, type, placeholder, tabIndex, text, name, onChange} = this.props;

    return (
      <input id={id} type={type} className={`${className ? className : ''} ${styles.textInput}`} placeholder={placeholder} tabIndex={tabIndex} autoComplete="off" name={name} value={text} onChange={e => onChange(e.target.value, name)}/>
    );
  }
}