import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button} from "react-bootstrap";
import { getAssetHoldings } from "./NotesActions";

class GetAssetHoldings extends Component {
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
    const user = localStorage.getItem("clientAddress")
    this.setState({address:user})
    const nftId = localStorage.getItem("nftId")
    this.setState({nft_id:nftId})
    const note = {
      address:this.state.address,
      nft_id:parseInt(this.state.nft_id)
    };
    
    this.props.getAssetHoldings(note);
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
        
        <Button variant="success" onClick={this.onAddClick}>
          View Asset Holdings
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

GetAssetHoldings.propTypes = {
  getAssetHoldings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getAssetHoldings })(withRouter(GetAssetHoldings));
