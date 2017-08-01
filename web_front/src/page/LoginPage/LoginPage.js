import React from 'react';
import {Input, Button} from '../../component';
import {Http} from '../../util';
import * as styles from './LoginPage.scss';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      remember: false,
      error: ''
    };
    this.onLogin = this.onLogin.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onChange(name, value) {
    const newState = {};

    newState[name] = value;
    this.setState({
      ...this.state,
      error: '',
      ...newState
    });
  }

  onLogin() {
    const {userName, password, remember} = this.state;

    Http.post('/api/login',
      {
        data: {
          userName,
          password
        }
      })
      .then((resp) => {
        const {status, msg} = resp.body;

        if (status === 200) {
          sessionStorage.setItem('isLogin', true);
          if (remember) {
            localStorage.setItem('remember', true);
          } else {
            localStorage.removeItem('remember');
          }
          window.location.href = '/#/dashboard';
        } else {
          this.setState({
            error: msg || '登录失败'
          });
        }
      })
      .catch((error) => {
        sessionStorage.removeItem('isLogin');
        this.setState({
          error: error || '登录失败'
        });
      });
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onLogin();
    }
  }

  render() {
    const {userName, password, remember, error} = this.state;

    return (
      <div className={styles.page}>
        <div>
          <img src="/images/slider1.jpg"/>
        </div>

        <div className={styles.login} onKeyUp={this.onKeyUp}>
          <div>
            <i className="fa fa-user-o"/>
            <Input
              className={styles.inputText}
              name={'userName'}
              text={userName}
              tabIndex={'1'}
              placeholder={'name'}
              onChange={value => this.onChange('userName', value)}
            />
          </div>

          <div>
            <i className="fa fa-unlock-alt fa-lg"/>
            <Input
              className={styles.inputText}
              type={'password'}
              name={'password'}
              text={password}
              tabIndex={'2'}
              placeholder={'password'}
              onChange={value => this.onChange('password', value)}
            />
          </div>

          {
            error !== '' ? (
              <div className={styles.error}>
                {error}
              </div>
            ) : null
          }

          <div>
            <input id="remember" type="checkbox" tabIndex="3" name="remember" checked={remember} onChange={() => this.onChange('remember', !remember)}/>
            <label className={styles.remember} htmlFor="remember">remember me</label>
          </div>

          <Button className={styles.loginButton} label={'Sign In'} tabIndex={'4'} onClick={this.onLogin}/>

          <p className={styles.register}>Not a count? Click <a href="/#/register" tabIndex="5">here</a> to register.</p>

          <p className={styles.copyright}>&copy; 2015 Copyright, Bonica Blog Theme</p>
        </div>
      </div>
    );
  }
}