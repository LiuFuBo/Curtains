import React, {PropTypes} from 'react';
import {Input} from '../Input';
import {Button} from '../Button';
import * as styles from './Search.scss';

export class Search extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      text: value
    });
  }

  render() {
    const {className, children, onClick} = this.props;
    const {text} = this.state;

    return (
      <div className={`${styles.search} ${className ? className : ''}`}>
        <div className={styles.searchInput}>
          <i className="fa fa-search"/>
          <Input
            name={'search'}
            value={text}
            onChange={this.onChange}
          />
          <Button
            label={'搜索'}
            onClick={() => onClick(text)}
          />
        </div>
        {
          children
        }
      </div>
    );
  }
}