import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { generateApp } from "./NotesActions";

class AddApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nft_id:0,
      start_time:0,
      end_time:0,
      reserve:0,
      increment:0,
      nft_amount:0,
      creator:""
      
    };

  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({[e.target.name]: e.target.value})

    const nftId = localStorage.getItem("nft_id")
    this.setState({nft_id:nftId})
    console.log({"nft_id":this.state.nft_id})
  };

  onAddClick = () => {
    const note = {
      nft_id:parseInt(this.state.nft_id),
      start_time:parseInt(this.state.start_time),
      end_time:parseInt(this.state.end_time),
      reserve:parseInt(this.state.reserve),
      increment:parseInt(this.state.increment),
      nft_amount:parseInt(this.state.nft_amount),
      creator:this.state.creator
    };
    
    this.props.generateApp(note);


  };

  render() {
    return (
      <div>
        <h2>Create Application</h2>
        <Form>
          <Form.Group controlId="contentId">
            
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              name="start_time"
              value={this.start_time}
              placeholder="Enter Starting Time"
              onChange={this.onChange}
            />
            <Form.Label>End Time</Form.Label>
            <Form.Control
              name="end_time"
              value={this.end_time}
              placeholder="Enter Ending time"
              onChange={this.onChange}
            />
            <Form.Label>Reserve</Form.Label>
            <Form.Control
              name="reserve"
              value={this.reserve}
              placeholder="Enter the reserve amount"
              onChange={this.onChange}
            />
            <Form.Label>Increment</Form.Label>
            <Form.Control
              name="increment"
              value={this.increment}
              placeholder="Enter increment"
              onChange={this.onChange}
            />
            <Form.Label>Nft Amount</Form.Label>
            <Form.Control
              name="nft_amount"
              value={this.nft_amount}
              placeholder="Enter amount of algos"
              onChange={this.onChange}
            />
            <Form.Label>Creator</Form.Label>
            <Form.Control
              name="creator"
              value={this.creator}
              placeholder="Enter the creator address"
              onChange={this.onChange}
            />
          </Form.Group>  
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Create Application
        </Button>

        
      </div>
    );
  }
}

AddApplication.propTypes = {
  generateApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { generateApp })(withRouter(AddApplication));
