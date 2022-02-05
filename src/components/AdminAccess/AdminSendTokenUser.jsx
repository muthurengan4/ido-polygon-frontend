import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import EthSwap from "../../abis/EthSwap.json";
import { connect } from "react-redux";
import { saveSubPaymentCryptoStart } from "../store/actions/SubscriptionAction";
import { useParams } from "react-router";
import { getErrorNotificationMessage } from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { projectInvestmentClaimStart } from "../store/actions/ProjectActions";
import configuration from "react-global-configuration";

const AdminSendTokenUser = (props) => {
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

  const [buttonContent, setButtonContent] = useState("");

  const [buttonContentAddWallet, setButtonContentAddWallet] = useState("");

  const [tokenAmount, setTokenAmount] = useState(0);

  const [apiResponse, setApiResponse] = useState("");

  const [displayDetails, setDisplayDetails] = useState(false);

  const [validatingContent, setValidatingContent] = useState("");

  const [tokenSymbol, setTokenSymbol] = useState("");

  useEffect(() => {
    // const status = loadWeb3();
    fetchDetails();
    setValidatingContent("Validating... Please wait...");
  }, []);

  const { id } = useParams();

  const fetchDetails = async () => {
    const inputData = { valid_token: id };
    await fetch(
      "https://admin.polysparker.com/api/user/projects_investment_token_validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setDisplayDetails(true);
          setApiResponse(data);
          loadWeb3(data.data.contract_address);
        } else {
          const notificationMessage = getErrorNotificationMessage(
            "Error, Please try again..."
          );
          props.dispatch(createNotification(notificationMessage));
          setValidatingContent("Error, Please try again...");
          return false;
        }
      })
      .catch((error) => {
        console.log("error", error);
        return false;
      });
  };

  const loadWeb3 = async (contract_address) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("Etherum enabled");
      setLoadingBlockchain(false);
      loadBlockchainData(contract_address);
      return true;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setLoadingBlockchain(false);
      loadBlockchainData(contract_address);
      return true;
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  };

  const loadBlockchainData = async (contract_address) => {
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
      const token = new web3.eth.Contract(Token.abi, contract_address);
      setToken(token);
      let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
      let tokenSym = await token.methods.symbol().call();

      setTokenSymbol(tokenSym);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const web3 = new Web3(window.ethereum);

    // Decimal
    const decimals = web3.utils.toBN(apiResponse.data.decimal_points);

    // Amount of token
    const tokenAmount = web3.utils.toBN(apiResponse.data.no_of_tokens);

    // Amount as Hex - contract.methods.transfer(toAddress, tokenAmountHex).encodeABI();
    const tokenAmountHex =
      "0x" + tokenAmount.mul(web3.utils.toBN(10).pow(decimals)).toString("hex");

    // const NumberOfToken = (apiResponse.no_of_tokens * 10 ** 18).toString();

    setButtonContent(
      "Send " +
        configuration.get("configData.currency") +
        " Token to LaunchPad..."
    );
    const sendTokenToAddress = await token.methods
      .approve(account, tokenAmountHex)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        console.log("Approve hash", hash);
        token.methods
          .transferFrom(
            account,
            apiResponse.data.wallet_address,
            tokenAmountHex
          )
          .send({
            from: account,
          })
          .on("transactionHash", (hash) => {
            console.log("Loading the transaction....", hash);
            setButtonContent("");
            props.dispatch(
              projectInvestmentClaimStart({
                invested_project_id: apiResponse.data.invested_project_id,
                claim_payment_id: hash,
                claim_wallet_address: apiResponse.data.wallet_address,
                project_id: apiResponse.data.project_id,
              })
            );
          });
      });
    console.log("sendTokenToAddress", sendTokenToAddress);
  };

  return (
    <>
      <div className="other_page_layouts stackIndexBG" id="stackIndex">
        <section className="main-content-wrapper ">
          <div className="container-fluid">
            {!displayDetails ? (
              validatingContent
            ) : loadinBlockchain ? (
              "Loading Blockchain..."
            ) : account !== "" ? (
              <>
                <div className="row no-margin">
                  <div className=" col-md-7 col-lg-7 col-xs-12 col-sm-12 center no-padding">
                    <div className="subscriptionDetailsWrapper">
                      <div className="modal-header w-100">
                        <div className="card-wrapper">
                          <h6 className="text-capitalize mb-3">
                            Wallet Address
                          </h6>
                          <p className="text-capitalize mb-0 text-no-overflow">
                            {account}
                          </p>
                        </div>
                        <div className="row no-margin">
                          <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 no-padding">
                            <div className="card-wrapper give-margin-rigt">
                              <h6 className="text-capitalize mb-3">
                                Ether Balance
                              </h6>
                              <p className="text-capitalize mb-0 text-no-overflow">
                                {window.web3.utils
                                  .fromWei(ethBalance, "Ether")
                                  .substring(0, 5)}
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 no-padding">
                            <div className="card-wrapper">
                              <h6 className="text-capitalize mb-3">
                                {tokenSymbol} Token Balance
                              </h6>
                              <p className="text-capitalize mb-0">
                                {window.web3.utils
                                  .fromWei(tokenBalance, "Ether")
                                  .substring(0, 5)}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <p className="text-uppercase mt-3 mb-3"><span className="custom-required text-bold">NOTE </span> : 1 Ether = 1000 CGPL Token</p> */}
                        <div className="w-100 d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn--large btn--primary  blacktext"
                            onClick={handleSubmit}
                            disabled={buttonContent !== "" ? true : false}
                          >
                            {buttonContent !== ""
                              ? buttonContent
                              : "Send Token"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </>
  );
};
const mapStateToPros = (state) => ({
  subscriptions: state.subscriptions.subscription,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(AdminSendTokenUser);
