import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SingleProjectDetails from "./SingleProjectDetails";
import {
  fetchSingleProjectStart,
  saveInvestmentTransStart,
  stakeTransactionStart,
  unStackTransactionStart,
  userSubEligiableStart,
} from "../store/actions/ProjectActions";
import { connect } from "react-redux";
import Web3 from "web3";
import Token from "../../abis/Token.json";
import StakingPool from "../../abis/StakingPool.json";
import BuyProjectToken from "./BuyProjectToken";
import StackModal from "./StackModal";
import UnstakeTokens from "./UnstakeTokens";
import configuration from "react-global-configuration";
import Countdown from "react-countdown";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { authContext } from "../account/auth/AuthProvider";
import RewardStaking from "../../abis/RewardStaking.json";
import ConnectWalletModal from "../account/auth/ConnectWalletModal";
import { formatEther } from "@ethersproject/units";
import {clearStakeRoundCheckData} from "../store/actions/StakeUnstakeAction"

const SingleProjectIndex = (props) => {
  const { id } = useParams();

  const { singleProject } = props;

  const { auth, getBalance } = useContext(authContext);

  useEffect(() => {
    props.dispatch(fetchSingleProjectStart({ project_unique_id: id }));
    //loadWeb3();
    window.web3 = new Web3(window.ethereum);
  }, []);

  const [allocationCountdown, setAllocationCountdown] = useState(0);

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

  const [buttonContentSubscription, setButtonContentSubscription] =
    useState("");

  const [buttonContentBuyProToken, setButtonContentBuyProToken] = useState("");

  const [tokenAmount, setTokenAmount] = useState(0);

  const [stakeModalStatus, setStakeModalStatus] = useState(false);

  const [unstakeModalStatus, setUnstakeModalStatus] = useState(false);

  const [stakingPool, setStakingPool] = useState("");

  const [stakingPoolDetails, setStakingPoolDetails] = useState({
    totalstakingBalance: "0",
    stakingBalance: "0",
  });

  const [rewardStakingData, setRewardStakingData] = useState({
    totalstakingBalance: "0",
    stakingBalance: "0",
  });

  const [rewardStaking, setRewardStaking] = useState("");

  const [stakeAmount, setStakeAmount] = useState("0");
  const [stakeButton, setStakeButton] = useState("");

  const [unStakeAmount, setUnStakeAmount] = useState("0");
  const [unStakeButton, setUnStakeButton] = useState("");

  const [poolContractAddress, setPoolContractAddress] = useState("");

  const [connectWalletModalStatus, setConnectWalletModalStatus] =
    useState(false);

  const handleConnectWalletClose = () => setConnectWalletModalStatus(false);
  const handleConnectWalletOpen = () => setConnectWalletModalStatus(true);

  const connectWalletWrapper = () => {
    handleConnectWalletOpen();
    // const projectEndTime = new Date(props.singleProject.data.project.end_time);
    // console.log("projectEndTime" + projectEndTime);
    // const currentTime = new Date();
    // console.log("currentTime" + currentTime);

    // let result = Math.ceil(
    //   (projectEndTime.getTime() - currentTime.getTime()) / 1000
    // );
    // setAllocationCountdown(result * 1000);
  };

  const getRewardStakingData = async () => {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    const rewardStakingPool = RewardStaking.networks[networkId];
    if (rewardStakingPool) {
      const rewardStaking = new web3.eth.Contract(
        RewardStaking.abi,
        rewardStakingPool.address
      );
      console.log("Reward address", rewardStakingPool.address);
      setRewardStaking(rewardStaking);

      console.log("name", await rewardStaking.methods.name().call());

      let stakingBalance = await rewardStaking.methods
        .balanceOf(auth.accounts)
        .call();

      console.log("Staking Balance", stakingBalance);

      let totalstakingBalance = await rewardStaking.methods
        .totalSupply()
        .call();

      console.log("Total supple", totalstakingBalance);

      let rewardRate = await rewardStaking.methods.rewardRate().call();

      console.log("Reward rate", rewardRate);

      let numberOfStakers = await rewardStaking.methods
        .numberOfStakers()
        .call();

      console.log("numberOfStakers", numberOfStakers);

      let rewardAmount = await rewardStaking.methods
        .earned(auth.accounts)
        .call();
      console.log(
        "Reward amount",
        window.web3.utils.fromWei(rewardAmount, "Ether")
      );

      setRewardStakingData({
        ...rewardStakingData,
        totalstakingBalance: totalstakingBalance.toString(),
        stakingBalance: stakingBalance.toString(),
        rewardAmount: rewardAmount.toString(),
        rewardRate: rewardRate,
        numberOfStakers: numberOfStakers,
      });
      console.log("Staking poll", rewardStaking._address);
    } else {
      window.alert("rewardStaking contract not deployed to detected network.");
    }
  };

  const getStatkingPoolData = async () => {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    const stakingPoolData = StakingPool.networks[networkId];
    if (stakingPoolData) {
      const stakingPool = new web3.eth.Contract(
        StakingPool.abi,
        // "0x25704ec20ca19909a6e17209ce4104d45c97df97"
        props.singleProject.loading
          ? ""
          : props.singleProject.data.project.pool_contract_address
      );
      setStakingPool(stakingPool);
      console.log(
        "stakin",
        props.singleProject.data.project.pool_contract_address
      );

      console.log("name", await stakingPool.methods.name().call());

      let stakingBalance = await stakingPool.methods
        .stakingBalance(auth.accounts)
        .call();

      console.log("Staking bal in staking contract", stakingBalance);

      let totalstakingBalance = await stakingPool.methods
        .totalStakeBalance()
        .call();

      console.log("total staking balance", totalstakingBalance);

      // unstakers
      let unStakedUserDetails = await stakingPool.methods
        .unStakedUserDetails(auth.accounts)
        .call();
      console.log(" unStakedUserDetails ", unStakedUserDetails.toString());

      setStakingPoolDetails({
        ...stakingPoolDetails,
        totalstakingBalance: totalstakingBalance.toString(),
        stakingBalance: stakingBalance.toString(),
      });
      console.log("Staking poll", stakingPool._address);
    } else {
      window.alert("stakingPool contract not deployed to detected network.");
    }
  };

  useEffect(() => {
    if (!auth.loading && auth.accounts != "" && !props.singleProject.loading) {
      getStatkingPoolData(auth.accounts);
      getRewardStakingData();
      setStakeModalStatus(false);
      setUnstakeModalStatus(false);
    }
  }, [auth.loading, auth.accounts, props.singleProject.data]);

  useEffect(() => {
    // Api call
    if (
      !auth.loading &&
      auth.accounts != null &&
      props.singleProject.data.project &&
      stakingPoolDetails.totalstakingBalance
    ) {
      props.dispatch(
        userSubEligiableStart({
          project_unique_id: props.singleProject.data.project.project_unique_id,
          staked_tokens: window.web3.utils.fromWei(
            rewardStakingData.stakingBalance,
            "Ether"
          ),
          project_tokens_staked: window.web3.utils.fromWei(
            stakingPoolDetails.stakingBalance,
            "Ether"
          ),
          busdx_tokens: auth.BUSDXTokenBalance,
        })
      );
    }
  }, [stakingPoolDetails.stakingBalance, rewardStakingData.stakingBalance]);

  const [buyProjectTokenModel, setBuyProjectTokenModel] = useState(false);

  const handleBuyProjectTokenModal = (status) => {
    setBuyProjectTokenModel(status);
  };

  // Stake Tokens.
  const stakeTokens = (amount) => {
    setStakeButton("Processing...");
    let stakingAllowStatus = false;

    if (
      window.web3.utils.fromWei(
        stakingPoolDetails.totalstakingBalance,
        "Ether"
      ) <= singleProject.data.project.ido_tokens
    ) {
      if (props.userSubEli.data.success == true) {
        if (props.userSubEli.data.data.subscription_round == 1) {
          if (amount <= props.userSubEli.data.data.remaining_tokens) {
            stakingAllowStatus = true;
          } else {
            let notificationMessage = getErrorNotificationMessage(
              "Amount is extended. Your eligible to stake " +
                props.userSubEli.data.data.remaining_tokens
            );
            props.dispatch(createNotification(notificationMessage));
            setStakeButton("");
            props.dispatch(clearStakeRoundCheckData())
            handleStakeTokenModal(false);
            return false;
          }
        } else if (props.userSubEli.data.data.subscription_round == 2) {
          if (amount <= Number(configuration.get("configData.max_stake_token")) && amount <= Number(props.userSubEli.data.data.remaining_tokens)) {
            stakingAllowStatus = true;
          } else {
            let notificationMessage = getErrorNotificationMessage(
              "Amount is extended. Your eligible to stake " +
              props.userSubEli.data.data.remaining_tokens
            );
            props.dispatch(createNotification(notificationMessage));
            props.dispatch(clearStakeRoundCheckData())
            setStakeButton("");
            handleStakeTokenModal(false);
            return false;
          }
        } else {
          let notificationMessage = getErrorNotificationMessage(
            "Please try after sometime.."
          );
          props.dispatch(createNotification(notificationMessage));
          setStakeButton("");
          props.dispatch(clearStakeRoundCheckData())
          handleStakeTokenModal(false);
          return false;
        }
      } else {
        let notificationMessage = getErrorNotificationMessage(
          "Your not eligible for Staking.."
        );
        props.dispatch(createNotification(notificationMessage));
        setStakeButton("");
        props.dispatch(clearStakeRoundCheckData())
        handleStakeTokenModal(false);
        return false;
      }
      if (stakingAllowStatus) {
        let _amount = amount.toString();
        _amount = window.web3.utils.toWei(_amount, "Ether");

        setLoading(true);
        auth.BUSDTokenData.methods
          .approve(stakingPool._address, _amount)
          .send({ from: auth.accounts })
          .on("receipt", (receipt) => {
            stakingPool.methods
              .stakeTokens(_amount)
              .send({ from: auth.accounts })
              .once("receipt", (receipt) => {
                getStatkingPoolData(auth.accounts);
                getRewardStakingData();
                getBalance();
                props.dispatch(
                  stakeTransactionStart({
                    amount: _amount,
                    transaction_id: receipt.transactionHash,
                    wallet_address: auth.accounts,
                    project_id: props.singleProject.data.project.project_id,
                    subscription_round: props.userSubEli.data.data ? props.userSubEli.data.data.subscription_round : 1,
                  })
                );
                let notificationMessage = getSuccessNotificationMessage(
                  "Staked token successfully..."
                );
                props.dispatch(createNotification(notificationMessage));
                setLoading(false);
                setStakeButton("");
                handleStakeTokenModal(false);
                props.dispatch(clearStakeRoundCheckData())
                //loadBlockchainData();
              })
              .on("error", (error) => {
                let notificationMessage;
                if (error.message == undefined) {
                  notificationMessage = getErrorNotificationMessage(
                    "Unexpected error occuried, Please try again..."
                  );
                } else {
                  notificationMessage = getErrorNotificationMessage(
                    error.message
                  );
                }
                props.dispatch(createNotification(notificationMessage));
                props.dispatch(clearStakeRoundCheckData())
                setStakeButton("");
                handleStakeTokenModal(false);
              });
          })
          .on("error", (error) => {
            let notificationMessage;
            if (error.message == undefined) {
              notificationMessage = getErrorNotificationMessage(
                "Unexpected error occuried, Please try again..."
              );
            } else {
              notificationMessage = getErrorNotificationMessage(error.message);
            }
            props.dispatch(createNotification(notificationMessage));
            setStakeButton("");
            props.dispatch(clearStakeRoundCheckData())
            handleStakeTokenModal(false);
          });
      }
    } else {
      let notificationMessage = getSuccessNotificationMessage(
        "Staking is completed. You can't stake now."
      );
      props.dispatch(createNotification(notificationMessage));
      setStakeButton("");
      handleStakeTokenModal(false);
    }
  };

  // Unstake Tokens.
  const unstakeTokens = (amount) => {
    setUnStakeButton("processing...");
    if (stakingPoolDetails.stakingBalance > 0) {
      let _amount = amount.toString();
      _amount = window.web3.utils.toWei(_amount, "Ether");
      setLoading(true);
      auth.BUSDTokenData.methods
        .approve(stakingPool._address, _amount)
        .send({ from: auth.accounts })
        .on("receipt", (receipt) => {
          stakingPool.methods
            .unstakeTokens(_amount)
            .send({ from: auth.accounts })
            .on("receipt", (receipt) => {
              setLoading(false);
              getRewardStakingData();
              getStatkingPoolData(auth.accounts);
              getBalance();
              props.dispatch(
                unStackTransactionStart({
                  amount: _amount,
                  transaction_id: receipt.transactionHash,
                  wallet_address: auth.accounts,
                  project_id: props.singleProject.data.project.project_id,
                })
              );
              let notificationMessage = getSuccessNotificationMessage(
                "Unstaked token successfully..."
              );
              props.dispatch(createNotification(notificationMessage));
              setUnStakeButton("");
              handleUnstakeTokenModal(false);
              //loadBlockchainData();
            })
            .on("error", (error) => {
              let notificationMessage;
              if (error.message == undefined) {
                notificationMessage = getErrorNotificationMessage(
                  "Unexpected error occuried, Please try again..."
                );
              } else {
                notificationMessage = getErrorNotificationMessage(
                  error.message
                );
              }
              props.dispatch(createNotification(notificationMessage));
              setUnStakeButton("");
              handleUnstakeTokenModal(false);
            });
        })
        .on("error", (error) => {
          let notificationMessage;
          if (error.message == undefined) {
            notificationMessage = getErrorNotificationMessage(
              "Unexpected error occuried, Please try again..."
            );
          } else {
            notificationMessage = getErrorNotificationMessage(error.message);
          }
          props.dispatch(createNotification(notificationMessage));
          setUnStakeButton("");
          handleUnstakeTokenModal(false);
        });
    } else {
      let notificationMessage = getSuccessNotificationMessage(
        "You haven't staked any.."
      );
      props.dispatch(createNotification(notificationMessage));
      setUnStakeButton("");
      handleUnstakeTokenModal(false);
    }
  };

  const handleStakeTokenModal = (status) => {
    setStakeModalStatus(status);
    if (status) {
      document.getElementById("site-header").classList.add("hide-navbar-below");
    } else {
      document
        .getElementById("site-header")
        .classList.remove("hide-navbar-below");
    }
  };

  const handleUnstakeTokenModal = (status) => {
    setUnstakeModalStatus(status);
    if (status) {
      document.getElementById("site-header").classList.add("hide-navbar-below");
    } else {
      document
        .getElementById("site-header")
        .classList.remove("hide-navbar-below");
    }
  };

  useEffect(() => {
    if (stakeModalStatus) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [stakeModalStatus]);

  useEffect(() => {
    if (unstakeModalStatus) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [unstakeModalStatus]);

  return (
    <>
      <div className="other_page_layouts StakeIndexBG" id="singleProject">
        <section className="main-content-wrapper ">
          <div className="container-fluid">
            {singleProject.loading ? (
              "Loading..."
            ) : (
              <>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
                  <div className="singleProjectCard">
                    <div className="row w-100 no-margin">
                      <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 no-padding pr-lg-3">
                        <div className="singleProject-left-wrapper">
                          <div className="card-header">
                            <img
                              src={singleProject.data.project.picture}
                              alt={singleProject.data.project.name}
                            />
                            <div className="social-contents">
                              <h4 className="">
                                {singleProject.data.project.name}
                              </h4>
                              <div className="social-icons">
                                {singleProject.data.project.facebook_link && (
                                  <a
                                    target="_blank"
                                    href={
                                      singleProject.data.project.facebook_link
                                    }
                                  >
                                    <i className="fab fa-facebook woox-icon"></i>
                                  </a>
                                )}
                                {singleProject.data.project.telegram_link && (
                                  <a
                                    target="_blank"
                                    href={
                                      singleProject.data.project.telegram_link
                                    }
                                  >
                                    <i className="fab fa-telegram woox-icon"></i>
                                  </a>
                                )}
                                {singleProject.data.project.twitter_link && (
                                  <a
                                    target="_blank"
                                    href={singleProject.twitter_link}
                                  >
                                    <i className="fab fa-twitter woox-icon"></i>
                                  </a>
                                )}
                                {singleProject.data.project.website && (
                                  <a
                                    target="_blank"
                                    href={singleProject.data.project.website}
                                  >
                                    <i className="fab fa-dribbble woox-icon"></i>
                                  </a>
                                )}
                                {singleProject.data.project.medium_link && (
                                  <a
                                    target="_blank"
                                    href={
                                      singleProject.data.project.medium_link
                                    }
                                  >
                                    <i className="fab fa-medium woox-icon"></i>
                                  </a>
                                )}
                              </div>
                              {singleProject.data.project.publish_status ==
                              "opened" ? (
                                <div className="statusWrapper open  ">
                                  <div className="dot open"></div>
                                  <p className="mb-0 text-capitalize">
                                    {
                                      singleProject.data.project
                                        .publish_status_formatted
                                    }
                                  </p>
                                </div>
                              ) : singleProject.data.project.publish_status ==
                                "closed" ? (
                                <div className="statusWrapper close  ">
                                  <div className="dot close"></div>
                                  <p className="mb-0 text-capitalize">
                                    {
                                      singleProject.data.project
                                        .publish_status_formatted
                                    }
                                  </p>
                                </div>
                              ) : (
                                <div className="statusWrapper scheduled  ">
                                  <div className="dot scheduled"></div>
                                  <p className="mb-0 text-capitalize">
                                    {
                                      singleProject.data.project
                                        .publish_status_formatted
                                    }
                                  </p>
                                </div>
                              )}
                              <div className="symbolWrapper">
                                {singleProject.data.project.token_symbol}
                              </div>
                            </div>
                          </div>
                          <div className="desc margin-1em">
                            <p className="mb-3">
                              {singleProject.data.project.description}
                            </p>
                          </div>
                          {auth.authStatus &&
                          singleProject.data.project.publish_status ==
                            "opened" ? (
                            <>
                              <div className="card-wrapper">
                                <h6 className="text-capitalize mb-3">
                                  Wallet Address
                                </h6>
                                <p className="text-capitalize mb-0 text-no-overflow">
                                  {auth.accounts}
                                </p>
                                {!props.userSubEli.loading && props.userSubEli.data.data ? 
                                props.userSubEli.data.data.subscription_round == 1 ? (
                                  <>
                                    <h6 className="text-capitalize mt-3 mb-3">
                                      Tier: {props.userSubEli.data.data.subscription && (props.userSubEli.data.data.subscription.title) }
                                    </h6>
                                    <h6 className="text-capitalize mb-3">
                                      Round 1 Closes in
                                    </h6>
                                    <p className="text-capitalize mb-0 text-no-overflow">
                                      <Countdown
                                        date={
                                          props.singleProject.data.project
                                            .round_2_start_time
                                        }
                                        intervalDelay={0}
                                        precision={3}
                                        renderer={(props) => (
                                          <div>
                                            {props.days} Days {props.hours}{" "}
                                            Hours {props.minutes} Minutes{" "}
                                            {props.seconds} Seconds
                                          </div>
                                        )}
                                      />
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <h6 className="text-capitalize mb-3">
                                      Round 2 Closes in
                                    </h6>
                                    <p className="text-capitalize mb-0 text-no-overflow">
                                      <Countdown
                                        date={
                                          props.singleProject.data.project
                                            .end_time
                                        }
                                        intervalDelay={0}
                                        precision={3}
                                        renderer={(props) => (
                                          <div>
                                            {props.days} Days {props.hours}{" "}
                                            Hours {props.minutes} Minutes{" "}
                                            {props.seconds} Seconds
                                          </div>
                                        )}
                                      />
                                    </p>
                                  </>
                                ) : null}
                              </div>
                              <div className="row no-margin hide">
                                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 no-padding">
                                  <div className="card-wrapper give-margin-rigt">
                                    <h6 className="text-capitalize mb-3">
                                      Ether Balance
                                    </h6>
                                    <p className="text-capitalize mb-0 text-no-overflow">
                                      {auth.ethBalance}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 no-padding">
                                  <div className="card-wrapper">
                                    <h6 className="text-capitalize mb-3">
                                      BUSD{" "}
                                      Token Balance
                                    </h6>
                                    <p className="text-capitalize mb-0">
                                      {auth.BUSDTokenBalance}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {(
                                singleProject.data.project
                                  .total_tokens_purchased /
                                singleProject.data.project.allowed_tokens
                              ).toFixed(2) *
                                100 ==
                              100 ? (
                                <div className="mt-5">
                                  <button
                                    type="button"
                                    className="btn btn--large btn--primary text-capitalize"
                                    disabled={true}
                                  >
                                    Sold
                                  </button>
                                </div>
                              ) : (
                                <div className="single-project-button-wrapper">
                                  {singleProject.data.project.user_id !=
                                    localStorage.getItem("userId") && (
                                    <>
                                      <div className="mt-3 mr-3 hide">
                                        <button
                                          type="button"
                                          className="btn btn--medium btn--primary text-capitalize"
                                          onClick={() =>
                                            handleBuyProjectTokenModal(true)
                                          }
                                        >
                                          Join
                                        </button>
                                      </div>
                                      <div className="mt-3 mr-3">
                                        <button
                                          type="button"
                                          className="btn btn--medium btn--primary text-capitalize"
                                          disabled={
                                            window.web3.utils.fromWei(
                                              stakingPoolDetails.totalstakingBalance,
                                              "Ether"
                                            ) <=
                                            singleProject.data.project
                                              .ido_tokens && !props.userSubEli.loading && !props.userSubEli.data.error_code
                                              ? false
                                              : true
                                          }
                                          onClick={() =>
                                            handleStakeTokenModal(true)
                                          }
                                        >
                                          Purchase
                                        </button>
                                      </div>
                                      <div className="mt-3">
                                        <button
                                          type="button"
                                          className="btn btn--medium btn--primary text-capitalize"
                                          disabled={
                                            window.web3.utils.fromWei(
                                              stakingPoolDetails.stakingBalance,
                                              "Ether"
                                            ) > 0
                                              ? false
                                              : true
                                          }
                                          onClick={() =>
                                            handleUnstakeTokenModal(true)
                                          }
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                              {!props.userSubEli.loading && props.userSubEli.data.error_code ? (
                                <div className="mt-3">
                                  <p>Note: Please add 
                                    <Link to='/staking'className="staking-link"> staking balance </Link> 
                                    to stake in the project</p>
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <>
                              {singleProject.data.project.user_id !=
                                localStorage.getItem("userId") &&
                                singleProject.data.project.publish_status ==
                                  "opened" && (
                                  <>
                                    <div className="mt-3 ">
                                      <button
                                        type="button"
                                        className="btn btn--medium btn--primary text-capitalize"
                                        onClick={() => connectWalletWrapper()}
                                      >
                                        {auth.connectWalletStatus
                                          ? "Connecting..."
                                          : "Connect wallet "}
                                      </button>
                                    </div>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 no-padding mt-lg-5">
                        <div className="status-card">
                          {auth.authStatus ? (
                            <>
                              <div className="singleproject-right-content">
                                <div className="content-section">
                                  <div className="row no-margin no-padding w-100">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0">
                                        Your{" "}
                                        {configuration.get(
                                          "configData.network_token"
                                        )}{" "}
                                        Balance
                                      </p>
                                      <h6 className="letter-2">
                                        {auth.ethBalance}{" "}
                                        {configuration.get(
                                          "configData.network_token"
                                        )}
                                      </h6>
                                      {/* <h6 className="letter-2">
                                        {window.web3.utils.fromWei(
                                          tokenBalance,
                                          "Ether"
                                        )}{" "}
                                        {configuration.get(
                                          "configData.currency"
                                        )}
                                      </h6> */}
                                      <p className="m-0">
                                        Your Staking Balance:
                                      </p>
                                      <h6 className="letter-2">
                                        {window.web3.utils
                                          .fromWei(
                                            stakingPoolDetails.stakingBalance,
                                            "Ether"
                                          )
                                          .substring(0, 5)}{" "}
                                        {configuration.get(
                                          "configData.currency"
                                        )}
                                      </h6>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0">
                                        BUSD Token Balance
                                      </p>
                                      <h6 className="letter-2">
                                        {Number(
                                          auth.BUSDTokenBalance
                                        ).toLocaleString(undefined, {
                                          maximumFractionDigits: 5,
                                        })}{" "}
                                        BUSD
                                      </h6>
                                      {/* <h6 className="letter-2">3.7901 BUSD</h6> */}
                                      {/* <p className="m-0">
                                        Total Stakes Burned:
                                      </p>
                                      <h6 className="letter-2">
                                        {stakingPoolDetails.totalBurnedToken}{" "}
                                        BUSD
                                      </h6> */}
                                    </div>
                                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0">Your Stake To Be Burned</p>
                                      <h6 className="letter-2">{stakingPoolDetails.stakingBalToBeBurned}</h6>
                                    </div> */}
                                  </div>
                                  <hr className="mb-3" />
                                </div>
                                <div className="content-section">
                                  <div className="row no-margin no-padding w-100">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                                      <p className="m-0 text-capitalize">
                                        Allocation Round closes in
                                      </p>
                                      <h6 className="letter-2">
                                        {/* 0d 3h 43m 12s */}
                                        <Countdown
                                          date={
                                            props.singleProject.data.project
                                              .end_time
                                          }
                                          intervalDelay={0}
                                          precision={3}
                                          renderer={(props) => (
                                            <div>
                                              {props.days} Days {props.hours}{" "}
                                              Hours {props.minutes} Minutes{" "}
                                              {props.seconds} Seconds
                                            </div>
                                          )}
                                        />
                                      </h6>
                                    </div>
                                  </div>
                                  <hr className="mb-3" />
                                </div>
                                <div className="content-section">
                                  <div className="row no-margin no-padding w-100">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0 text-capitalize">
                                        Overall Staked Balance
                                      </p>
                                      <h6 className="letter-2">
                                        {window.web3.utils
                                          .fromWei(
                                            stakingPoolDetails.totalstakingBalance,
                                            "Ether"
                                          )
                                          .substring(0, 5)
                                          ? window.web3.utils
                                              .fromWei(
                                                stakingPoolDetails.totalstakingBalance,
                                                "Ether"
                                              )
                                              .substring(0, 5)
                                          : "0.00"}{" "}
                                        {configuration.get(
                                          "configData.currency"
                                        )}
                                      </h6>
                                      {/* <p className="m-0">0.0000 BPAY</p> */}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0 text-capitalize">
                                        Remaining Allocation
                                      </p>
                                      <h6 className="letter-2">
                                        {singleProject.data.project.ido_tokens -
                                          window.web3.utils
                                            .fromWei(
                                              stakingPoolDetails.totalstakingBalance,
                                              "Ether"
                                            )
                                            .substring(0, 5) >
                                        0
                                          ? singleProject.data.project
                                              .ido_tokens -
                                            window.web3.utils
                                              .fromWei(
                                                stakingPoolDetails.totalstakingBalance,
                                                "Ether"
                                              )
                                              .substring(0, 5)
                                          : "0.000"}{" "}
                                        {configuration.get(
                                          "configData.currency"
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                  <hr className="mb-3" />
                                </div>
                                <div className="content-section">
                                  <div className="row no-margin no-padding w-100">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0 text-capitalize">
                                        allocation round
                                      </p>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding">
                                      <p className="m-0 text-end text-capitalize">
                                        {
                                          singleProject.data.project
                                            .total_users_participated
                                        }{" "}
                                        participants
                                      </p>
                                    </div>
                                  </div>
                                  <hr className="mb-3" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-center text-capitalize whitecolor text-uppercase text-bold">
                                {
                                  singleProject.data.project
                                    .publish_status_formatted
                                }
                              </p>
                            </>
                          )}
                          <div className="project-progessbar">
                            <div className="crumina-module crumina-skills-item skills-item--bordered no-margin">
                              <div className="skills-item-info">
                                <p className="progressbar-title text-capitalize  text-bold">
                                  swap progress
                                </p>
                              </div>
                              {singleProject.data.project.publish_status == "closed" ? (
                                <>
                                  <div className="skills-item-meter">
                                    <span
                                      className="skills-item-meter-active bg-primary-color"
                                      style={{
                                        width: `${
                                          (formatEther(
                                            singleProject.data.project.total_tokens_purchased
                                          ) /
                                            singleProject.data.project.ido_tokens) *
                                            100 >
                                          100
                                            ? 100
                                            : (formatEther(
                                                singleProject.data.project.total_tokens_purchased
                                              ) /
                                                singleProject.data.project
                                                  .ido_tokens) *
                                              100
                                        }%`,
                                      }}
                                    ></span>
                                  </div>
                                  <div className="project-progress-status">
                                    <span>
                                      {Number(
                                        formatEther(
                                          singleProject.data.project.total_tokens_purchased
                                        )
                                      ).toFixed(2) /
                                      singleProject.data.project.ido_tokens
                                        ? `${
                                            (Number(
                                              formatEther(
                                                singleProject.data.project.total_tokens_purchased
                                              ) /
                                              singleProject.data.project
                                                .ido_tokens) *
                                            100).toFixed(2)
                                          }%`
                                        : "0.00%"}
                                    </span>
                                    <span>
                                      {Number(
                                        formatEther(
                                          singleProject.data.project.total_tokens_purchased
                                        )
                                      ).toFixed(2)
                                        ? Number(
                                            formatEther(
                                              singleProject.data.project.total_tokens_purchased
                                            )
                                          ).toFixed(2)
                                        : "0.00"}{" "}
                                      {configuration.get("configData.currency")}/{" "}
                                      {
                                        singleProject.data.project
                                          .ido_tokens_formatted
                                      }
                                      {/* <span className="ml-2 denomination text-bold">{singleProject.data.project.token_symbol}</span>  */}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="skills-item-meter">
                                    <span
                                      className="skills-item-meter-active bg-primary-color"
                                      style={{
                                        width: `${
                                          (formatEther(
                                            stakingPoolDetails.totalstakingBalance
                                          ) /
                                            singleProject.data.project.ido_tokens) *
                                            100 >
                                          100
                                            ? 100
                                            : (formatEther(
                                                stakingPoolDetails.totalstakingBalance
                                              ) /
                                                singleProject.data.project
                                                  .ido_tokens) *
                                              100
                                        }%`,
                                      }}
                                    ></span>
                                  </div>
                                  <div className="project-progress-status">
                                    <span>
                                      {Number(
                                        formatEther(
                                          stakingPoolDetails.totalstakingBalance
                                        )
                                      ).toFixed(2) /
                                      singleProject.data.project.ido_tokens
                                        ? `${
                                            (Number(
                                              formatEther(
                                                stakingPoolDetails.totalstakingBalance
                                              )
                                            ).toFixed(2) /
                                              singleProject.data.project
                                                .ido_tokens) *
                                            100
                                          }%`
                                        : "0.00%"}
                                    </span>
                                    <span>
                                      {Number(
                                        formatEther(
                                          stakingPoolDetails.totalstakingBalance
                                        )
                                      ).toFixed(2)
                                        ? Number(
                                            formatEther(
                                              stakingPoolDetails.totalstakingBalance
                                            )
                                          ).toFixed(2)
                                        : "0.00"}{" "}
                                      {configuration.get("configData.currency")}/{" "}
                                      {
                                        singleProject.data.project
                                          .ido_tokens_formatted
                                      }
                                      {/* <span className="ml-2 denomination text-bold">{singleProject.data.project.token_symbol}</span>  */}
                                    </span>
                                  </div>
                                </>
                              )
                                }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
                  <div className="row no-margin">
                    <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12 mb30">
                      <div class="tabs tabs--style2 no-padding">
                        <ul role="tablist no-margin">
                          <li role="presentation" class="tab-control active">
                            <a
                              href="#single-details"
                              role="tab"
                              data-toggle="tab"
                              class="control-item"
                            >
                              <h6 class="tab-title text-capitalize">
                                Project Details
                              </h6>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30">
                      <div class="tab-content w-100 no-padding">
                        <SingleProjectDetails
                          singleProject={props.singleProject.data.project}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {stakeModalStatus && !props.userSubEli.loading ? (
                  <StackModal
                    status={stakeModalStatus}
                    handleStakeTokenModal={handleStakeTokenModal}
                    stakeTokens={stakeTokens}
                    stakeButton={stakeButton}
                    stakeAmount={stakeAmount}
                    setStakeAmount={setStakeAmount}
                    tokenBalance={tokenBalance}
                    tokenSymbol={props.singleProject.data.project.token_symbol}
                    singleProject={props.singleProject}
                    userSubEli={props.userSubEli.data}
                    stakingPoolDetails={stakingPoolDetails}
                    projectId={id}
                  />
                ) : null}
                {unstakeModalStatus && (
                  <UnstakeTokens
                    status={unstakeModalStatus}
                    handleUnstakeTokenModal={handleUnstakeTokenModal}
                    unstakeTokens={unstakeTokens}
                    unStakeButton={unStakeButton}
                    unStakeAmount={unStakeAmount}
                    setUnStakeAmount={setUnStakeAmount}
                    stakingBalance={stakingPoolDetails.stakingBalance}
                    tokenSymbol={props.singleProject.data.project.token_symbol}
                  />
                )}
                {/* <BuyProjectToken
                  singleProject={props.singleProject.data.project}
                  status={buyProjectTokenModel}
                  modal={true}
                  handleBuyProjectTokenModal={handleBuyProjectTokenModal}
                  buyProToken={buyProToken}
                  buttonContentBuyProToken={buttonContentBuyProToken}
                  tokenAmount={tokenAmount}
                  setTokenAmount={setTokenAmount}
                  tokenSymbol={props.singleProject.data.project.token_symbol}
                /> */}
              </>
            )}
          </div>
        </section>
      </div>
      {connectWalletModalStatus && (
        <ConnectWalletModal
          status={connectWalletModalStatus}
          handleConnectWalletClose={handleConnectWalletClose}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  singleProject: state.projectReducer.singleProject,
  userSubEli: state.projectReducer.userSubEli,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(SingleProjectIndex);
