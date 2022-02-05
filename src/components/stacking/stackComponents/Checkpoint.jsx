import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../../account/auth/AuthProvider";

const Checkpoint = (props) => {
  const {
    hanldeActiveStackTab,
    activeStackTab,
    termsCondition,
    handleTermsConditons,
  } = props;

  const { auth } = useContext(authContext);

  const [checklistItems, setChecklistitems] = useState([
    {
      name: "connect with MetaMask",
      status: auth.authStatus,
    },
    {
      name: "BUSDX Available to deposit",
      status: auth.BUSDXTokenBalance > 0 ? true : false,
    },
    {
      name: "BNB Available in wallet",
      status: auth.ethBalance > 0 ? true : false,
    },
    {
      name: "Eligible to stake",
      status:
        auth.authStatus && auth.BUSDXTokenBalance > 0 && auth.ethBalance > 0,
    },
  ]);

  const [isValid, setIsValid] = useState(
    auth.authStatus &&
      auth.BUSDXTokenBalance > 0 &&
      auth.ethBalance > 0 &&
      termsCondition
  );

  useEffect(() => {
    if (!auth.loading && auth.accounts != "") {
      setIsValid(
        auth.authStatus &&
          auth.BUSDXTokenBalance > 0 &&
          auth.ethBalance > 0 &&
          termsCondition
      );
      setChecklistitems([
        {
          name: "connect with MetaMask",
          status: auth.authStatus,
        },
        {
          name: "BUSDX Available to deposit",
          status: auth.BUSDXTokenBalance > 0 ? true : false,
        },
        {
          name: "BNB Available in wallet",
          status: auth.ethBalance > 0 ? true : false,
        },
        {
          name: "Eligible to stake",
          status:
            auth.authStatus && auth.BUSDXTokenBalance > 0 && auth.ethBalance > 0,
        },
      ]); 
    }
  }, [auth.accounts, termsCondition]);

  return (
    <>
      <div className="stack-tab">
        <h4 className="text-center text-capitalize letter-3">checkpoint</h4>
        <p className="text-center">
          The Following Conditions must be met to proceed
        </p>
        <div className="checkpoint-card-wrapper">
          {checklistItems.map((list, index) => (
            <div className="checkpoint-card" key={index}>
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="text-capitalize">{list.name}</h6>
                  {index == 1 && (
                    <p className="mt-0 letter-no-spacing text-justify">
                      {Number(auth.BUSDXTokenBalance).toLocaleString(undefined, {maximumFractionDigits:5})} 
                    </p>
                  )}
                  {index == 2 && (
                    <p className="mt-0 letter-no-spacing text-justify">
                      {Number(auth.ethBalance).toLocaleString(undefined, {maximumFractionDigits:5})}
                    </p>
                  )}
                </div>

                <div class="radio radio--style4 mb-0 mt-2">
                  <label>
                    <input
                      type="checkbox"
                      name="optionsRadios3"
                      checked={list.status}
                      readOnly
                    />
                    <span class="circle"></span>
                    <span class="check"></span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="checkbox checkbox--style4 text-center">
          <label className="whitecolor">
            <input
              type="checkbox"
              name="optionsCheckboxes3"
              checked={termsCondition}
              onClick={() => handleTermsConditons()}
              readOnly
            />
            <span class="checkbox-material">
              <span class="check"></span>
            </span>
            I have read Terms And Conditions
          </label>
        </div>
      </div>
      <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
        <div className="stackbuttonWrapper">
          <button
            type="button"
            className={`stackPrevButton ${
              activeStackTab <= 1 ? "disabled" : ""
            }`}
            disabled={activeStackTab <= 1}
            onClick={() => hanldeActiveStackTab((prev) => prev - 1)}
          >
            <svg class="woox-icon">
              <use xlinkHref="#icon-arrow-left"></use>
            </svg>
          </button>
          <button
            type="button"
            className={`stackPrevButton ml-5 ${!isValid ? "disabled" : ""}`}
            disabled={!isValid}
            onClick={() => hanldeActiveStackTab((prev) => prev + 1)}
          >
            <svg class="woox-icon">
              <use xlinkHref="#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkpoint;
