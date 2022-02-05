import React, { useState, useEffect } from 'react';
import Web3 from "web3";

const ConnectWallet = () => {

 const [walletAddress, setWalletAddress] = useState("");

 useEffect(() => {
  loadWeb3();
 }, []);

 const handleWallet = (event) => {
  // event.preventDefault();
  console.log("clicked");
  loadWeb3();
  isMetaMaskInstalled();
  onClickConnect();
 }

 //Created check function to see if the MetaMask extension is installed
 const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  console.log("Ssome");
  return Boolean(ethereum && ethereum.isMetaMask);
 };

 //------Inserted Code------\\
 const MetaMaskClientCheck = () => {
  //Now we check to see if MetaMask is installed
  if (!isMetaMaskInstalled()) {
   //If it isn't installed we ask the user to click to install it
   window.alert(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
   );
  } else {
   //If it is installed we change our button text
   return true;
  }
 };

 const onClickConnect = async () => {
  try {
   const { ethereum } = window;
   // Will open the MetaMask UI
   // You should disable this button while the request is pending!
   await ethereum.request({ method: 'eth_requestAccounts' });
   const accounts = await ethereum.request({ method: 'eth_accounts' });
   console.log("Account", accounts[0]);

   if (walletAddress !== "") {
    setWalletAddress("");
   }
   else {
    setWalletAddress(accounts[0]);
    localStorage.setItem("WalletAddress", accounts[0]);
   }

   // const web3 = window.web3;
   // // Load account
   // const accounts = await web3.eth.getAccounts();
   // console.log("Account", accounts[0]);
   // // Network ID
   // const networkId = await web3.eth.net.getId();
   // console.log("Netword ID", networkId);


  } catch (error) {
   console.error(error);
  }
 };




 const loadWeb3 = async () => {
  if (window.ethereum) {
   window.web3 = new Web3(window.ethereum);
   await window.ethereum.enable();
   console.log("Etherum enabled");
   return true;

  } else if (window.web3) {
   window.web3 = new Web3(window.web3.currentProvider);
   return true;
  } else {
   window.alert(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
   );
   return false;
  }
 }

 const removeWalletAddress = () => {
  localStorage.removeItem("WalletAddress");
 }

 return (
  <>
   <div className="other_page_layouts stackIndexBG" id="stackIndex">
    <section className="main-content-wrapper ">
     <div className="container-fluid">
      {localStorage.getItem("WalletAddress") == null ?
       <button
        type="submit"
        className="btn-continue"
        onClick={handleWallet}
       >
        {walletAddress !== "" ? walletAddress : "Connect"}
       </button>
       :
       <button
        type="submit"
        className="btn-continue"
        onClick={removeWalletAddress}
       >
        {localStorage.getItem("WalletAddress")} - Remove Wallet
       </button>
      }
     </div>
    </section>
   </div>
  </>
 );
}

export default ConnectWallet;