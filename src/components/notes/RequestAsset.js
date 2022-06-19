import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { addNote } from "./NotesActions";

class RequestAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidder:"",
      bidAmount:0,
      appId:0
      
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
        <h2>Request Asset</h2>
        <Form>
          <Form.Group controlId="contentId">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="bidder"
              value={this.bidder}
              placeholder="Enter your address"
            />
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="bidAmount"
              value={this.bidAmount}
              placeholder="Enter amount of algos"
            />
            <Form.Label>Application Id</Form.Label>
            <Form.Control
              name="appId"
              value={this.appId}
              placeholder="Enter Application Id"
            />
          </Form.Group>

        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Request Asset
        </Button>
        <hr/>
       
      </div>
    );
  }
}

RequestAsset.propTypes = {
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addNote })(withRouter(RequestAsset));
