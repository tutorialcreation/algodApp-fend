import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { addNote } from "./NotesActions";

class DonateAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nft_id:0,
      app_id:0,
      nft_amount:0,
      funder:"",
      nft_holder:""
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value })
    const nftId = localStorage.getItem("nft_id")
    this.setState({nft_id:nftId})
    console.log({"nft_id":this.state.nft_id})

  };

  onAddClick = () => {
    const user = localStorage.getItem("user")
    const username = JSON.parse(user).username;
    console.log(username)
    const note = {
      nft_id:this.state.nft_id,
      app_id:this.state.app_id,
      nft_amount:this.state.nft_amount,
      funder:this.state.funder,
      nft_holder:this.state.nft_holder
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
        <h2>Donate Asset</h2>
        <Form>
          <Form.Group controlId="contentId">
            <Form.Label>Nft Amount</Form.Label>
            <Form.Control
              name="nft_amount"
              value={this.nft_amount}
              placeholder="Enter the amount of algos to donate"
            />
            <Form.Label>From</Form.Label>
            <Form.Control
              name="funder"
              value={this.funder}
              placeholder="Enter your address"
            />
            <Form.Label>To</Form.Label>
            <Form.Control
              name="nft_holder"
              value={this.nft_holder}
              placeholder="Enter recipients address"
            />
            
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Donate
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

DonateAsset.propTypes = {
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addNote })(withRouter(DonateAsset));
