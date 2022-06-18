import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { addNote } from "./NotesActions";

class AddApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nft_id:0,
      start_time:0,
      end_time:0,
      reserve:0,
      increment:0,
      nft_amount:0,
      creator:""
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const user = localStorage.getItem("user")
    const username = JSON.parse(user).username;
    console.log(username)
    const note = {
      username: username
    };
    
    this.props.addNote(note);
    const clientAddress = localStorage.getItem("clientAddress")
    const clientSk = localStorage.getItem("clientSk")
    
    this.setState({clientAddress:clientAddress})
    this.setState({clientSk:clientSk})
    console.log(this.state.clientAddress)
    console.log(this.state.clientSk)


  };

  render() {
    return (
      <div>
        <h2>Create Application</h2>
        <Form>
          <Form.Group controlId="contentId">
            
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              name="start_time"
              value={this.start_time}
              placeholder="Enter Starting Time"
            />
            <Form.Label>End Time</Form.Label>
            <Form.Control
              name="end_time"
              value={this.end_time}
              placeholder="Enter Ending time"
            />
            <Form.Label>Reserve</Form.Label>
            <Form.Control
              name="reserve"
              value={this.reserve}
              placeholder="Enter the reserve amount"
            />
            <Form.Label>Increment</Form.Label>
            <Form.Control
              name="increment"
              value={this.increment}
              placeholder="Enter increment"
            />
            <Form.Label>Nft Amount</Form.Label>
            <Form.Control
              name="nft_amount"
              value={this.nft_amount}
              placeholder="Enter amount of algos"
            />
            <Form.Label>Creator</Form.Label>
            <Form.Control
              name="creator"
              value={this.creator}
              placeholder="Enter the creator address"
            />
          </Form.Group>  
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Create Application
        </Button>

        
      </div>
    );
  }
}

AddApplication.propTypes = {
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addNote })(withRouter(AddApplication));
