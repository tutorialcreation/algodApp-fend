import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteNote, updateNote } from "./NotesActions";
import { Button } from "react-bootstrap";

class Note extends Component {
  onDeleteClick = () => {
    const { note } = this.props;
    this.props.deleteNote(note.id);
  };
  onUpperCaseClick = () => {
    const { note } = this.props;
    this.props.updateNote(note.id, {
      content: note.content.toUpperCase()
    });
  };
  onLowerCaseClick = () => {
    const { note } = this.props;
    this.props.updateNote(note.id, {
      content: note.content.toLowerCase()
    });
  };
  render() {
    const { note } = this.props;
    return (
      <div>
        <hr />
        <div>
          (Staff:{note.user}) {note.address}
          <ul>
            <li>unit_name:{note.unit_name}</li>
            <li>asset_name:{note.asset_name}</li>
            <li>asset_url:{note.asset_url}</li>
            <li>note:{note.note}</li>
            <li>trainees:{note.bidders}</li>
            <li>nft_id:{note.nft_id}</li>
            <li>role:{note.role}</li>
            <li>block:{note.application}</li>
          </ul>

        </div>

        <Button variant="danger" size="sm" onClick={this.onDeleteClick}>
          Delete
        </Button>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteNote, updateNote })(
  withRouter(Note)
);
