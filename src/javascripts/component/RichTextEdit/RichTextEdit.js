import React, {PropTypes} from 'react';
import {Editor, EditorState, ContentState, RichUtils, convertFromHTML} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import styles from './RichTextEdit.scss';

export class RichTextEdit extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {
    text: ''
  };

  fonts = ['bold', 'italic', 'list-ul', 'list-ol'];

  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.props.text)))
    };

    this.onChange = this.onChange.bind(this);
    this.focusEditor = this.focusEditor.bind(this);
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(this.props.text)))
    });
  }

  convertToHTML(contentState) {
    const options = {
      inlineStyles: {
        'UNDERLINE': {element: 'a'}
      }
    };

    return stateToHTML(contentState, options);
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
    return (
      <div className={styles.RichTextEdit}>
        <div className={styles.toolbar}>
          <ul>
            {
              this.fonts.map((font, i) => (
                <li key={i} onClick={e => this.onClick(e, font)}>
                  <i className={`fa fa-${font}`} title={`dialog.workspaceConfig.toolbar.${font}`}/>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.editor} onClick={this.focusEditor}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
            />
        </div>
      </div>
    );
  }
}