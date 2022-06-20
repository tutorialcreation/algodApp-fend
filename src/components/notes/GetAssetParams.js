import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form,Button} from "react-bootstrap";
import { getAssetParams } from "./NotesActions";

class GetAssetParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:"",
      nft_id:0
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const note = {
      address:this.state.address,
      nft_id:parseInt(this.state.nft_id)
    };
    
    this.props.getAssetParams(note);
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
          <Form.Group controlId="contentId">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={this.address}
              placeholder="Enter address of nft holder"
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
          View Asset Status
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

GetAssetParams.propTypes = {
  getAssetParams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getAssetParams })(withRouter(GetAssetParams));
