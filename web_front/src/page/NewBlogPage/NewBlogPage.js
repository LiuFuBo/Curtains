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
      images: [],
      blogs: []
    };
    this.onClick = this.onClick.bind(this);
    this.onload = this.onload.bind(this);
  }

  componentDidMount() {
    Http.get('/api/blogs', {
      param: {
        page: 1,
        perPage: 6
      }
    })
      .then((resp) => {
        this.setState({
          blogs: resp.body.content
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
    const {title, summary, content, images} = this.state;
    const image = images.map((item, i) => ({
      name: `iamge${i}`,
      file: item.file
    }));

    Http.post('/api/blog', {
      data: {
        title,
        summary,
        content
      },
      attach: image
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onload(files) {
    this.setState({
      images: files
    });
  }

  render() {
    const {title, summary, content, blogs, images} = this.state;

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
            <Upload className={styles.upload} onload={this.onload}>
              <Button className={styles.submit} label={'add'}/>
            </Upload>

            {
              images.length !== 0 ? (
                <div className={styles.images}>
                  {
                    images.map((item, i) =>
                      <img key={i} src={item.dataUrl} title={item.file.name}/>
                    )
                  }
                </div>
              ) : null
            }
          </div>

          <div className={styles.confirm}>
            <Button className={styles.submit} label={'Submit'} onClick={this.onClick}/>
          </div>
        </div>

        <div className={styles.right}>
          {
            blogs.length !== 0 ? (
              blogs.map(blog => (
                <div key={blog.id} className={styles.blog}>
                  <img src={blog.image}/>
                  <label>{blog.title}</label>
                </div>
              ))
            ) : '没有可用的日志'
          }
        </div>
      </div>
    );
  }
}