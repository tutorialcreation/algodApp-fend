import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { acceptRequest } from "./NotesActions";

class AcceptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_id:0,
      nft_id:0
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value })
  };

  onAddClick = () => {
    
    const appId = localStorage.getItem("appID")
    this.setState({app_id:appId})
    console.log({"appID":this.state.app_id})
    const note = {
      app_id:parseInt(this.state.app_id),
      nft_id:parseInt(this.state.nft_id)
    };
    
    this.props.acceptRequest(note);
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
        <Form>
          <Form.Group>
            <Form.Label>Accept</Form.Label>
            <Form.Control
              name="nft_id"
              value={this.nft_id}
              onChange={this.onChange}
              placeholder="Enter NFT to accept"
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Accept Request
        </Button>
        <hr/>
        { this.state.clientAddress ? (
          <div>
          <p>Address: {this.state.clientAddress}</p>
          <p>Key: {this.state.clientSk}</p>
          </div>
        ) : (
          <p>Not yet generated client details</p>
        )}
      </div>
    );
  }
}

AcceptRequest.propTypes = {
  acceptRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { acceptRequest })(withRouter(AcceptRequest));
