import React, {PropTypes} from 'react';
import * as styles from './Radios.scss';

export class Radios extends React.PureComponent {
  static propTypes = {
    radios: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        value: PropTypes.string,
        label: PropTypes.string,
        link: PropTypes.bool,
        onClick: PropTypes.func
      })
    ),
    selected: PropTypes.string,
    name: PropTypes.string,
    layout: PropTypes.oneOf(['row', 'column']),
    onChange: PropTypes.func
  };

  static defaultProps = {
    radios: [],
    selected: '',
    name: '',
    layout: 'row',
    onChange: () => {
    }
  };

  render() {
    const {radios, layout, name, selected, onChange} = this.props;

    return (
      <div className={`${styles.radioWidget} ${styles[layout]}`}>
        {
          radios.map(radio => (
            <div className={styles.radioItem} key={radio.key}>
              <input type="radio" id={`${name}_${radio.key}`} name={name} value={radio.value}
                checked={selected === radio.value} onChange={() => onChange(radio.value, name)}/>
              <label className={styles.radioLabel} htmlFor={`${name}_${radio.key}`}>
                {
                  radio.link ? (
                    <a href="#" onClick={() => radio.onClick(radio.value, name)}>{radio.label}</a>
                  ) : (
                    <span>{radio.label}</span>
                  )
                }
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}