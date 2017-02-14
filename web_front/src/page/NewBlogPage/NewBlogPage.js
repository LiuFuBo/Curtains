import React from 'react';
import {Http} from '../../util';
import {Input, Button, RichTextEdit, Upload} from '../../component';
import * as styles from './NewBlogPage.scss';

export class NewBlogPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      summary: '',
      content: '',
      blogs: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Http.get('/api/blogs', {
      param: {
        page: 1,
        perPage: 10
      }
    })
      .then((resp) => {
        this.setState({
          blogs: resp.body
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange(name, value) {
    const newState = {};

    newState[name] = value;

    this.setState({
      ...this.state,
      ...newState
    });
  }

  onClick() {
    const {title, summary, content} = this.state;

    Http.post('/api/blog', {
      data: {
        title,
        summary,
        content
      }
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {title, summary, content, blogs} = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.left}>
          <div className={styles.title}>
            <label htmlFor="title">title：</label>
            <Input id="title" name={'title'} text={title} tabIndex={'1'} onChange={(value, name) => this.onChange(name, value)}/>
          </div>

          <div className={styles.summary}>
            <label htmlFor="summary">summary：</label>
            <Input id="summary" name={'summary'} text={summary} tabIndex={'2'} onChange={(value, name) => this.onChange(name, value)}/>
          </div>

          <div>
            <label>content：</label>
            <RichTextEdit text={content} onChange={(value) => this.onChange('content', value)}/>
          </div>

          <div>
            <Upload className={styles.upload}>
              <Button className={styles.submit} label={'add'}/>
            </Upload>

            <div>
              <span>dfsdfss.png</span>
            </div>
          </div>

          <div className={styles.confirm}>
            <Button className={styles.submit} label={'Submit'} onClick={this.onClick}/>
          </div>
        </div>

        <div className={styles.right}>
          {
            blogs.map(blog => (
              <div className={styles.blog}>
                <img src={blog.image.original}/>
                <label>{blog.title}</label>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}