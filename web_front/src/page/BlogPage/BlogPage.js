import React from 'react';
import {Http} from '../../util';
import * as styles from './BlogPage.scss';

export class BlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      createTime: ''
    };
  }

  componentDidMount() {
    const {id} = this.props;

    Http.get(`/api/blog/${id}`)
      .then((resp) => {
        this.setState({
          ...resp.body.blog
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {title, content, createTime} = this.state;

    return (
      <div className={styles.page}>
        <h1>{title}</h1>
        <span>{createTime}</span>
        <span>{content}</span>
      </div>
    );
  }
}
