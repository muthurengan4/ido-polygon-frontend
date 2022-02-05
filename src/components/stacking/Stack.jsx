import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { authContext } from "../account/auth/AuthProvider";
import AmountToStake from "./stackComponents/AmountToStake";
import Checkpoint from "./stackComponents/Checkpoint";
import Confirmation from "./stackComponents/Confirmation";
import Confrim from "./stackComponents/Confrim";
import PreAuthorization from "./stackComponents/PreAuthorization";

const Stack = (props) => {
  const [activeStackTab, setActiveStackTab] = useState(1);

  const [termsCondition, setTermsConditions] = useState(false);

  const { auth } = useContext(authContext);

  const hanldeActiveStackTab = (index) => {
    setActiveStackTab(index);
    // if (activeStackTab == 3) {
    //   console.log("index", 3);
    //   props.stakeTokens(props.stakeAmount);
    // }
  };

  const handleTermsConditons = (event) => {
    setTermsConditions(!termsCondition);
  };

  const [isValidTabs, setIsValidTabs] = useState([
    {
      index: 1,
      status:
        auth.authStatus &&
        auth.BUSDXTokenBalance > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        !props.stakeLoading.status
    },
    {
      index: 2,
      status:
        auth.authStatus &&
        auth.BUSDXTokenBalance > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.stakeAmount > 0 &&
        !props.stakeLoading.status
    },
    {
      index: 3,
      status:
        auth.authStatus &&
        auth.BUSDXTokenBalance > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.stakeAmount > 0 &&
        !props.stakeLoading.status
    },
    {
      index: 4,
      status:
        auth.authStatus &&
        auth.BUSDXTokenBalance > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.stakeAmount > 0 &&
        !props.stakeLoading.status
    },
  ]);

  useEffect(() => {
    if (!auth.loading && auth.accounts != "") {
      setIsValidTabs([
        {
          index: 1,
          status:
            auth.authStatus &&
            auth.BUSDXTokenBalance > 0 &&
            auth.ethBalance > 0 &&
            termsCondition && 
            !props.stakeLoading.status
        },
        {
          index: 2,
          status:
            auth.authStatus &&
            auth.BUSDXTokenBalance > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.stakeAmount > 0 &&
            !props.stakeLoading.status
        },
        {
          index: 3,
          status:
            auth.authStatus &&
            auth.BUSDXTokenBalance > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.stakeAmount > 0 &&
            !props.stakeLoading.status
        },
        {
          index: 4,
          status:
            auth.authStatus &&
            auth.BUSDXTokenBalance > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.stakeAmount > 0 &&
            !props.stakeLoading.status
        },
      ]);
    }
  }, [
    auth.authStatus,
    auth.BUSDXTokenBalance,
    auth.ethBalance,
    termsCondition,
    props.stakeAmount,
    props.stakeLoading.status
  ]);

  useEffect(() => {
      setActiveStackTab(1);
      setTermsConditions(false)
      props.setStakeAmount(0)
  }, [auth.accounts]);

  useEffect(() => {
    if(props.stakeLoading.isActive){
      props.setStakeLoading({
        ...props.stakeLoading,
        status : false,
        buttonContent : null,
        isActive : false,
        acceptStatus : false
      })
  
    }
  },[activeStackTab])

  const handleStakeReset = () => {
    setActiveStackTab(1);
    setTermsConditions(false);
    props.setUnstakeAmount(0);
  }


  const RenderComponent = (index) => {
    switch (index) {
      case 1:
        return (
          <Checkpoint
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
            termsCondition={termsCondition}
            handleTermsConditons={handleTermsConditons}
          />
        );

      case 2:
        return (
          <AmountToStake
            stakeAmount={props.stakeAmount}
            setStakeAmount={props.setStakeAmount}
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
          />
        );

      case 3:
        return (
          <PreAuthorization
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
          />
        );

      case 4:
        return (
          <Confirmation
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
            stakeTokens={props.stakeTokens}
            stakeAmount={props.stakeAmount}
            stakeLoading={props.stakeLoading}
            handleStakeReset={handleStakeReset}
          />
        );

      default:
        return (
          <Checkpoint
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
          />
        );
    }
  };

  return (
    <>
      <div role="tabpanel" class="tab-pane fade active" id="Stack">
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 no-padding">
          <h4 className="text-bold text-center letter-3">Stake Your BUSDX</h4>
          <div className="col-12 no-padding">
            <div className="stack-tab-wrapper">
              <div className="stack-tab">
                <ul className="stack-tab-ul">
                  <li
                    className={`stack-list ${
                      activeStackTab >= 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="no-btn"
                      type="button"
                      disabled={!isValidTabs[0].status && activeStackTab != 1}
                      onClick={() =>
                        isValidTabs[0].status ? hanldeActiveStackTab(1) : null
                      }
                    >
                      <div className="content">
                        <div className="icon ">
                          <i className="fas fa-list"></i>
                          {/* <i class="fas fa-bars"></i> */}
                        </div>
                        <p>Check Points</p>
                      </div>
                    </button>
                  </li>
                  <li
                    className={`stack-list ${
                      activeStackTab >= 2 ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="no-btn"
                      disabled={!isValidTabs[0].status}
                      onClick={() => hanldeActiveStackTab(2)}
                    >
                      <div className="content">
                        <div className="icon">
                          <i class="fas fa-dollar-sign"></i>
                        </div>
                        <p className="">Amount to Stake</p>
                      </div>
                    </button>
                  </li>
                  <li
                    className={`stack-list ${
                      activeStackTab >= 3 ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="no-btn"
                      disabled={!isValidTabs[1].status}
                      onClick={() => hanldeActiveStackTab(3)}
                    >
                      <div className="content">
                        <div className="icon">
                          <i className="far fa-user-circle"></i>
                        </div>
                        <p className="">Initialize Stake</p>
                      </div>
                    </button>
                  </li>
                  {/* <li className={`stack-list ${activeStackTab == 4 ?  "active" : ""}`} onClick={() => hanldeActiveStackTab(4)}>
                        <div className="content">
                          <div className="icon">
                            <i class="fas fa-shield-alt"></i>
                          </div>
                          <p className="">confirm</p>
                        </div>
                    </li> */}
                  <li
                    className={`stack-list ${
                      activeStackTab >= 4 ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="no-btn"
                      disabled={!isValidTabs[2].status}
                      onClick={() => hanldeActiveStackTab(4)}
                    >
                      <div className="content">
                        <div className="icon">
                          <i class="far fa-check-circle"></i>
                        </div>
                        <p className="">Confirmation</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 no-padding">
          {RenderComponent(activeStackTab)}
        </div>
        {/* <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <div className="stackbuttonWrapper">
            <div className="stackPrevButton" onClick={() => hanldeActiveStackTab(prev => prev - 1)}>
              <svg class="woox-icon"><use xlinkHref="#icon-arrow-left"></use></svg>
            </div>
            <div className="stackPrevButton ml-5" onClick={() => hanldeActiveStackTab(prev => prev + 1)}>
              <svg class="woox-icon"><use xlinkHref="#icon-arrow-right"></use></svg>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Stack;
