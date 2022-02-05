import React, { useEffect } from "react";
import configuration from "react-global-configuration";

const UnstakeTokens = (props) => {
  const { handleUnstakeTokenModal, status } = props;

  useEffect(() => {
    if (status) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [status]);

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
              //onClick={() => handleUnstakeTokenModal(null)}
            ></div>
          )}
          <div
            className={`modal-body addProject-modal col-lg-4 col-md-6 col-xs-11 col-sm-11 ${status ? "show" : ""
              }`}
          >
            <div
              className="outside-scroll"
              //onClick={() => handleUnstakeTokenModal(null)}
            ></div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
              <div className="headerwrapper">
                <h4 className="text-center text-capitalize">Unstake Tokens</h4>
                <div
                  className="modal-close"
                  onClick={() => handleUnstakeTokenModal(null)}
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
                  props.unstakeTokens(props.unStakeAmount);
                }}
              >
                <div className="row no-margin w-100 align-items-center checkcontractWrapper">
                  <div className="w-100 col-lg-12 col-md-12 col-xs-12 no-padding">
                    <div className="d-flex justify-content-between">
                      {/* <h6 className="mt-0 mb-3 text-capitalize letter-2">
                        Unstake Tokens
                      </h6> */}
                      <p className="text-capitalize">
                        staking balance :{" "}
                        {window.web3.utils
                          .fromWei(props.stakingBalance, "Ether")
                          .substring(0, 5)}{" "}
                        BUSD
                      </p>
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
                          props.setUnStakeAmount(event.currentTarget.value)
                        }
                      />
                      {/* <button>mDAI</button> */}
                    </div>
                  </div>
                  <div className="col-lg-12 makesameheight col-md-12 col-sm-12 col-xs-12">
                    <button
                      type="submit"
                      className="btn btn--medium btn--transparent btn--primary not-fullwidth-btn text-uppercase"
                      disabled={props.unStakeButton != "" ? true : false}
                    >
                      {props.unStakeButton != "" ? props.unStakeButton : "Cancel"}
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

export default UnstakeTokens;
