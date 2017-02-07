import React, {PropTypes} from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import moment from 'moment';
import styles from './TimeWidget.scss';
import './react-day-picker-overwrie.css';

export class TimeWidget extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(moment),
    onChange: PropTypes.func
  };

  static defaultProps = {
    date: new Date(),
    onChange: () => {
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isOpenDate: false
    };
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
    this.selectedDay = this.selectedDay.bind(this);
  }

  componentDidMount() {
    const {date} = this.props;

    this.setState({
      date
    });
  }

  onChange(value, name) {
    const date = this.state.date;

    switch (name) {
      case 'day':
        date.set('date', value);
        break;
      case 'month':
        date.set('month', value);
        break;
      case 'year':
        date.set('year', value);
        break;
      default:
        break;
    }
    this.setState({
      date
    });
    this.props.onChange(date, 'date');
  }

  onDayClick(e, day, {disabled, selected}) {
    if (disabled) {
      return;
    }
    this.props.onChange(selected ? null : moment(day), 'date');
    this.setState({
      date: selected ? null : moment(day),
      isOpenDate: !this.state.isOpenDate
    });
  }

  onClickDate() {
    const isOpenDate = this.state.isOpenDate;

    this.setState({
      isOpenDate: !isOpenDate
    });
  }

  selectedDay(day) {
    return DateUtils.isSameDay(this.state.date._d, day);
  }

  render() {
    const {date, isOpenDate} = this.state;

    if (date === null) {
      return <div>Loading...</div>;
    }
    const year = date.get('year');
    const month = date.get('month') + 1;
    const day = date.date();

    return (
      <div className={styles.timeWidget}>
        <input className={styles.margin_r_5} type="text" name="year" value={year} maxLength="256"
               onChange={e => this.onChange(e.target.value, 'year')}/>年
        <input className={`${styles.margin_r_5} ${styles.margin_l_5}`} type="text" name="month" value={month}
               maxLength="256"
               onChange={e => this.onChange(e.target.value, 'month')}/>月
        <input className={`${styles.margin_r_5} ${styles.margin_l_5}`} type="text" name="day" value={day}
               maxLength="256"
               onChange={e => this.onChange(e.target.value, 'day')}/>日
        <div className={`${styles.margin_l_5} ${styles.date}`}>
          <button onClick={this.onClickDate}>日期</button>
          {
            isOpenDate ? (
              <DayPicker
                className={styles.datePicker}
                selectedDays={this.selectedDay}
                disabledDays={DateUtils.isPastDay}
                enableOutsideDays
                onDayClick={this.onDayClick}
                />
            ) : null
          }
        </div>
      </div>
    );
  }
}