import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addNote } from "./NotesActions";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

class AddAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      asset_url:"",
      nft_pk:0,
      nft_amount:0,
      unit_name:"",
      asset_name:"",
      note:""
    };
  }
  getAccessToken () {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'
  
    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.WEB3STORAGE_TOKEN
  }
  
  makeStorageClient () {
    return new Web3Storage({ token: "" })
  }
  getFiles () {
    const fileInput = document.querySelector('input[type="file"]')
    return fileInput.files
  }
  storeWithProgress = (e) =>{
    const files = [e.target.files[0]]
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
      console.log('uploading files with cid:', cid)
      const asset_url = "https://"+cid+".ipfs.dweb.link"
      this.setState({asset_url:asset_url})
      console.log(asset_url)
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0
  
    const onStoredChunk = size => {
      uploaded += size
      const pct = totalSize / uploaded
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = this.makeStorageClient()
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    
    console.log(this.state.asset_url)
    return client.put(files, { onRootCidReady, onStoredChunk })
    
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const user = localStorage.getItem("user")
    const username = JSON.parse(user).username;
    console.log(username)
    const note = {
      username: username
    };
    this.props.addNote(note);
  };

  render() {
    return (
      <div>
        <h2>Generate NFt</h2>
        <Form>
          <Form.Group controlId="contentId">
            
            <Form.Label>Nft amount</Form.Label>
            <Form.Control
              name="nft_amount"
              value={this.nft_amount}
              placeholder="Enter nft amount"

            />
            <Form.Label>Unit Name</Form.Label>
            <Form.Control
              name="unit_name"
              value={this.unit_name}
              placeholder="Enter unit name"
            />
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              name="asset_name"
              value={this.asset_name}
              placeholder="Enter asset name"
            />
            <Form.Label>Asset</Form.Label>
            <Form.File
            onChange={this.storeWithProgress}
            />
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              placeholder="Enter note"
              value={this.note}
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Generate Nft
        </Button>
      </div>
    );
  }
}

AddAsset.propTypes = {
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addNote })(withRouter(AddAsset));
