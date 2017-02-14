import React, {PropTypes} from 'react';

export class TabContent extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    activeTab: PropTypes.string
  };

  getTabPanels() {
    const {classPrefix, activeTab, panels} = this.props;

    return React.Children.map(panels, panel => {
      if (!panel) {
        return;
      }
      const order = panel.props.order;
      const isActive = activeTab === order;

      return React.cloneElement(panel, {
        classPrefix,
        isActive,
        children: panel.props.children
      });
    });
  }

  render() {
    const {classPrefix} = this.props;

    return (
      <div className={`${classPrefix}Content`}>
        {
          this.getTabPanels()
        }
      </div>
    );
  }
}