import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../login/LoginActions";

import NotesList from "../notes/NotesList";
import AddNote from "../notes/AddNote";
import AddAsset from "../notes/AddAsset";
import AddApplication from "../notes/AddApplication";
import DonateAsset from "../notes/DonateAsset";
import RequestAsset from "../notes/RequestAsset";
import AcceptRequest from "../notes/AcceptRequest";
import GetAssetParams from "../notes/GetAssetParams";
import GetAssetHoldings from "../notes/GetAssetHoldings";
import GetBalances from "../notes/GetBalances";

class Dashboard extends Component {
  


  onLogout = () => {
    this.props.logout();
  };

  render() {
    
    const { user } = this.props.auth;
    console.log(user)
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle />
          {/* <WalletConnection/> */}
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <b>{user.username}</b>
            </Navbar.Text>
            <Nav.Link onClick={this.onLogout}>Logout</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <NotesList />
          {
            (user.role === 1)
            ?
            <div>
              <AddNote />
              <AddAsset/>
              <DonateAsset/>
              <AcceptRequest/>
              <GetAssetParams/>
              <GetAssetHoldings/>
              <GetBalances/>
            </div>
            :(user.role === 2)?
            <div>
              <AddNote />
              <RequestAsset/>
              <DonateAsset/>
              <GetAssetParams/>
              <GetAssetHoldings/>
              <GetBalances/>
            </div>
            :
            <div>
              <AddNote />
              <AddApplication/>
              <DonateAsset/>
              <GetAssetParams/>
              <GetAssetHoldings/>
              <GetBalances/>
            </div>
          }
          
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Dashboard));
