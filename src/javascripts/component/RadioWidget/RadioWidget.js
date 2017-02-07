import React, {PropTypes} from 'react';
import styles from './RadioWidget.scss';

export class RadioWidget extends React.Component {
  static propTypes = {
    radios: PropTypes.array, // each radio contains key, value, label, link, onClick
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

  constructor(props) {
    super(props);

    this.state = {
      selected: ''
    };
  }

  componentDidMount() {
    const selected = this.props.selected;

    this.setState({
      selected
    });
  }

  onChange(selected) {
    this.setState({
      selected
    });
    this.props.onChange(selected);
  }

  render() {
    const {radios, layout, name} = this.props;
    const {selected} = this.state;

    return (
      <div className={`${styles.radioWidget} ${styles[layout]}`}>
        {
          radios.map(radio => (
            <div className={styles.radioItem} key={radio.key}>
              <input type="radio" id={`${name}_${radio.key}`} name={name} value={radio.value}
                     checked={selected === radio.value}
                     onChange={() => this.onChange(`${radio.value}`, `${radio.key}`)}/>
              <label className={styles.radioLabel} htmlFor={`${name}_${radio.key}`}>
                {
                  radio.link ? (
                    <a href="#" onClick={() => radio.onClick(radio.value)}>{radio.label}</a>
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