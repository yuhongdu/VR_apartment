import React from 'react';
const NoteListForm = (props) => (
  <ul className="list-group">{props.children}</ul>
  <Card className="container">
    <form action='/' onSubmit={props.onSubmit}>
    <div className="field-line">
      <TextField
        floatingLabelText="Name"
        name="comment"
        onChange={props.onChange}
        value={props.comment}
      />
    </div>
    <div className="button-line">
      <RaisedButton type="submit" label="Upload Comment" primary />
    </div>
    </form>
  </Card>
)

export default NoteListForm;
