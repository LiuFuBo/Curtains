import React from 'react';
import {Http} from '../../util';
import {Input, Button, Radios, RichTextEdit, Upload} from '../../component';
import * as styles from './PersonalPage.scss';

export class PersonalPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: '',
        professition: '',
        gender: '',
        description: '',
        image: {
          original: ''
        }
      }
    };
  }

  componentDidMount() {
    Http.get('/api/user/1')
      .then((resp) => {
        this.setState({
          user: resp.body.user
        });
      });
  }

  onChange(name, value) {
    const newState = {};
    const {user} = this.state;

    newState[name] = value;

    this.setState({
      user: {
        ...user,
        ...newState
      }
    });
  }

  render() {
    const {userName, professition, gender, description, image} = this.state.user;
    const radios = [
      {
        key: 1,
        value: 'male',
        label: '男'
      },
      {
        key: 2,
        value: 'female',
        label: '女'
      }
    ];
    if (userName === '') {
      return <div>loading...</div>;
    }

    return (
      <div className={styles.page}>
        <div className={styles.info}>
          <div className={styles.username}>
            <label>用户名：</label>
            <Input className={styles.inputStyle} name={'username'} text={userName} onChange={this.onChange}/>
          </div>

          <div className={styles.profession}>
            <label>职业：</label>
            <Input className={styles.inputStyle} name={'professition'} text={professition} onChange={this.onChange}/>
          </div>

          <div className={styles.gender}>
            <label>性别：</label>
            <Radios radios={radios} name={'gender'} selected={gender} onChange={this.onChange}/>
          </div>

          <div className={styles.edit}>
            <label>描述：</label>
            <RichTextEdit text={description} onChange={this.onChange}/>
          </div>
        </div>

        <div className={styles.avatar}>
          <img src={image.original}/>

          <Upload className={styles.uploadLink}>
            <Button className={styles.uploadButton} label={'上传头像'}/>
          </Upload>
        </div>
      </div>
    );
  }
}