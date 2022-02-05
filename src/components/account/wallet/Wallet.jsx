import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import Token from "../../../abis/Token.json";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { authContext } from "../auth/AuthProvider";


const Wallet = (props) => {
  const [walletAddress, setWalletAddress] = useState("");

  const [loadinBlockchain, setLoadingBlockchain] = useState(true);

  const [loading, setLoading] = useState(false);

  const [account, setAccount] = useState("");

  //const [ethBalance, setEthBalance] = useState("");

  const [token, setToken] = useState("");

  //const [tokenBalance, setTokenBalance] = useState("");

  const [output, setOutput] = useState(0);

  const [etherAmountEntered, setEtherAmountEntered] = useState(0);

  const [submitButtonContent, setSubmitButtonContent] = useState("");

  const [transactionDetails, setTransactionDetails] = useState([]);

  const [buttonContentAddWallet, setButtonContentAddWallet] = useState("");

  const [tokenAmount, setTokenAmount] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Tokens History",
        data: [],
        fill: true,
        backgroundColor: "rgba(255, 186, 0, 0.2)",
        borderColor: "#ffba00",
        borderWidth: 2,
        responsive: true,
        tension: 0.5,
      },
    ],
  });

  const Chart = () => {
    const amountArray = [];

    const dateArray = [];

    transactionDetails.result.length > 0 &&
      transactionDetails.result.map((trans) => {
        amountArray.push(
          parseInt(window.web3.utils.fromWei(trans.value, "Ether")).toFixed(2)
        );
        dateArray.push(formatChartDate(trans.timeStamp));
      });

    setChartData({
      labels: dateArray,
      datasets: [
        {
          label: "Tokens History",
          data: amountArray,
          fill: true,
          backgroundColor: "rgba(255, 186, 0, 0.2)",
          borderColor: "#ffba00",
          borderWidth: 2,
          responsive: true,
          tension: 0.5,
        },
      ],
    });
  };

  // useEffect(() => {
  //   loadWeb3();
  // }, []);

  useEffect(() => {
    if (transactionDetails != "") {
      Chart();
    }
  }, [transactionDetails]);

  const formatDate = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };

  const formatChartDate = (timestamp) => {
    const options = { year: "2-digit", month: "2-digit", day: "numeric" };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //     console.log("Etherum enabled");
  //     setLoadingBlockchain(false);
  //     //loadBlockchainData();
  //     return true;
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //     setLoadingBlockchain(false);
  //     //loadBlockchainData();
  //     return true;
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //     return false;
  //   }
  // };

  // const loadBlockchainData = async () => {
  //   const web3 = window.web3;
  //   console.log("Data started");

  //   // Load Token
  //   const networkId = await web3.eth.net.getId();
  //   const tokenData = Token.networks[networkId];
  //   if (tokenData) {
  //     saveBlockchainDetails(tokenData);
  //     console.log("true");
  //   } else {
  //     changeNetwork();
  //     window.alert("Token contract not deployed to detected network.");
  //   }
  // };

  // const changeNetwork = async () => {
  //   // MetaMask injects the global API into window.ethereum
  //   if (window.ethereum) {
  //     try {
  //       // check if the chain to connect to is installed
  //       await window.ethereum.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers
  //       });
  //       saveBlockchainDetails();
  //     } catch (error) {
  //       // This error code indicates that the chain has not been added to MetaMask
  //       // if it is not, then install it into the user MetaMask
  //       if (error.code === 4902) {
  //         try {
  //           await window.ethereum.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: '0x61',
  //                 rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  //                 chainName: 'Smart Chain - Testnet',
  //                 nativeCurrency: {
  //                   name: 'Binance',
  //                   symbol: 'BNB', // 2-6 characters long
  //                   decimals: 18
  //                 },
  //                 blockExplorerUrls: ['https://testnet.bscscan.com'],
  //               },
  //             ],
  //           });
  //           saveBlockchainDetails();
  //         } catch (addError) {
  //           console.error(addError);
  //         }
  //       }
  //       console.error(error);
  //     }
  //   } else {
  //     // if no window.ethereum then MetaMask is not installed
  //     alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  //   }
  // }

  // const saveBlockchainDetails = async (tokenData) => {

  //   const web3 = window.web3;
  //   const accounts = await web3.eth.getAccounts();
  //   setAccount(accounts[0]);

  //   const ethBalance = await web3.eth.getBalance(accounts[0]);
  //   setEthBalance(ethBalance);

  //   const token = new web3.eth.Contract(Token.abi, tokenContractAddress);
  //   setToken(token);
  //   let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
  //   setTokenBalance(tokenBalance.toString());
  //   console.log("tokenBalance", tokenBalance);
  //   setLoading(false);
  //   getTransactionDetails(accounts[0]);
  // }

  const etherScanAPIKey = configuration.get("configData.ether_api_key");

  const testneturl = configuration.get("configData.crypto_url");

  const tokenContractAddress = configuration.get("configData.contract_address");

  const getTransactionDetails = (accountAddress) => {
    fetch(
      testneturl +
        "/api?module=account&action=tokentx&contractaddress=" +
        tokenContractAddress +
        "&address=" +
        accountAddress +
        "&page=1&offset=100&sort=asc&apikey=" +
        etherScanAPIKey
    )
      .then((response) => response.json())
      .then((data) => setTransactionDetails(data))
      .then(() => setLoading(false))
  };

  const { auth } = useContext(authContext);

  useEffect(() => {
    if(auth.accounts != "" && !auth.loading){
      setLoading(true);
      getTransactionDetails(auth.accounts);
    }
  }, [auth.accounts , auth.loading]);

  
  return (
    <>
      <div id="wallet">
        <h3 className=""></h3>
        <div className="tableHeadingcustom d-flex justify-content-between border-full-overwrite m-3">
          <h4 className="text-bold px-20">Wallet</h4>
          {/* <div>
            <a
              className="btn btn--medium btn--transparent btn--primary text-capitalize"
              href={configuration.get("configData.exchange_url")}
              target="_blank"
            >
              Add Money
            </a>
          </div> */}
        </div>
        <p className="col-12 text-gray m-3">
          <span className="c-primary">Note: </span>You can see your wallet
          address, {configuration.get("configData.network_token")} balance,
          Launch pad token balance here + You can see the transaction
          history(Launch pad token transaction details) Sending, receiving all
          the details. NOTE: We connect etherscan to get the transaction
          details.
        </p>
        <div className="coinsWrapper">
          <div className="row">
            {auth.loading ? (
              <div className="d-flex justify-content-center mt-5 w-100">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 px-xs-0">
                  <div className="singleCoin col-xs-12 col-md-12 col-lg-12 no-padding">
                    <div className="singlecoinWrapper makeit-inline">
                      <div className="wallet-page wallet-address">
                        <h5 className="text-bold c-primary text-capitalize">
                          Wallet Address
                        </h5>
                        <h5 className="mb-0 text-muted account-address">
                          {auth.accounts}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="singleCoin col-xs-12 col-md-12 col-lg-6 no-padding">
                    <div className="singlecoinWrapper">
                      <h5 className="text-bold c-primary text-capitalize">
                        {configuration.get("configData.network_token")} Balance
                      </h5>
                      <p className="mb-0">{auth.ethBalance}</p>
                    </div>
                  </div>
                  <div className="singleCoin col-xs-12 col-md-12 col-lg-6 no-padding">
                    <div className="singlecoinWrapper">
                      <h5 className="text-bold c-primary text-capitalize">
                        {configuration.get("configData.currency")} Token Balance
                      </h5>
                      <p className="mb-0">{auth.BUSDXTokenBalance}</p>
                    </div>
                  </div>
                  {/* <div className="singleCoin col-xs-12 col-md-12 col-lg-6 ">
                    <p className="mt-3 mb-3">
                      {" "}
                      <span className="custom-required text-bold">NOTE</span> :
                      1 Ether = 1000 {configuration.get("configData.currency")}{" "}
                      Token
                    </p>
                  </div> */}
                </div>
                {transactionDetails.result !== undefined && (
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="row no-margin">
                      {/* <div className={`mb-3 mb-xs-0 no-padding ${transactionDetails.result.length > 1 ? "col-lg-6 col-md-6 col-sm-6 col-xs-12" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"}`}>
                      <div className="balanceWrapper mx-xs-0 mt-xs-0 mb-3">
                        <div className="balance mx-xs-0  mb-xs-0">
                          <h4 className="text-capitalize">Balance</h4>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                              <div>
                                <h6>0.554567</h6>
                                <div className="d-flex justify-content-between">
                                  <p className="no-margin">756878.90</p>
                                  <p className="denomination text-bold no-margin">USD</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                              <div className="d-flex h-100 w-100 flex-column justify-content-between align-end">
                                <p className="no-margin">since last month</p>
                                <div className="d-flex justify-content-between">
                                  <p className="denomination text-bold no-margin">+ 356.12 USD (+5.2%)</p>
                                </div>
                              </div>
                            </div>
                            <div className="wallet-progessbar w-100 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="crumina-module crumina-skills-item skills-item--bordered no-margin">
                                <div className="skills-item-meter">
                                  <span className="skills-item-meter-active bg-primary-color" style={{ width: "50%" }}></span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2-5">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                  <div className="incomeWrapper d-flex  align-items-center">
                                    <div className="icon">
                                      <svg class="woox-icon"><use xlinkHref="#icon-arrow-left-line-bottom"></use></svg>
                                    </div>
                                    <div className="content ml-3 w-100">
                                      <h6>Income</h6>
                                      <div className="d-flex justify-content-between w-100">
                                        <p className="no-margin">
                                          0.7565848
                                        </p>
                                        <p className="no-margin denomination text-bold ml-2">
                                          BTC
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                  <div className="expenseWrapper d-flex align-items-center">
                                    <div className="icon">
                                      <svg class="woox-icon"><use xlinkHref="#icon-arrow-left-line-bottom"></use></svg>
                                    </div>
                                    <div className="content ml-3 w-100">
                                      <h6>Expense</h6>
                                      <div className="d-flex justify-content-between w-100">
                                        <p className="no-margin">
                                          0.7565848
                                        </p>
                                        <p className="no-margin denomination text-bold ml-2">
                                          BTC
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                      {transactionDetails.result.length > 1 && (
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 mb-xs-0 no-padding">
                          <div className="chart balanceWrapper mx-xs-0 mt-xs-0 mb-3">
                            <Line data={chartData} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11 px-xs-0">
              {coins.map((name, index) => (
                <div className="singleCoin col-xs-6 col-md-6 col-lg-3 no-padding" key={index}>
                  <div className="singlecoinWrapper">
                    <h4 className="text-bold c-primary text-capitalize">
                      {name}
                    </h4>
                    <div className="d-flex justify-content-between">
                      <h6>0.54446</h6>
                      <h6 className="denomination">BTC</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6>7657.89</h6>
                      <h6 className="denomination ">USD</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-1 no-padding d-flex">
              <div className="addCoinTolist my-3">
                <svg class="woox-icon"><use xlinkHref="#icon-plus-sign"></use></svg>
              </div>
            </div> */}
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 mb-xs-0 px-xs-0">
          <div className="tableHeadingcustom">
            <h4 className="text-al">Transction History</h4>
          </div>
          <div className="customtableWrapper">
            {loading ? (
              <div className="d-flex justify-content-center mt-5">
                <p>Loading...</p>
              </div>
            ) : transactionDetails.result !== undefined ? (
              transactionDetails.result.length > 0 ? (
                <table id="customTable" className="singleProejectsoon">
                  <thead>
                    <tr>
                      <th>Block Number</th>
                      <th>Token Name</th>
                      <th>Token Symbol</th>
                      <th>Amount</th>
                      <th>Gas Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionDetails.result.map((trans) => (
                      <tr>
                        <td>{trans.blockNumber}</td>
                        <td>{trans.tokenName}</td>
                        <td>{trans.tokenSymbol}</td>
                        <td>
                          {parseInt(
                            window.web3.utils.fromWei(trans.value, "Ether")
                          ).toFixed(2)}
                        </td>
                        <td>
                          {window.web3.utils
                            .fromWei(trans.gasPrice, "Ether")
                            .substring(0, 5)}
                        </td>
                        <td>{formatDate(trans.timeStamp)}</td>
                        <td>
                          {trans.confirmations > 0 ? "Complete" : "Pending"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="d-flex justify-content-center mt-5 w-100">
                  <p>No data found.</p>
                </div>
              )
            ) : (
              <div className="d-flex justify-content-center mt-5 w-100">
                <p>Blockchain not loaded.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(Wallet);
