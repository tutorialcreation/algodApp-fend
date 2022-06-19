import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { optIn } from "./NotesActions";

class OptIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidder:"",
      nft_id:0
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const nftId = localStorage.getItem("nftId")
    this.setState({nft_id:nftId})
    console.log({"nft_id":this.state.nft_id})
    
  };

  onAddClick = () => {
    const user = localStorage.getItem("user")
    const username = JSON.parse(user).username;
    console.log(username)
    
    const note = {
      bidder:this.state.bidder,
      nft_id:parseInt(this.state.nft_id)
    };
    
    this.props.optIn(note);
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
        <h2>Opt In to Asset</h2>
        <Form>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="bidder"
              value={this.bidder}
              placeholder="Enter your address"
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        
        <Button variant="success" onClick={this.onAddClick}>
          OptIn
        </Button>
        <hr/>
      </div>
    );
  }
}

OptIn.propTypes = {
  optIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { optIn })(withRouter(OptIn));
