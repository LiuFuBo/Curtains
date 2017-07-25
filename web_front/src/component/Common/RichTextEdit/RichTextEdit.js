import React, {PropTypes} from 'react';
import {Editor, EditorState, ContentState, RichUtils, convertFromHTML} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import * as styles from './RichTextEdit.scss';

export class RichTextEdit extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    text: '',
    onChange: () => {
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.text)))
    };
    this.onChange = this.onChange.bind(this);
    this.focusEditor = this.focusEditor.bind(this);
  }

  onClick(e, key) {
    e.preventDefault();

    let editorState = null;

    switch (key) {
      case 'bold':
        editorState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
        break;
      case 'italic':
        editorState = RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC');
        break;
      case 'list-ul':
        editorState = RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item');
        break;
      case 'list-ol':
        editorState = RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item');
        break;
      case 'link':
        editorState = RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE');
        break;
      default:
    }
    this.onChange(editorState);
  }

  convertToHTML(contentState) {
    const options = {
      inlineStyles: {
        'UNDERLINE': {element: 'a'}
      }
    };

    return stateToHTML(contentState, options);
  }

  onChange(editorState) {
    this.setState({
      editorState
    });

    this.props.onChange(this.convertToHTML(editorState.getCurrentContent()));
  }

  focusEditor() {
    this.refs.editor.focus();
  }

  render() {
    const {editorState} = this.state;
    const fonts = ['bold', 'italic', 'list-ul', 'list-ol'];

    return (
      <div className={styles.RichTextEdit}>
        <div className={styles.toolbar}>
          <ul>
            {
              fonts.map((font, i) => (
                <li key={i} onClick={(e) => this.onClick(e, font)}>
                  <i className={`fa fa-${font}`} title={`dialog.workspaceConfig.toolbar.${font}`}/>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.editor} onClick={this.focusEditor}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}