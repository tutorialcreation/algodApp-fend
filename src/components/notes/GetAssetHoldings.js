import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form,Button} from "react-bootstrap";
import { getAssetHoldings } from "./NotesActions";

class GetAssetHoldings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetHoldings:"",
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
    
    this.props.getAssetHoldings(note);
    const assetHoldings = localStorage.getItem("assetHoldings")
    
    this.setState({assetHoldings:assetHoldings})


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
          View Asset Holdings
        </Button>
        <hr/>
        { this.state.assetHoldings ? (
          <div>
          <p>Asset Holdings {this.state.assetHoldings}</p>
          </div>
        ) : (
          <p>Asset Holdings not yet generated</p>
        )}
      </div>
    );
  }
}

GetAssetHoldings.propTypes = {
  getAssetHoldings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getAssetHoldings })(withRouter(GetAssetHoldings));
