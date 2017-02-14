import React, {PropTypes} from 'react';
import * as styles from './TabNav.scss';

export class TabNav extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    activeTab: PropTypes.string,
    onChange: PropTypes.func
  };

  getTabs() {
    const {panels, activeTab} = this.props;

    return React.Children.map(panels, panel => {
      if (!panel) {
        return;
      }
      const order = panel.props.order;
      const events = {
        onClick: () => this.props.onChange(order)
      };

      return (
        <li className={activeTab === panel.props.order ? styles.active : null} {...events}>
          {
            panel.props.tab
          }
        </li>
      );
    });
  }

  render() {
    const {classPrefix} = this.props;

    return (
      <div className={`${classPrefix}Nav ${styles.tabNav}`}>
        <ul>
          {
            this.getTabs()
          }
        </ul>
      </div>
    );
  }
}