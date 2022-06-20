import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { requestAsset } from "./NotesActions";

class RequestAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset_url:"",
      bidder:"",
      bidAmount:0,
      appId:0,
      nft_id:0
      
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
      bidder:this.state.bidder,
      bidAmount:parseInt(this.state.bidAmount),
      appId:parseInt(this.state.appId),
      nft_id:parseInt(this.state.nft_id)
    };
    
    this.props.requestAsset(note);
    const asset_url = localStorage.getItem("asset_url")
    
    this.setState({asset_url:asset_url})
    console.log(this.state.asset_url)


  };

  render() {
    return (
      <div>
        <h2>Request</h2>
        <Form>
          <Form.Group controlId="contentId">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="bidder"
              value={this.bidder}
              placeholder="Enter your address"
              onChange={this.onChange}
            />
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="bidAmount"
              value={this.bidAmount}
              placeholder="Enter amount of algos"
              onChange={this.onChange}
            />
            <Form.Label>Block</Form.Label>
            <Form.Control
              name="appId"
              value={this.appId}
              placeholder="Enter the block"
              onChange={this.onChange}
            />
            <Form.Label>NFT</Form.Label>
            <Form.Control
              name="nft_id"
              value={this.nft_id}
              placeholder="Enter the Non Fungible Token"
              onChange={this.onChange}
            />
            
          </Form.Group>

        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Request
        </Button>
        <hr/>
        { this.state.asset_url ? (
          <div>
          <p>Certificate: <a href={this.state.asset_url} target="_blank">{this.state.asset_url}</a></p>
          </div>
        ) : (
          <p>Certificate not yet generated</p>
        )}
      </div>
    );
  }
}

RequestAsset.propTypes = {
  requestAsset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { requestAsset })(withRouter(RequestAsset));
