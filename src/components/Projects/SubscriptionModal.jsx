import React, { useState, useEffect } from 'react';
import Web3 from "web3";

const SubscriptionModal = (props) => {


  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // loadWeb3();
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

      if (walletAddress !== "")
        setWalletAddress("");
      else
        setWalletAddress(accounts[0]);

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

  const { status } = props;

  return (
    <>
      <div className={`subscriptionModal ${status ? "show" : null}`} onClick={() => props.hanldeSubscriptionModal(false)}>
        <div className=" col-md-6 col-lg-4 col-xs-10 col-sm-10">
          <div className={`addprojectModal ${status ? "show" : null}`}>
            <div className="modal-header w-100">
              <h5 className="text-capitalize m-0">Get Subscription</h5>
              <div className="modal-close" onClick={() => props.hanldeSubscriptionModal(false)}>
                <svg class="woox-icon"><use xlinkHref="#icon-error-circle"></use></svg>
              </div>
            </div>
            <div className="modal-body">
              <div className="modalContent">
                <h6 className="mb-3">project title</h6>
                <p className="mb-3 text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                <h6 className="mb-3">Amount : <span className="c-primary ml-2">200 $</span></h6>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <button type="button" className="btn btn--large btn--primary  blacktext">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubscriptionModal
