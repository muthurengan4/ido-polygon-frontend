import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import EthSwap from "../../abis/EthSwap.json";
import { connect } from "react-redux";
import { saveWalletPaymentDetailsStart } from "../store/actions/CryptoWalletAction";
import {
  fetchSubscriptionStart,
  saveSubPaymentCryptoStart,
  fetchMySubscriptionStart,
} from "../store/actions/SubscriptionAction";
import AddToWallet from "./AddToWallet";
import SubscriptionCard from "./SubscriptionCard";
import configuration from "react-global-configuration";
import { authContext } from "../account/auth/AuthProvider";

const SubscriptionIndex = (props) => {
  const [walletAddress, setWalletAddress] = useState("");

  const [loadinBlockchain, setLoadingBlockchain] = useState(true);

  const [loading, setLoading] = useState(true);

  const [account, setAccount] = useState("");

  const [ethBalance, setEthBalance] = useState("");

  const [token, setToken] = useState("");

  const [tokenBalance, setTokenBalance] = useState("");

  const [ethSwap, setEthSwap] = useState("");

  const [output, setOutput] = useState(0);

  const [etherAmountEntered, setEtherAmountEntered] = useState(0);

  const [buttonContentAddWallet, setButtonContentAddWallet] = useState("");

  const [tokenAmount, setTokenAmount] = useState(0);

  const [tokenSymbol, setTokenSymbol] = useState("");

  const { auth } = useContext(authContext);

  // useEffect(() => {
  //   const status = loadWeb3();

  //   props.dispatch(fetchSubscriptionStart());
  //   props.dispatch(fetchMySubscriptionStart());
  // }, []);

  useEffect(() => {
    if(!auth.loading && auth.accounts != ""){
      props.dispatch(fetchSubscriptionStart());
      props.dispatch(fetchMySubscriptionStart());
    }
  }, [auth.accounts , auth.loading]);

  const connectWallet = (event) => {
    // event.preventDefault();
    console.log("clicked");
    isMetaMaskInstalled();
    onClickConnect();
    loadBlockchainData();
  };

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
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Account", accounts[0]);

      if (walletAddress !== "") setWalletAddress("");
      else setWalletAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("Etherum enabled");
      setLoadingBlockchain(false);
      loadBlockchainData();
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setLoadingBlockchain(false);
      loadBlockchainData();
      return true;
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const ethBalance = await web3.eth.getBalance(accounts[0]);
    setEthBalance(ethBalance);

    // Load Token
    const networkId = await web3.eth.net.getId();
    console.log("network", networkId);
    const tokenData = Token.networks[networkId];
    console.log("Token nwtwork", tokenData);
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      setToken(token);
      let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
      let tokenSymbol = await token.methods.symbol().call();
      setTokenSymbol(tokenSymbol);
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

  const addTokenToWallet = (event) => {
    event.preventDefault();
    if (tokenAmount > 0) {
      setButtonContentAddWallet("Adding Token...");
      const finalAmount = (tokenAmount / 1000).toString();
      let etherAmount;
      // etherAmount = finalAmount.toString();
      etherAmount = window.web3.utils.toWei(finalAmount, "Ether");
      console.log("eb", etherAmount);
      buyTokens(etherAmount, tokenAmount);
    } else {
      // Error message
    }
  };

  const buyTokens = (etherAmount) => {
    setLoading(true);
    const data = ethSwap.methods
      .buyTokens()
      .send({ value: etherAmount, from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
        setButtonContentAddWallet("");
        props.dispatch(
          saveWalletPaymentDetailsStart({
            from_wallet_address: account,
            from_payment_id: hash,
            purchased: tokenAmount,
          })
        );
        loadBlockchainData();
        setTokenAmount(0);
      });
  };

  return (
    <>
      <div className="other_page_layouts stackIndexBG" id="stackIndex">
        <section className="main-content-wrapper ">
          <div className="container-fluid">
            {/* {loadinBlockchain ? (
              "Loading your informations..."
            ) : account !== "" ? (
              <>
                <div className="row no-margin">
                  <div className=" col-md-12 col-lg-12 col-xs-12 col-sm-12 center no-padding order-xs-2 ">
                    <div className="subscriptionDetailsWrapper">
                      <div className="modal-header w-100">

                        <div className="row no-margin">
                          <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                            <div className="card-wrapper ">
                              <h3 className="text-capitalize mb-3">
                                Wallet Address
                              </h3>
                              <p className="text-capitalize mb-0 text-no-overflow">
                                {auth.accounts}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                            <div className="card-wrapper ">
                              <h3 className="text-capitalize mb-3">
                              {configuration.get(
                                  "configData.network_token"
                                )} Balance
                              </h3>
                              <p className="text-capitalize mb-0 text-no-overflow">
                                {auth.ethBalance}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                            <div className="card-wrapper">
                              <h3 className="text-capitalize mb-3">
                                {configuration.get(
                                  "configData.currency"
                                )} Token Balance
                              </h3>
                              <p className="text-capitalize mb-0">
                                {auth.BUSDXTokenBalance}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-uppercase mt-3 mb-3">
                          <span className="custom-required text-bold">
                            NOTE{" "}
                          </span>{" "}
                          : {configuration.get(
                                  "configData.lp_convertion_formatted"
                                )}
                        </p>
                      </div>

                      <h3 className="text-center mb-3 mt-3 text-uppercase">
                        The {configuration.get("configData.site_name")}{" "}
                        subscription system
                      </h3>
                      <p className="text-gray text-center">
                        Based on the your subscription plan, you can list your
                        projects.
                      </p>
                      <div className="subscardWrapper">
                        {props.subscriptions.loading
                          ? "Loading data..."
                          : props.subscriptions.data.length > 0
                            ? props.subscriptions.data.map((sub, index) => (
                              
                              <SubscriptionCard
                                index={index}
                                sub={sub}
                                account={account}
                                token={token}
                                tokenBalance={tokenBalance}
                              />
                            ))
                            : "No data found"}
                      </div>
                      {props.mysubscriptions.data.length > 0 && (
                        <>
                          <h3 className="text-capitalize text-center mt-5">
                            My Subscriptions
                          </h3>
                          <div className="subscardWrapper">
                            {props.mysubscriptions.loading
                              ? "Loading data..."
                              : props.mysubscriptions.data.length > 0 &&
                              props.mysubscriptions.data.map((sub, index) => (
                                <div
                                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding "
                                  key={index}
                                >
                                  <div className="crumina-module crumina-pricing-table pricing-table--style1 light-subs-bg sameHeight">
                                    <p className="pricing-title c-primary text-capitalize text-bold">
                                      {sub.subscription_name} (
                                      {sub.amount_formatted})
                                    </p>
                                    <div className="custom-hr"></div>
                                    <div className="custom-stack-details">
                                      <div className="req-wrapper">
                                        <p className="text-center text-capitalize text-bold whitecolor">
                                          validity :
                                          <span className="text-center c-primary font-bold ml-2 text-bold">
                                            {sub.plan_formatted}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="req-wrapper">
                                        <p className="text-center text-capitalize text-bold whitecolor">
                                          Projects :
                                          <span className="text-center c-primary font-bold ml-2 text-bold">
                                            {sub.no_of_projects}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button type="button" onClick={connectWallet}>
                Connect Wallet
              </button>
            )} */}
            <div className="row no-margin">
              <div className=" col-md-12 col-lg-12 col-xs-12 col-sm-12 center no-padding order-xs-2 ">
                <div className="subscriptionDetailsWrapper">
                  <div className="modal-header w-100">
                    <div className="row no-margin">
                      <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                        <div className="card-wrapper ">
                          <h3 className="text-capitalize mb-3">
                            Wallet Address
                          </h3>
                          <p className="text-capitalize mb-0 text-no-overflow">
                            {auth.accounts}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                        <div className="card-wrapper ">
                          <h3 className="text-capitalize mb-3">
                            {configuration.get("configData.network_token")}{" "}
                            Balance
                          </h3>
                          <p className="text-capitalize mb-0 text-no-overflow">
                            {auth.ethBalance}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 no-padding mb-3">
                        <div className="card-wrapper">
                          <h3 className="text-capitalize mb-3">
                            {configuration.get("configData.currency")} Token
                            Balance
                          </h3>
                          <p className="text-capitalize mb-0">
                            {auth.BUSDXTokenBalance}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-uppercase mt-3 mb-3">
                      <span className="custom-required text-bold">NOTE </span> :{" "}
                      {configuration.get("configData.lp_convertion_formatted")}
                    </p>
                  </div>

                  <h3 className="text-center mb-3 mt-3 text-uppercase">
                    The {configuration.get("configData.site_name")} subscription
                    system
                  </h3>
                  <p className="text-gray text-center">
                    Based on the your subscription plan, you can list your
                    projects.
                  </p>
                  <div className="subscardWrapper">
                    {props.subscriptions.loading
                      ? "Loading data..."
                      : props.subscriptions.data.length > 0
                      ? props.subscriptions.data.map((sub, index) => (
                          <SubscriptionCard
                            index={index}
                            sub={sub}
                            account={account}
                            token={token}
                            tokenBalance={tokenBalance}
                          />
                        ))
                      : "No data found"}
                  </div>
                  {props.mysubscriptions.data.length > 0 && (
                    <>
                      <h3 className="text-capitalize text-center mt-5">
                        My Subscriptions
                      </h3>
                      <div className="subscardWrapper">
                        {props.mysubscriptions.loading
                          ? "Loading data..."
                          : props.mysubscriptions.data.length > 0 &&
                            props.mysubscriptions.data.map((sub, index) => (
                              <div
                                className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding "
                                key={index}
                              >
                                <div className="crumina-module crumina-pricing-table pricing-table--style1 light-subs-bg sameHeight">
                                  <p className="pricing-title c-primary text-capitalize text-bold">
                                    {sub.subscription_name} (
                                    {sub.amount_formatted})
                                  </p>
                                  <div className="custom-hr"></div>
                                  <div className="custom-stack-details">
                                    <div className="req-wrapper">
                                      <p className="text-center text-capitalize text-bold whitecolor">
                                        validity :
                                        <span className="text-center c-primary font-bold ml-2 text-bold">
                                          {sub.plan_formatted}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="req-wrapper">
                                      <p className="text-center text-capitalize text-bold whitecolor">
                                        Projects :
                                        <span className="text-center c-primary font-bold ml-2 text-bold">
                                          {sub.no_of_projects}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
const mapStateToPros = (state) => ({
  subscriptions: state.subscriptions.subscription,
  mysubscriptions: state.subscriptions.mySubscription,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(SubscriptionIndex);
