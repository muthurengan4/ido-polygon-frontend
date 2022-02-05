import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../account/auth/AuthProvider";
import AmountToUnstake from "./unstakeComponents/AmountToUnstake";
import Checkpoint from "./unstakeComponents/Checkpoint";
import Confirmation from "./unstakeComponents/Confirmation";
import Confrim from "./unstakeComponents/Confrim";
import PreAuthorization from "./unstakeComponents/PreAuthorization";

const Unstack = (props) => {
  const [activeStackTab, setActiveStackTab] = useState(1);

  const hanldeActiveStackTab = (index) => {
    setActiveStackTab(index);
  };

  const [termsCondition, setTermsConditions] = useState(false);

  const { auth } = useContext(authContext);

  const [isValidTabs, setIsValidTabs] = useState([
    {
      index: 1,
      status:
        auth.authStatus &&
        Number(props.stakingBalance) > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        !props.unstakeLoading.status,
    },
    {
      index: 2,
      status:
        auth.authStatus &&
        Number(props.stakingBalance) > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.unstakeAmount > 0 &&
        !props.unstakeLoading.status,
    },
    {
      index: 3,
      status:
        auth.authStatus &&
        Number(props.stakingBalance) > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.unstakeAmount > 0 &&
        !props.unstakeLoading.status,
    },
    {
      index: 4,
      status:
        auth.authStatus &&
        Number(props.stakingBalance) > 0 &&
        auth.ethBalance > 0 &&
        termsCondition &&
        props.unstakeAmount > 0 &&
        !props.unstakeLoading.status,
    },
  ]);

  useEffect(() => {
    if (!auth.loading && auth.accounts != "") {
      setIsValidTabs([
        {
          index: 1,
          status:
            auth.authStatus &&
            Number(props.stakingBalance) > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            !props.unstakeLoading.status,
        },
        {
          index: 2,
          status:
            auth.authStatus &&
            Number(props.stakingBalance) > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.unstakeAmount > 0 &&
            !props.unstakeLoading.status,
        },
        {
          index: 3,
          status:
            auth.authStatus &&
            Number(props.stakingBalance) > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.unstakeAmount > 0 &&
            !props.unstakeLoading.status,
        },
        {
          index: 4,
          status:
            auth.authStatus &&
            Number(props.stakingBalance) > 0 &&
            auth.ethBalance > 0 &&
            termsCondition &&
            props.unstakeAmount > 0 &&
            !props.unstakeLoading.status,
        },
      ]);
    }
  }, [
    auth.authStatus,
    props.stakingBalance,
    auth.ethBalance,
    termsCondition,
    props.unstakeAmount,
    props.unstakeLoading.status
  ]);

  const handleTermsConditons = (event) => {
    setTermsConditions(!termsCondition);
  };

  useEffect(() => {
    if (auth.accounts) {
      setActiveStackTab(1);
      setTermsConditions(false);
      props.setUnstakeAmount(0);
    }
  }, [auth.accounts]);

  useEffect(() => {
    if (props.setUnstakeLoading.isActive) {
      props.setUnstakeLoading({
        ...props.unstakeLoading,
        status: false,
        buttonContent: null,
        isActive: false,
        acceptStatus : false
      });
    }
  }, [activeStackTab]);

  const handleUnstakeReset = () => {
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
            stakingBalance={props.stakingBalance}
          />
        );

      case 2:
        return (
          <AmountToUnstake
            unstakeAmount={props.unstakeAmount}
            setUnstakeAmount={props.setUnstakeAmount}
            activeStackTab={activeStackTab}
            hanldeActiveStackTab={hanldeActiveStackTab}
            stakingBalance={props.stakingBalance}
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
            unstakeAmount={props.unstakeAmount}
            unstakeToken={props.unstakeToken}
            unstakeLoading={props.unstakeLoading}
            handleUnstakeReset={handleUnstakeReset}
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
      <div>
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 no-padding">
          <h4 className="text-bold text-center letter-3">Unstake Your BUSDX</h4>
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
                        <p className="">Amount to Unstake</p>
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
                        <p className="">Initialize Unstake</p>
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

export default Unstack;
