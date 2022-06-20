import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form,Button} from "react-bootstrap";
import { getBalance } from "./NotesActions";

class GetBalances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:"",
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    
    const note = {
      address: this.state.address
    };
    
    this.props.getBalance(note);
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
          </Form.Group> 
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          View Balance
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

GetBalances.propTypes = {
  getBalance: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getBalance })(withRouter(GetBalances));
