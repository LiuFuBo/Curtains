import React from 'react';
import {Input, Button} from '../../component';
import {Http, Verify} from '../../util';
import * as styles from './RegisterPage.scss';

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      doPassword: '',
      captcha: ''
    };
    this.onkeyUp = this.onkeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  verifyNameAndPsw() {
    const {userName, password} = this.state;

    return Verify.validEmail(userName) && Verify.validPassword(password);
  }

  onChange(value, name) {
    const newState = {};

    newState[name] = value;
    this.setState({
      ...this.state,
      ...newState
    });
  }

  onClick() {
    const {userName, password, captcha} = this.state;

    if (this.verifyNameAndPsw()) {
      Http.post('/api/user', {
        data: {
          userName,
          password,
          captcha
        }
      })
        .then((resp) => {
          if (resp.body.status === 200) {
            window.location.href = '#/login';
          }
        });
    }
  }

  onkeyUp(e) {
    if (e.keyCode === 13) {
      this.onClick();
    }
  }

  render() {
    const {userName, password, doPassword, captcha} = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.topTriangle}/>
        <form onKeyUp={this.onkeyUp}>
          <div>
            <label htmlFor="userName">email：</label>
            <Input id={'userName'} text={userName} name={'userName'} tabIndex={'1'} onChange={this.onChange}/>
          </div>

          <div>
            <label htmlFor="password">password：</label>
            <Input id={'password'} type={'password'} text={password} name={'password'} tabIndex={'2'} onChange={this.onChange}/>
          </div>

          <div>
            <label htmlFor="doPassword">do password：</label>
            <Input id={'doPassword'} type={'password'} text={doPassword} name={'doPassword'} tabIndex={'3'} onChange={this.onChange}/>
          </div>

          <div>
            <label htmlFor="captcha">captcha：</label>
            <Input id={'captcha'} text={captcha} name={'captcha'} tabIndex={'4'} onChange={this.onChange}/>
          </div>

          <div>
            <Button className={styles.submit} label={'Register'} tabIndex={'5'} onClick={this.onClick}/>
          </div>
        </form>
      </div>
    );
  }
}