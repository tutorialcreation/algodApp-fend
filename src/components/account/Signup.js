import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import {
  Alert,
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      usernameError: "",
      passwordError: "",
      emailError: "",
      status: "",
      role:""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value })
  };

  onSignupClick = () => {
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
      status: ""
    });

    const userData = {
      username: this.state.username,
      password: this.state.password,
      role:parseInt(this.state.role),
      email: this.state.email
    };
    console.log(userData)
    setAxiosAuthToken(""); // send request with empty token
    axios
      .post("/api/v1/users/", userData)
      .then(response => {
        this.setState({ status: "success" });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.hasOwnProperty("username")) {
            this.setState({ usernameError: error.response.data["username"] });
          }
          if (error.response.data.hasOwnProperty("email")) {
            this.setState({ emailError: error.response.data["email"] });
          }
          if (error.response.data.hasOwnProperty("password")) {
            this.setState({ passwordError: error.response.data["password"] });
          }
          
          if (error.response.data.hasOwnProperty("detail")) {
            this.setState({ status: "error" });
          }
          toastOnError(error)
        } else {
          this.setState({ status: "error" });
          toastOnError(error)
        }
      });
  };

  render() {
    let errorAlert = (
      <Alert variant="danger">
        <Alert.Heading>Problem during account creation</Alert.Heading>
        Please try again or contact service support for further help.
      </Alert>
    );

    let successAlert = (
      <Alert variant="success">
        <Alert.Heading>Account created</Alert.Heading>
        <p>
          We send you an email with activation link. Please check your email.
        </p>
      </Alert>
    );

    const form = (
      <div>
        <Form>
          <Form.Group controlId="usernameId">
            <Form.Label>User name</Form.Label>
            <Form.Control
              isInvalid={this.state.usernameError}
              type="text"
              name="username"
              placeholder="Enter user name"
              value={this.state.username}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.usernameError}
            </FormControl.Feedback>
          </Form.Group>

          <Form.Group controlId="emailId">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              isInvalid={this.state.emailError}
              type="text"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <FormControl.Feedback type="invalid">
              {this.state.emailError}
            </FormControl.Feedback>
          </Form.Group>

          <Form.Group controlId="passwordId">
            <Form.Label>Your password</Form.Label>
            <Form.Control
              isInvalid={this.state.passwordError}
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.password}
              onChange={this.onChange}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control as="select"
            name="role"
            value={this.role}
            onChange={this.onChange}
          >
            <option value="1">Staff</option>
            <option value="2">Trainee</option>
            <option value="3">Public</option>
          </Form.Control>
        </Form.Group>
         </Form>
        <Button color="primary" onClick={this.onSignupClick}>
          Sign up
        </Button>
      </div>
    );

    let alert = "";
    if (this.state.status === "error") {
      alert = errorAlert;
    } else if (this.state.status === "success") {
      alert = successAlert;
    }

    return (
      <Container>
        <Row>
          <Col md="6">
            <h1>Sign up</h1>
            {alert}
            {this.state.status !== "success" && form}
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

Signup.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(Signup));
