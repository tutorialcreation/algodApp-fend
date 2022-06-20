import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { donateAsset } from "./NotesActions";

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
    
  };

  onAddClick = () => {
    const user = localStorage.getItem("user")
    const username = JSON.parse(user).username;
    console.log(username)
    const note = {
      nft_id:parseInt(this.state.nft_id),
      app_id:parseInt(this.state.app_id),
      nft_amount:parseInt(this.state.nft_amount),
      funder:this.state.funder,
      nft_holder:this.state.nft_holder
    };
    
    this.props.donateAsset(note);
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
        <h2>Donate</h2>
        <Form>
          <Form.Group controlId="contentId">
          <Form.Label>Nft</Form.Label>
            <Form.Control
              name="nft_id"
              value={this.nft_id}
              placeholder="Enter the non fungible token"
              onChange={this.onChange}
            />
            <Form.Label>Block</Form.Label>
            <Form.Control
              name="app_id"
              value={this.app_id}
              placeholder="Enter the block identification"
              onChange={this.onChange}
            />
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="nft_amount"
              value={this.nft_amount}
              placeholder="Enter the amount of algos to donate"
              onChange={this.onChange}
            />
            <Form.Label>From</Form.Label>
            <Form.Control
              name="funder"
              value={this.funder}
              placeholder="Enter your address"
              onChange={this.onChange}
            />
            <Form.Label>To</Form.Label>
            <Form.Control
              name="nft_holder"
              value={this.nft_holder}
              placeholder="Enter recipients address"
              onChange={this.onChange}
            />
            
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Donate
        </Button>
        <hr/>
        
      </div>
    );
  }
}

DonateAsset.propTypes = {
  donateAsset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { donateAsset })(withRouter(DonateAsset));
