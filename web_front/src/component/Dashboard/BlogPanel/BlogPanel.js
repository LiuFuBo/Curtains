import React, {PropTypes} from 'react';
import * as styles from './BlogPanel.scss';

export class BlogPanel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.shape({
      original: PropTypes.string
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const {className, title, summary, content, image} = this.props;

    return (
      <div className={`${styles.blogPanel} ${className ? className : ''}`}>
        <div className={styles.title}>
          <i className="fa fa-angle-double-left"/>
          <span>{title}</span>
          <i className="fa fa-angle-double-right"/>
        </div>

        <div className={styles.summary} title={summary}>
          {summary}
        </div>

        <div className={styles.image}>
          <div className={styles.scale} onMouseEnter={this.toggleMenu} onMouseLeave={this.toggleMenu}>
            <img src={image.original}/>

            <div className={styles.imageMenu}>
              <span>By admin</span>
              <i className="fa fa-plus"/>
            </div>
          </div>
        </div>

        <p className={styles.content}>
          {content}
        </p>

        <div className={styles.more}>
          more
        </div>
      </div>
    );
  }
}