import React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import EthSwap from "../../abis/EthSwap.json";

const BuyToken = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("cheicn1");
    const status = loadWeb3();
    if (status) loadBlockchainData();
    else console.log("Some shit happening. ");
  }, []);

  const loadWeb3 = async () => {
    console.log("checking...");
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
  };

  const [account, setAccount] = useState("");

  const [ethBalance, setEthBalance] = useState("");

  const [token, setToken] = useState("");

  const [tokenBalance, setTokenBalance] = useState("");

  const [ethSwap, setEthSwap] = useState("");

  const [output, setOutput] = useState(0);

  const [etherAmountEntered, setEtherAmountEntered] = useState(0);

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const ethBalance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(ethBalance);

    // Load Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      setToken(token);
      let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
      setTokenBalance(tokenBalance.toString());
    } else {
      window.alert("Token contract not deployed to detected network.");
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      console.log("Token address", ethSwapData.address);
      setEthSwap(ethSwap);
    } else {
      window.alert("EthSwap contract not deployed to detected network.");
    }

    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let etherAmount;
    // etherAmount = etherAmountEntered.toString();
    etherAmount = window.web3.utils.toWei(etherAmountEntered, "Ether");
    buyTokens(etherAmount);
  };

  const buyTokens = (etherAmount) => {
    setLoading(true);
    ethSwap.methods
      .buyTokens()
      .send({ value: etherAmount, from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <form className="mb-3" onSubmit={handleSubmit}>
          <div>
            <label className="float-left">
              <b>Input</b>
            </label>
            <span className="float-right text-muted">
              Balance:{" "}
              {window.web3.utils.fromWei(ethBalance, "Ether").substring(0, 5)}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const etherAmount = event.currentTarget.value.toString();
                setOutput(etherAmount * 100);
                setEtherAmountEntered(etherAmount);
              }}
              className="form-control form-control-lg"
              placeholder="0"
              required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src="" height="32" alt="" />
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div>
            <label className="float-left">
              <b>Output</b>
            </label>
            <span className="float-right text-muted">
              Balance:{" "}
              {window.web3.utils.fromWei(tokenBalance, "Ether").substring(0, 5)}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src="" height="32" alt="" />
                &nbsp; CGT
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 ETH = 100 CGT</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            SWAP!
          </button>
        </form>
      )}
    </>
  );
};

export default BuyToken;
