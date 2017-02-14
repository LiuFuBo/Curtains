import React from 'react';
import {BlogPanel, Panel} from '../../component';
import {Http} from '../../util';
import * as styles from './Dashboard.scss';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: []
    };
  }

  componentDidMount() {
    Http.get('/api/blogs')
      .then((resp) => {
        this.setState({
          blogs: resp.body.blogs
        });
      });
  }

  render() {
    const {blogs} = this.state;

    return (
      <div className={styles.dashboard}>
        <div className={styles.backImage}>
          <div className={styles.arrow}>
            <i className="fa fa-chevron-left"/>
          </div>

          <div className={styles.centralSection}>
            <span>这是个令人流连忘返的地方！</span>
            <div className={styles.more}>
              more
            </div>
          </div>

          <div className={styles.arrow}>
            <i className="fa fa-chevron-right"/>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.leftSection}>
            {
              blogs.length === 0 ? <div>你没有可用的记录，快去建立哟!</div>
                : blogs.map((blog, i) =>
                  <BlogPanel
                    key={i}
                    className={styles.panel}
                    title={blog.title}
                    summary={blog.summary}
                    content={blog.content}
                    image={blog.image}
                  />
                )
            }
          </div>

          <div className={styles.rightSection}>
            <Panel className={styles.panelSection}>
              <img src="/images/avatar.png"/>
              <h2>tang yu</h2>
              <h4>About Us</h4>
              <span>
                Sed fringilla, magna eu ultricies eleifend, leo mi efficitur urna, quis tempus nulla ligula sed nibh. Quisque posuere tempus ultricies...
              </span>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}