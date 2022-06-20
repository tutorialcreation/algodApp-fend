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
      balance:"",
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
    const balance = localStorage.getItem("balance")
    
    this.setState({balance:balance})
    console.log(balance)

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
        { this.state.balance ? (
          <div>
          <p>Balance: {this.state.balance}</p>
          </div>
        ) : (
          <p>Not yet generated balance of this account</p>
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
