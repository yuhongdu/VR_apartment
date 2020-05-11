import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
const NoteListForm = (props) => (
  <li className="list-group-item">
      <div className="row">
        <div className="colxs-8 sm-9">
          <p>{props.body}</p>
          <p>Author {props.username}</p>
        </div>
      </div>
    </Container>
  </li>
)
export default CommentItem;
