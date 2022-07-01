import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Switch, Route,Link } from 'react-router-dom';

import { Container, Navbar, Nav, Button } from "react-bootstrap";
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
  
  constructor(props) {
    super(props);
    this.state = {
      addAssets:false,
      donateAssets:false,
      acceptRequest:false,
      fetchInfo:false,
      mnemonic:"",
      nft_amount:0,
      unit_name:"",
      asset_name:"",
      note:""
    };
  }
  router(name) {
    if(name==="mintNft"){
      this.setState({addAssets:true});
    }
    if(name=="donate"){
      this.setState({donateAssets:true});
    }
    if(name=="accept"){
      this.setState({acceptRequest:true});
    }
    if(name=="fetchInfo"){
      this.setState({fetchInfo:true});
    }
  }
  onLogout = () => {
    this.props.logout();

  };

  render() {
    
    const { user } = this.props.auth;
    console.log(user)
    return (
      <div> 
        <div class="p-5 bg-primary text-white text-center">
          <h1>Online Academy Digital Certificate Issuer</h1>
          <p>Fast and easy way of issuing academic certificates via <i><b>algos</b></i>!!!!!!..</p> 
        </div>
        <Navbar className="navbar navbar-expand-sm bg-dark navbar-dark">
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
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-4">
              <h2>Tutorial</h2>
              <h5>How to use this dapp:</h5>
              <a href="#">
              <div className="fakeimg"><i>link to video tutorial @youtube</i></div>
              </a>
              <p>A simple step by step procedure to issuing/receiving a certificate</p>
              <p><i>staff sitemap</i></p>
              signup &rarr; login &rarr; connect to wallet &rarr; mint nft &rarr;
              monitor nfts &rarr; award trainee by either accepting /rejecting bids &rarr;
              donate algos to outstanding trainee &rarr; logout
              <hr/>
              <p><i>trainee sitemap</i></p>
              signup &rarr; login &rarr; connect to wallet &rarr; request & optin assets &rarr;
              logout
              <hr/> 
              <p><i>admin sitemap</i></p>
              signup &rarr; login &rarr; connect to wallet &rarr; add nft to application &rarr;
              logout

              <h3 className="mt-4">Dashboard</h3>
              <p>Some useful actions that you can perform.</p>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="http://localhost:5000/algorand-wallet-walletconnect-redux">Connect your algo wallet? </a>
                </li>
                <li className="nav-item">
                  <a
                  className="nav-link"
                  onClick={() => this.router('mintNft')}
                  >
                      Mint Nfts
                  </a>
                </li>
                <li className="nav-item">
                  <a
                  type="button"
                  className="nav-link"
                  onClick={() => this.router('donate')}
                  >
                      Donate
                  </a>
                </li>
                <li className="nav-item">
                  <a
                  type="button"
                  className="nav-link"
                  onClick={() => this.router('accept')}
                  >
                      Accept/Reject Request
                  </a>
                </li>
                <li className="nav-item">
                  <a
                  type="button"
                  className="nav-link"
                  onClick={() => this.router('fetchInfo')}
                  >
                      Fetch Info
                  </a>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
              <hr className="d-sm-none"/>

            </div>
            <div class="col-sm-8">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Dec 7, 2020</h5>
      <div class="fakeimg">Fake Image</div>
      <p>Some text..</p>
      <NotesList />
          {
            (user.role === 1)
            ?
            <div>
              {
                (this.state.addAssets)?
                <AddAsset/>
                :(this.state.donateAssets)?
                <DonateAsset/>  
                :(this.state.acceptRequest)?
                <AcceptRequest/>
                :(this.state.fetchInfo)?
                <div>
                  <GetAssetParams/>
                  <GetAssetHoldings/>
                  <GetBalances/>
                </div>
                :
                <p>Awaiting for you to perform an action</p>
              }
              
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
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
            </div>
            </div>
          </div>
         
          
        </Container>
        <div class="mt-5 p-4 bg-dark text-white text-center">
            <p>10Academy Algorand DigitalCertificate Award</p>
          </div>
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
