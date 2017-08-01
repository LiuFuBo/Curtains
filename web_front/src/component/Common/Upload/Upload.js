import React, {PropTypes} from 'react';
import * as styles from './Upload.scss';

export class Upload extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    onload: PropTypes.func
  };

  readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  onChange(e) {
    const files = e.target.files;
    const binaryFiles = [];

    for (const file of files) {
      this.readFile(file)
        .then((result) => {
          binaryFiles.push(result);

          if (files.length === binaryFiles.length) {
            const newFiles = binaryFiles.map((item, i) => ({
              file: files[i],
              dataUrl: item
            }));

            this.props.onload(newFiles);
          }
        });
    }
  }

  render() {
    const {className, children} = this.props;

    return (
      <div className={`${styles.upload} ${className ? className : ''}`}>
        {children}
        <input type="file" onChange={e => this.onChange(e)} multiple/>
      </div>
    );
  }
}