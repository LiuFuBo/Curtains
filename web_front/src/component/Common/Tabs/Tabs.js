import React, {PropTypes} from 'react';
import {TabNav} from './TabNav';
import {TabContent} from './TabContent';
import * as styles from './Tabs.scss';

export class Tabs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    activeTab: PropTypes.string
  };

  static defaultProps = {
    classPrefix: 'tabs',
    activeTab: '1'
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(order) {
    this.setState({
      activeTab: order
    });
  }

  renderTabNav() {
    const {children, classPrefix} = this.props;
    const {activeTab} = this.state;

    return (
      <TabNav
        classPrefix={classPrefix}
        panels={children}
        activeTab={activeTab}
        onChange={this.onChange}
      />
    );
  }

  renderTabContent() {
    const {classPrefix, children} = this.props;
    const {activeTab} = this.state;

    return (
      <TabContent
        classPrefix={classPrefix}
        panels={children}
        activeTab={activeTab}
      />
    );
  }

  render() {
    const {className} = this.props;

    return (
      <div className={`${className ? className : ''} ${styles.tabs}`}>
        {
          this.renderTabNav()
        }
        {
          this.renderTabContent()
        }
      </div>
    );
  }
}