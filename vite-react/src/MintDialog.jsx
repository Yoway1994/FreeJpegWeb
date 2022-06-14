import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ABI from "../../artifacts/contracts/FreeJpeg.sol/FreeJpeg.json"
import { ethers } from "ethers";

const mintNFT = async(_url, _name, _description) => {
  const {ethereum} = window;
  const accounts = await ethereum.request({method: "eth_accounts"});
  const accout = accounts[0];
  const contractAddress = "0x4FFa098616122FD3c4894AA3288D345f540B2fbC"
  const contractABI = ABI.abi;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    contract.safeMint(accout, _url, _name, _description);
  } catch(error) {
    console.log(error);
  }
}

export default function MintDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancelClose = () => {
    setOpen(false);
  };
  const handleMintClose = () => {
    mintNFT(url, name, description)
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}
        sx={{
          "&.MuiButton-text": { color: "#2196f3" },
          border: "2px #2196f3 solid"
        }}
      >
        Mint
      </Button>
      <Dialog open={open} onClose={handleCancelClose}>
        <DialogTitle
        
        >Mint NFT!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If your don't have url of your image, upload it on other online space like imgur.com first!
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e)=>{setUrl(e.target.value)}}
            type = "text"
            label="url link of image"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            onChange={(e)=>{setName(e.target.value)}}
            type = "text"
            label="NFT name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            onChange={(e)=>{setDescription(e.target.value)}}
            type = "text"
            label="description"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <Button onClick={handleMintClose}>Mint</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}