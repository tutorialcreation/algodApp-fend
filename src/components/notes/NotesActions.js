import axios from "axios";
import { toast } from "react-toastify";
import { toastOnError } from "../../utils/Utils";
import { GET_NOTES, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "./NotesTypes";

export const getNotes = () => dispatch => {
  axios
  .get("/api/v1/notes/")
  .then(response => {
      dispatch({
        type: GET_NOTES,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
  };
  
export const addNote = note => dispatch => {
    
 
  axios
    .post("/api/v1/getClient/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("nftPk",response.data.pk)
      localStorage.setItem("clientAddress",response.data.address)
      localStorage.setItem("clientSk",response.data.sk)
      toast.success("successfully generated client details")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const generateNft = note => dispatch => {
    
 
  axios
    .post("/api/v1/genNft/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem('nft_id',response.data.nft_id)
      localStorage.setItem('amount',response.data.amount)
      localStorage.setItem('address',response.data.address)
      localStorage.setItem('sk',response.data.sk)
      toast.success("successfully generated an nft")
    })
    .catch(error => {
      toastOnError(error);
    });
};


export const generateApp = note => dispatch => {
    
 
  axios
    .post("/api/v1/genApp/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem('appID',response.data.appID)
      localStorage.setItem('funder',response.data.funder)
      localStorage.setItem('nftHolder',response.data.nftHolder)
      localStorage.setItem('nftId',response.data.nftId)
      localStorage.setItem('nftAmount',response.data.nftAmount)
      toast.success("successfully generated an application")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const donateAsset = note => dispatch => {
    
 
  axios
    .post("/api/v1/donateAsset/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      toast.success("successfully donated an asset")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const requestAsset = note => dispatch => {
    
 
  axios
    .post("/api/v1/requestAsset/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("bidder_address",response.data.bidder_address)
      toast.success("successfully requested for asset")
    })
    .catch(error => {
      toastOnError(error);
    });
};


export const optIn = note => dispatch => {
    
 
  axios
    .post("/api/v1/optIn/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("bidder",response.data.bidder)
      localStorage.setItem("asset_url",response.data.asset)
      toast.success("successfully opted into asset")
    })
    .catch(error => {
      toastOnError(error);
    });
};


export const acceptRequest = note => dispatch => {
    
 
  axios
    .post("/api/v1/acceptRequest/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("asset_url",response.data.asset)
      toast.success("successfully accepted to release asset")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const getAssetHoldings = note => dispatch => {
    
 
  axios
    .post("/api/v1/getAssetHoldingParams/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("amount", response.data.amount)
      localStorage.setItem("asset-id",response.data['asset-id'])
      localStorage.setItem("is-frozen",response.data['is-frozen'])
      toast.success("successfully retrieved assetholdings")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const getAssetParams = note => dispatch => {
    
 
  axios
    .post("/api/v1/getAssetParams/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("amount", response.data.amount)
      localStorage.setItem("asset-id",response.data['asset-id'])
      localStorage.setItem("is-frozen",response.data['is-frozen'])
      toast.success("successfully retrieved asset status")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const getBalance = note => dispatch => {
    
 
  axios
    .post("/api/v1/getBalances/", note)
    .then(response => {
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      });
      localStorage.setItem("balance", response.data.amount)
      toast.success("successfully retrieved account balance")
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const deleteNote = id => dispatch => {
  axios
    .delete(`/api/v1/notes/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_NOTE,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateNote = (id, note) => dispatch => {
  axios
    .patch(`/api/v1/notes/${id}/`, note)
    .then(response => {
      dispatch({
        type: UPDATE_NOTE,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
