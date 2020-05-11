import React from 'react';
import { connect } from 'react-redux';
import { noteActions } from '../actions';
import NoteListForm from '../components/NoteListForm.js';

class Note extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateCommentInput(name,value);
  }

  onSubmit(){
    this.props.uploadComment(this.props.src, this.props.username)
  }s
  render() {
    return (

      {!this.props.notes.length ? (
        <h1 className="text-center">No Comments to Display</h1>
      ) : (
        <NoteListForm>
        {this.props.notes.map(note =>{
          return(
          <NoteItem
            body={comment.body}
            author={comment.username}
            />
          );
          })}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        </NoteListForm>
      )
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    notes: state.comment.comment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateNoteInput:(key,value) =>{
      dispatch(noteActions.updateNoteInput(key,value))
    },
    uploadNote:(body, username) => {
        dispatch(noteActions.uploadNote(body, username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
