import React, { useEffect, useState, useContext } from "react";
import Stack from "./Stack";
import Unstack from "./Unstack";
import Withdraw from "./Withdraw";
import { authContext } from "../account/auth/AuthProvider";
import RewardStaking from "../../abis/RewardStaking.json";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { connect } from "react-redux";
import { formatEther } from "@ethersproject/units";
import { stakeTokenStart } from "../store/actions/StakeUnstakeAction"

const StackingIndex = (props) => {

  const [stakingPoolDetails, setStakingPoolDetails] = useState({
    totalstakingBalance: "-",
    stakingBalance: "-",
    rewardAmount: "-",
    rewardRate: "-",
    numberOfStakers: "-",
    busdReward: "-"
  });

  const [activeIndex, setActiveIndex] = useState(1)

  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);

  const [rewardStaking, setRewardStaking] = useState("");

  const { auth, getBalance } = useContext(authContext);

  const [stakeLoading, setStakeLoading] = useState({
    status: false,
    buttonContent: null,
    acceptStatus: false,
    isActive: false
  })

  const [rewardStakeLoading, setRewardStakeLoading] = useState({
    status: false,
    buttonContent: null,
    acceptStatus: false,
    isActive: false
  })

  const [unstakeLoading, setUnstakeLoading] = useState({
    status: false,
    buttonContent: null,
    acceptStatus: false,
    isActive: false
  })

  const [withdrawLoading, setWithdrawLoading] = useState({
    status: false,
    buttonContent: null,
    acceptStatus: false,
    isActive: false
  })

  useEffect(() => {
    if (!auth.loading && auth.accounts != "") {
      getStatkingPoolData(auth.accounts);
    }
  }, [auth.loading, auth.accounts]);

  useEffect(() => {
    setActiveIndex(1)
    setStakeLoading({
      ...stakeLoading,
      status: false,
      buttonContent: null,
      acceptStatus: false,
      isActive: false
    })
    setUnstakeLoading({
      ...unstakeLoading,
      status: false,
      buttonContent: null,
      acceptStatus: false,
      isActive: false
    })
    setRewardStakeLoading({
      ...rewardStakeLoading,
      status: false,
      buttonContent: null,
      acceptStatus: false,
      isActive: false
    })
    setWithdrawLoading({
      ...withdrawLoading,
      status: false,
      buttonContent: null,
      acceptStatus: false,
      isActive: false
    })
  }, [auth.accounts])

  useEffect(() => {
    if (stakeLoading.acceptStatus || unstakeLoading.acceptStatus || withdrawLoading.acceptStatus) {
      getBalance();
      getStatkingPoolData();
    }
  }, [stakeLoading, unstakeLoading, withdrawLoading])

  // Blockchain code. 

  // const connectWalletWrapper = () => {
  //connectWallet is removed
  //   connectWallet();
  //   const projectEndTime = new Date(props.singleProject.data.project.end_time);
  //   console.log("projectEndTime" + projectEndTime);
  //   const currentTime = new Date();
  //   console.log("currentTime" + currentTime);

  // };

  const getStatkingPoolData = async () => {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    const rewardStakingPool = RewardStaking.networks[networkId];
    if (rewardStakingPool) {
      const rewardStaking = new web3.eth.Contract(
        RewardStaking.abi,
        rewardStakingPool.address
      );
      console.log("Reward address", rewardStakingPool.address)
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

      let rewardRate = await rewardStaking.methods
        .rewardRate()
        .call();

      console.log("Reward rate", rewardRate);

      let numberOfStakers = await rewardStaking.methods
        .numberOfStakers()
        .call();

      let busdBalance = await auth.BUSDTokenData.methods.balanceOf(rewardStakingPool.address).call();

      console.log("busdBalance", busdBalance);

      let busdReward = await rewardStaking.methods.busdEarned(auth.accounts, busdBalance).call();
      console.log("BusdReward", busdReward);

      console.log("numberOfStakers", numberOfStakers);

      let rewardAmount = await rewardStaking.methods.earned(auth.accounts).call();
      console.log("Reward amount", window.web3.utils.fromWei(rewardAmount, "Ether"));
      setStakingPoolDetails({
        ...stakingPoolDetails,
        totalstakingBalance: Number(formatEther(totalstakingBalance)).toLocaleString(undefined, { maximumFractionDigits: 5 }),
        stakingBalance: formatEther(stakingBalance),
        rewardAmount: formatEther(rewardAmount),
        rewardRate: rewardRate,
        numberOfStakers: numberOfStakers,
        busdReward: formatEther(busdReward)
      });
      console.log("Staking poll", rewardStaking._address);
    } else {
      window.alert("rewardStaking contract not deployed to detected network.");
    }
  };



  // Stake Tokens.
  const stakeTokens = (amount) => {

    console.log("staking running")

    setStakeLoading({
      ...stakeLoading,
      status: true,
      buttonContent: "initializing Contract",
      isActive: true,
      acceptStatus: false
    })

    let _amount = amount.toString();
    _amount = window.web3.utils.toWei(_amount, "Ether");

    console.log(amount)

    auth.BUSDXTokenData.methods
      .approve(rewardStaking._address, _amount)
      .send({ from: auth.accounts })
      .on("receipt", (receipt) => {
        console.log("receipt running")
        rewardStaking.methods
          .stake(_amount)
          .send({ from: auth.accounts })
          .once("receipt", async (receipt) => {
            // API call
            props.dispatch(stakeTokenStart({ id: auth.userId, amount: stakeAmount, type: 1 }))
            let notificationMessage = getSuccessNotificationMessage(
              "Staked token successfully..."
            );
            props.dispatch(createNotification(notificationMessage));
            //loadBlockchainData();
            console.log("stacked successfully")
            setStakeLoading({
              ...stakeLoading,
              status: false,
              buttonContent: null,
              acceptStatus: true,
              isActive: true
            })
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
            setStakeLoading({
              ...stakeLoading,
              status: false,
              buttonContent: null,
              acceptStatus: false,
              isActive: true
            })
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
        setStakeLoading({
          ...stakeLoading,
          status: false,
          buttonContent: null,
          acceptStatus: false,
          isActive: true
        })
      });
  };

  // unStake Tokens.
  const unstakeToken = async (amount) => {

    setUnstakeLoading({
      ...unstakeLoading,
      status: true,
      buttonContent: "initializing Contract",
      acceptStatus: false,
      isActive: true
    })

    let _amount = amount.toString();
    _amount = window.web3.utils.toWei(_amount, "Ether");
    rewardStaking.methods
      .withdraw(_amount)
      .send({ from: auth.accounts })
      .once("receipt", async (receipt) => {
        // API call
        props.dispatch(stakeTokenStart({ id: auth.userId, amount: unstakeAmount, type: 2 }))
        let notificationMessage = getSuccessNotificationMessage(
          "Staked token successfully..."
        );
        props.dispatch(createNotification(notificationMessage));
        //loadBlockchainData();
        setUnstakeLoading({
          ...unstakeLoading,
          status: false,
          buttonContent: null,
          acceptStatus: true,
          isActive: true
        })
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
        setUnstakeLoading({
          ...unstakeLoading,
          status: false,
          buttonContent: null,
          acceptStatus: false,
          isActive: true
        })
      });
  };

  // Stake the reward Tokens.
  const stakeRewardTokens = async () => {

    setRewardStakeLoading({
      ...rewardStakeLoading,
      status: true,
      buttonContent: "initializing Contract",
      acceptStatus: false,
      isActive: true
    })

    rewardStaking.methods
      .stakeRewardTokens()
      .send({ from: auth.accounts })
      .once("receipt", async (receipt) => {
        // API call
        props.dispatch(stakeTokenStart({ id: auth.userId, amount: stakingPoolDetails.rewardAmount, type: 1 }))
        let notificationMessage = getSuccessNotificationMessage(
          "Staked rewad token successfully..."
        );
        props.dispatch(createNotification(notificationMessage));
        //loadBlockchainData();
        getStatkingPoolData();
        setRewardStakeLoading({
          ...rewardStakeLoading,
          status: false,
          buttonContent: null,
          acceptStatus: true,
          isActive: true
        })
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
        setRewardStakeLoading({
          ...rewardStakeLoading,
          status: false,
          buttonContent: null,
          acceptStatus: false,
          isActive: false
        })
      });
  };

  // Widthdraw reward tokens.
  const withdrawRewardToken = async () => {

    setWithdrawLoading({
      ...withdrawLoading,
      status: true,
      buttonContent: "initializing Contract",
      acceptStatus: false,
      isActive: true
    })

    rewardStaking.methods
      .getReward()
      .send({ from: auth.accounts })
      .once("receipt", async (receipt) => {
        // API call
        let notificationMessage = getSuccessNotificationMessage(
          "Staked token successfully..."
        );
        props.dispatch(createNotification(notificationMessage));
        //loadBlockchainData();
        getStatkingPoolData();

        setWithdrawLoading({
          ...withdrawLoading,
          status: false,
          buttonContent: null,
          acceptStatus: true,
          isActive: false
        })

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
        setWithdrawLoading({
          ...withdrawLoading,
          status: false,
          buttonContent: null,
          acceptStatus: false,
          isActive: false
        })
      });
  };

  const hanldeActiveStackTab = (index) => {
    setActiveIndex(index)
    setStakeLoading({
      ...stakeLoading,
      status: false,
      buttonContent: null,
      acceptStatus: false
    })
  }

  const RenderComponent = (index) => {
    switch (index) {
      case 1:
        return <Stack stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} stakeTokens={stakeTokens} stakeLoading={stakeLoading} setStakeLoading={setStakeLoading} />;

      case 2:
        return <Unstack unstakeAmount={unstakeAmount} setUnstakeAmount={setUnstakeAmount} unstakeToken={unstakeToken} unstakeLoading={unstakeLoading} setUnstakeLoading={setUnstakeLoading} stakingBalance={stakingPoolDetails.stakingBalance} />

      default:
        return <Stack stakeAmount={stakeAmount} setStakeAmount={setStakeAmount} stakeTokens={stakeTokens} />;
    }
  }

  return (
    <>
      <div
        className="other_page_layouts stackIndexBG overflow-visible"
        id="stackIndex"
      >
        <section className="main-content-wrapper ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 col-md-12 col-xs-12 stack-block-1">
                <div className="stack-info-wrapper">
                  <div className="stack-card">
                    <h6 className="text-center">Number of Stakers</h6>
                    <span className="border-top-stacked"></span>
                    <h6 className="c-primary text-center letter-2">{stakingPoolDetails.numberOfStakers}</h6>
                  </div>
                  <div className="stack-card">
                    <h6 className="text-center">Total BUSDX Staked</h6>
                    <span className="border-top-stacked"></span>
                    <h6 className="c-primary text-center letter-2">
                      {stakingPoolDetails.totalstakingBalance}
                    </h6>
                  </div>
                  <div className="stack-card">
                    <h6 className="text-center">APY</h6>
                    <span className="border-top-stacked"></span>
                    <h6 className="c-primary text-center letter-2">{stakingPoolDetails.rewardRate != "-" ? `${stakingPoolDetails.rewardRate}%` : stakingPoolDetails.rewardRate}</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 no-px stack-block-2">
                <div class="tabs tabs--style5 no-padding col-12">
                  <ul role="tablist w-80">
                    <li role="presentation" className={`tab-control ${activeIndex == 1 ? "active" : ""}`}>
                      <a
                        href='javascript:void(0)'
                        onClick={() => hanldeActiveStackTab(1)}
                        className={`control-item`}
                      >
                        <h6 class="tab-title">Stake</h6>
                      </a>
                    </li>
                    <li role="presentation" className={`tab-control ${activeIndex == 2 ? "active" : ""}`}>
                      <a
                        href='javascript:void(0)'
                        onClick={() => hanldeActiveStackTab(2)}
                        class="control-item"
                      >
                        <h6 class="tab-title">UnStake</h6>
                      </a>
                    </li>
                    {/* <li role="presentation" class="tab-control">
                      <a href="#Withdraw" role="tab" data-toggle="tab" class="control-item">
                        <h6 class="tab-title">Withdraw</h6>
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
                  <div class="tab-content stack-content-padding">
                    {RenderComponent(activeIndex)}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 stack-block-3">
                <div className="stack-right-wrapper">
                  <div className="stack-card">
                    <p className="mb-0">Staked</p>
                    <span className="border-top-stacked"></span>
                    <h6 className="letter-2">{stakingPoolDetails.stakingBalance != "-" ? Number(stakingPoolDetails.stakingBalance).toLocaleString(undefined, { maximumFractionDigits: 5 }) : stakingPoolDetails.stakingBalance}</h6>
                  </div>
                  {/* <div className="stack-card">
                    <p className="mb-0">UnStaked</p>
                    <span className="border-top-stacked"></span>
                    <h6 className="letter-2">0.0000</h6>
                  </div> */}
                  <div className="stack-card">
                    <p className="mb-0">Rewards</p>
                    <span className="border-top-stacked"></span>
                    <h6 className="letter-2">{stakingPoolDetails.rewardAmount != "-" ? Number(stakingPoolDetails.rewardAmount).toLocaleString(undefined, { maximumFractionDigits: 5 }) : stakingPoolDetails.rewardAmount}</h6>
                    <div className="d-flex mt-2 stackindexbutton justify-content-evenly">
                      <button
                        type="button"
                        className="btn btn--small btn--primary blacktext mt-2 p-3 staking-loader-button"
                        disabled={stakingPoolDetails.rewardAmount <= 0 || rewardStakeLoading.status}
                        onClick={() => stakeRewardTokens(stakingPoolDetails.rewardAmount)}
                      >
                        {rewardStakeLoading.status && (
                          <div id="spinner" className="staking"></div>
                        )}
                        Stake
                      </button>
                      <button
                        type="button"
                        className="btn btn--small btn--primary blacktext mt-2 ml-0 p-3 staking-loader-button"
                        onClick={() => withdrawRewardToken()}
                        disabled={stakingPoolDetails.rewardAmount <= 0 || withdrawLoading.status}
                      >
                        {withdrawLoading.status && (
                          <div id="spinner" className="staking"></div>
                        )}
                        Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="stack-card">
                    <h6 className="text-center">BUSD Reward</h6>
                    <span className="border-top-stacked"></span>
                    <h6 className="c-primary text-center letter-2">
                      {stakingPoolDetails.busdReward}
                    </h6>
                  </div>
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
  stakeToken: state.stakeUnstake.stakeToken,
  unstakeToken: state.stakeUnstake.unstakeToken,
});


function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(StackingIndex);
