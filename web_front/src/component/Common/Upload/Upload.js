import React, {PropTypes} from 'react';
import * as styles from './Upload.scss';

export class Upload extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  };

  onProgress() {

  }

  uploadFinish() {

  }

  uploadError() {

  }

  uploadAbort() {

  }

  onChange(e) {
    const xhr = new XMLHttpRequest();
    const file = e.target.files[0];
    const reader = new FileReader();

    xhr.upload.addEventListener('progress', this.onProgress);
    xhr.addEventListener('load', this.uploadFinish);
    xhr.addEventListener('error', this.uploadError);
    xhr.addEventListener('abort', this.uploadAbort);
    reader.onload = () => {

    };
    reader.readAsDataURL(file);
  }

  render() {
    const {className, children} = this.props;

    return (
      <div className={`${styles.upload} ${className ? className : ''}`}>
        {children}
        <input type="file" onChange={e => this.onChange(e)}/>
      </div>
    );
  }
}