import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
    const role  = localStorage.getItem("role")
    console.log(role)
    return (
      <div>
        <hr />
        {
          (role === '1')?
          <div>
          (Staff:{note.user}) {note.address}
          <ul>
            <li>unit_name:{note.unit_name}</li>
            <li>asset_name:{note.asset_name}</li>
            <li>asset_url:<a href={note.asset_url} target="_blank">{note.asset_url}</a></li>
            <li>award:{note.note}</li>
            <li>trainees:{note.bidders}</li>
            <li>nft_id:{note.nft_id}</li>
            <li>role:{note.role}</li>
            <li>block:{note.application}</li>
          </ul>

        </div>

          :(role === '2')?
          <div>
          (Staff:{note.user}) {note.address}
          <ul>
            <li>unit_name:{note.unit_name}</li>
            <li>asset_name:{note.asset_name}</li>
            <li>award:{note.note}</li>
            <li>nft_id:{note.nft_id}</li>
            <li>role:{note.role}</li>
            <li>block:{note.application}</li>
          </ul>

        </div>

          :
          <div>
          (Staff:{note.user}) {note.address}
          <ul>
            <li>unit_name:{note.unit_name}</li>
            <li>asset_name:{note.asset_name}</li>
            <li>award:{note.note}</li>
            <li>nft_id:{note.nft_id}</li>
            <li>role:{note.role}</li>
            <li>block:{note.application}</li>
          </ul>

        </div>

        }
        
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
