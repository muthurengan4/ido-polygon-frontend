import React, { useEffect, useContext } from "react";
import { authContext } from "../account/auth/AuthProvider";
import configuration from "react-global-configuration";
import { formatEther } from "@ethersproject/units";
import { connect } from "react-redux";
import {stakeRoundCheckStart , clearStakeRoundCheckData} from "../store/actions/StakeUnstakeAction"
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../Helper/NotificationMessage";
import { createNotification } from "react-redux-notify";

const StackModal = (props) => {
  const { handleStakeTokenModal, status  } = props;

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const { auth } = useContext(authContext);

  const convertTokenBalance = (tokenBalance) => {
    try {
      return window.web3.utils
        .fromWei(props.tokenBalance, "Ether")
        .substring(0, 5);
    } catch (error) {
      return "less than 100 wei";
    }
  };

  const handleStakeSubmit = () => {
    props.dispatch(stakeRoundCheckStart({project_unique_id : props.projectId , round : props.userSubEli.data.data.subscription_round}))
  }

  useEffect(() => {
    if(props.stakeRoundCheck.data.status && !props.stakeRoundCheck.loading){
      props.stakeTokens(props.stakeAmount);
    }

    if(props.stakeRoundCheck.error){
      let notificationMessage = getErrorNotificationMessage(
        props.stakeRoundCheck.error
      );
      props.dispatch(createNotification(notificationMessage));
    }

    return () => props.stakeRoundCheck.data.status

  },[props.stakeRoundCheck.data , props.stakeRoundCheck.error])

  const handleModalClose = () => {
    props.dispatch(clearStakeRoundCheckData())
    handleStakeTokenModal(false)
  }

  return (
    <>
      <div
        id="authModal"
        className={`overflow-y-scroll ${status ? "show" : ""}`}
      >
        <div className="authModalWrapper no-padding">
          {!status && (
            <div
              className="wrapper"
            //onClick={() => handleStakeTokenModal(false)}
            ></div>
          )}
          <div
            className={`modal-body addProject-modal col-lg-4 col-md-6 col-xs-11 col-sm-11 ${status ? "show" : ""
              }`}
          >
            <div
              className="outside-scroll"
            //onClick={() => handleStakeTokenModal(false)}
            ></div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
              <div className="headerwrapper">
                <h4 className="text-center text-capitalize">Stake Tokens</h4>
                <div
                  className="modal-close"
                  onClick={() => handleModalClose()}
                >
                  <svg className="woox-icon">
                    <use xlinkHref="#icon-error-circle"></use>
                  </svg>
                </div>
              </div>
              <form
                method="post"
                className="form--search form-tokens form--search-transparent w-100 mt-4 mb-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  //props.stakeTokens(props.stakeAmount);
                  handleStakeSubmit()
                }}
              >
                <div className="row no-margin w-100 align-items-center checkcontractWrapper">
                  <div className="w-100 col-lg-12 col-md-12 col-xs-12 no-padding">
                    <div className="justify-content-between">
                      {/* <h6 className="mt-0 mb-3 text-capitalize letter-2">
                        Stake Tokens
                      </h6> */}
                      <p className="text-capitalize">
                        balance : {auth.BUSDTokenBalance}{" "}
                        BUSD
                      </p>
                      {props.userSubEli.data ? (
                          props.userSubEli.data.data.subscription_round == 1 ? (
                            <p className="text-capitalize">
                              You are in {props.userSubEli.data.data.subscription && (props.userSubEli.data.data.subscription.title)}{" "}
                              tier, you are able to Stake {props.userSubEli.data.data.remaining_tokens}{configuration.get(
                              "configData.currency")}
                            </p>
                          ) :
                            (
                              <>
                              <p className="text-capitalize">
                                Allowed Tokens : {configuration.get("configData.max_stake_token")}
                                {/* {(props.singleProject.data.project
                                  .ido_tokens -
                                  window.web3.utils
                                    .fromWei(
                                      props.stakingPoolDetails.totalstakingBalance,
                                      "Ether"
                                    )
                                    .substring(0, 5)) >
                                  0
                                  ? (props.singleProject.data.project
                                    .ido_tokens -
                                    window.web3.utils
                                      .fromWei(
                                        props.stakingPoolDetails.totalstakingBalance,
                                        "Ether"
                                      )
                                      .substring(0, 5))
                                  : "0.000"} */}
                                </p>
                                <p className="text-capitalize">
                                  Remaining Tokens : {" "}
                                  {props.userSubEli.data.data.remaining_tokens} {configuration.get("configData.currency")}
                                </p>
                              </>
                            )
                          
                      ) : null}

                    </div>
                  </div>
                  <div className="col-lg-12 makesameheight col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
                    <div className="input-group-btn">
                      <input
                        id="picture"
                        className="no-padding"
                        name="contract_address"
                        placeholder="0"
                        step="any"
                        type="number"
                        onChange={(event) =>
                          props.setStakeAmount(event.currentTarget.value)
                        }
                      />
                      {/* <button>mDAI</button> */}
                    </div>
                  </div>
                  <div className="col-lg-12 makesameheight col-md-12 col-sm-12 col-xs-12">
                    <button
                      type="submit"
                      className="btn btn--medium btn--transparent btn--primary not-fullwidth-btn text-uppercase"
                      disabled={props.stakeRoundCheck.loading ? true : props.stakeButton != "" ? true : false}
                    >
                      {props.stakeRoundCheck.loading ? "Round checking..." :props.stakeButton != "" ? props.stakeButton : "Purchase"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  singleProject: state.projectReducer.singleProject,
  userSubEli: state.projectReducer.userSubEli,
  stakeRoundCheck : state.stakeUnstake.stakeRoundCheck
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(StackModal);
