import './App.css';
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import MintDialog from './MintDialog';
import NoWallet from './NoWallet'

const App = () => {
  const {ethereum} = window;
  if (!ethereum) {
    return(NoWallet());
  }
  //
  const [currentNetwork, setCurrentNetwork] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  //
  const checkIfWalletIsConnected = async () => {
    try {
      const accounts = await ethereum.request({method: "eth_accounts"});
      if (accounts.length != 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch(error) {
      console.log(error);
    }
  } 
  const connectWallet = async() => {
    try {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
	    if (accounts.length != 0) {
		    setCurrentAccount(accounts[0]);
	    }
    } catch(error) {
      console.log(error);
    }
  }
  const checkIfConnectToRinkeby = async() => {
    if(ethereum.networkVersion != 4) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: "0x4"}],
        });
      } catch(error) {
        setCurrentNetwork(ethereum.networkVersion);
      }
    } else {
      setCurrentNetwork(ethereum.networkVersion);
      console.log("connected to Rinkeby")
    };
  }
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfConnectToRinkeby();
  }, [])

  let connectButton;
  let mintButton = MintDialog();
  if (currentAccount) {
    connectButton = <Button 
                    sx={{
                      "&.MuiButton-text": { color: "white" },
                      border: "3px white solid"
                    }} variant="text">  
                    {currentAccount.slice(0, 5)}
                    ...
                    {currentAccount.slice(-3)}
                    </Button>;
	} else {
		connectButton = <Button onClick={connectWallet} 
                    sx={{
                      "&.MuiButton-text": { color: "white" },
                      border: "3px white solid"
                    }} variant="text">
                    Connet Wallet
                    </Button>;
    mintButton = <p>Connet or install your MetaMask wallet first</p>;
	}
  const switchButton = <Button onClick={checkIfConnectToRinkeby}>
                        Switch to Rinkeby
                       </Button>
  return (
    <div className="mainContainer">
      <div className="header">Mint Free NFT on Rinkeby</div>
      <br/>
      <div className="context">
        The smart contract is currently deployed on Rinkeby testnet.<br/>
        <br/>
        <a>Get testing ETH on </a>
        <a href = "https://www.rinkebyfaucet.com/">Rinkeby faucet website</a>
        <a> to mint free NFT.</a>
      </div>
      <br/>
      <div className="connectButton">
        {connectButton}
      </div>
      <div className="mintButton"> 
          {(currentNetwork == 4)? (mintButton) : (switchButton)}
      </div>
      <div>
        <br/>
        <a>Check your NFT on </a>
        <a href="https://testnets.opensea.io/account">testnet OpenSea</a>
        <a>, may wait a few minutes to show up.</a>
      </div>
    </div>
  );
}

export default App;