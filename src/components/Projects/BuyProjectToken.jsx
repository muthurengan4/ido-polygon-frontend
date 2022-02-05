import React, { useEffect } from "react";
import { useState } from "react";
import configuration from "react-global-configuration";

const BuyProjectToken = (props) => {
  const { status, modal, singleProject } = props;

  const [formValidation, setFormValidation] = useState(false);

  const [buttonDisable, setButtonDisable] = useState(false);

  // make body not scrollable

  useEffect(() => {
    if (status) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [status]);

  const handleFormValidation = (value) => {
    if (value <= 0) {
      setFormValidation("Min");
      setButtonDisable(true);
    } else if (value > singleProject.allowed_tokens) {
      setFormValidation("Max");
      setButtonDisable(true);
    } else {
      setFormValidation(false);
      setButtonDisable(false);
    }
  };

  return (
    <>
      <div
        id={modal ? `authModal` : ""}
        className={`overflow-y-scroll addwalletform  w-100 ${
          status ? "show max-width-100" : ""
        } ${!modal && "mt-sm-5"}`}
      >
        {/* {modal && (
     <div className="wrapper" onClick={() => props.handleBuyProjectTokenModal(false)}></div>
    )} */}
        <div className={modal ? "authModalWrapper  no-padding " : ""}>
          <div
            className={`${
              modal
                ? "modal-body col-lg-5 col-md-6 col-xs-12 col-sm-12"
                : " col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding"
            }  ${status ? "show" : ""}`}
          >
            <div
              className="outside-scroll"
              onClick={() => props.handleBuyProjectTokenModal(null)}
            ></div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
              <form
                className={`login-form form--dark ${
                  modal ? "no-padding form-wrapper" : "addwalletform"
                }`}
                method="post"
                onSubmit={(event) => props.buyProToken(event)}
              >
                <header className="crumina-module crumina-heading heading--h2 heading--with-decoration mb-5">
                  <div className="headerwrapper">
                    <h3 className="heading-title text-capitalize">
                      Buy {props.singleProject.name}
                    </h3>
                    {modal && (
                      <div
                        className="modal-close"
                        onClick={() => props.handleBuyProjectTokenModal(false)}
                      >
                        <svg className="woox-icon">
                          <use xlinkHref="#icon-error-circle"></use>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-left text-capitalize">
                    Enter number of token you want to buy
                  </p>
                </header>
                <label for="name3" className="input-label text-capitalize">
                  amount{" "}
                  <abbr className="required" title="required">
                    *
                  </abbr>
                </label>
                <div className="input-with-icon input-icon--right">
                  <input
                    className={`input--dark input--squared ${
                      formValidation != false ? "error" : ""
                    }`}
                    id="name3"
                    name="tokenAmount"
                    placeholder="Token"
                    type="number"
                    onChange={(event) => {
                      props.setTokenAmount(event.currentTarget.value);
                      handleFormValidation(event.currentTarget.value);
                    }}
                  />
                  {!formValidation && (
                    <p className="mt-3 mb-0 whitecolor">
                      You will be paying{" "}
                      {props.tokenAmount * props.singleProject.exchange_rate}{" "}
                      {configuration.get("configData.currency")} Token
                    </p>
                  )}
                  {formValidation == "Max" && (
                    <p className="custom-required mb-0 mt-3">
                      You can not purchase , greater than allowed tokens.
                    </p>
                  )}
                  {formValidation == "Min" && (
                    <p className="custom-required mb-0 mt-3">
                      Token should be greate than 0.01
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  id="add2wallet"
                  className="btn btn--large btn--primary blacktext btn--with-icon btn--icon-right text-capitalize mt-4"
                  onClick={(event) => props.buyProToken(event)}
                  disabled={buttonDisable}
                >
                  {props.buttonContentBuyProToken !== ""
                    ? props.buttonContentBuyProToken
                    : "add to wallet"}
                  <svg className="woox-icon icon-arrow-right addwalletIcon">
                    <use xlinkHref="#icon-arrow-right"></use>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyProjectToken;
