import React, {PropTypes} from 'react';
import {Http} from '../../util';
import {Search} from '../../component';
import * as styles from './Header.scss';

export class Header extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      fixed: false,
      result: []
    };
    this.fixedToolbar = this.fixedToolbar.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixedToolbar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedToolbar);
  }

  fixedToolbar() {
    const scrollTop = document.body.scrollTop;
    const {fixed} = this.state;

    if (scrollTop >= 64 !== fixed) {
      this.setState({
        fixed: !fixed
      });
    }
  }

  onSearch(text) {
    Http.get('/api/search', {
      param: {
        query: text
      }
    }).then(resp => {
      this.setState({
        result: resp.body.blogs
      });
    });
  }

  render() {
    const {className} = this.props;
    const {fixed, result} = this.state;

    return (
      <div className={`${styles.header} ${className ? className : ''}`}>
        <div className={styles.headTop}>
          <div className={styles.logo}>
            <img src="/images/logo.png" />
            <Search className={styles.search} onClick={this.onSearch}>
              <div className={styles.searchResult}>
                {
                  result.map(item => <span>{item.title}</span>)
                }
              </div>
            </Search>
          </div>

          <div className={styles.account}>
            <div>
              <i className="fa fa-sign-in"/>
              <a href="#/register">注册</a>
            </div>
            <div>
              <i className="fa fa-sign-out"/>
              <a href="#/login">登录</a>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.nav}>
            <div className={styles.navLeft}>
              <a href="#/dashboard">home</a>
              <a href="#/book">book</a>
              <a href="#/comment">comment</a>
              <a href="#/info">edit</a>
            </div>

            <div className={styles.navRight}>
              <a href="#/dashboard">
                <i className="fa fa-home"/>
              </a>
              <a href="#/book">
                <i className="fa fa-book"/>
              </a>
              <a href="#/comment">
                <i className="fa fa-comment-o"/>
              </a>
              <a href="#/info">
                <i className="fa fa-edit"/>
              </a>
            </div>
          </div>
        </div>

        <div className={`${styles.toolBar} ${fixed ? styles.toolBarAnimation : ''}`} ref="toolBar">
          <div className={styles.nav}>
            <img className={fixed ? styles.small : ''} src="/images/logo_toolbar.png"/>

            <div className={styles.navMenu}>
              <a href="#/dashboard">
                <i className="fa fa-home"/>home
              </a>
              <a href="#/book">
                <i className="fa fa-book"/>book
              </a>
              <a href="#/comment">
                <i className="fa fa-comment-o"/>comment
              </a>
              <a href="#/edit">
                <i className="fa fa-edit"/>edit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}