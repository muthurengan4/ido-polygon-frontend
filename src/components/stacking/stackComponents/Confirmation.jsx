import React, { useEffect } from "react";

const Confirmation = (props) => {
  const {
    hanldeActiveStackTab,
    activeStackTab,
    stakeTokens,
    stakeAmount,
    stakeLoading,
    handleStakeReset
  } = props;

  const handleStakeTokens = () => {
    stakeTokens(stakeAmount);
  };

  return (
    <>
      <div className="stack-tab confirmation">
        {stakeLoading.isActive ? (
          <>
            {stakeLoading.status ? (
              <>
                <h4 className="text-center text-capitalize letter-3">
                  {stakeLoading.buttonContent}
                </h4>
                <div className="text-center confiramation-loader">
                  <svg class="circular-loader" viewBox="25 25 50 50">
                    <circle
                      class="loader-path"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke-width="3"
                    />
                  </svg>
                </div>
                <p className="text-center">
                  You have intitated request staking please check
                  metamask/walletconnect.
                </p>
              </>
            ) : stakeLoading.acceptStatus ? (
              <>
                <h4 className="text-center text-capitalize letter-3">
                  Confirmed
                </h4>
                <div className="text-center confiramation-loader">
                  <svg id="confirm_check" x="0px" y="0px" viewBox="0 0 60 60">
                    <path
                      className="confirmation-check"
                      d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                    c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                    c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578"
                    />
                  </svg>
                </div>
                <p className="text-center mb-0">
                  You have initiated the staking process.
                </p>
                <p className="text-center">
                  If desired, you may check Binance Smart Chain to confirm the
                  transaction.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn--small btn--primary text-capitalize"
                    onClick={() => handleStakeReset()}
                  >
                    Stake
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-center text-capitalize letter-3 confiramation-loader">
                  Rejected
                </h4>
                <div className="text-center confiramation-loader">
                  <svg class="cross__svg" viewBox="0 0 52 52">
                    <circle
                      className="cross__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="cross__path cross__path--right"
                      fill="none"
                      d="M16,16 l20,20"
                    />
                    <path
                      className="cross__path cross__path--right"
                      fill="none"
                      d="M16,36 l20,-20"
                    />
                  </svg>
                </div>
                <p className="text-center mb-0">
                  You have rejected the staking request.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn--small btn--primary text-capitalize mt-3"
                    onClick={() => handleStakeTokens()}
                  >
                    Stake again
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h4 className="text-center text-capitalize letter-3">
              Confirmation
            </h4>
            <p className="text-center">
              Check the details that are provided and confirm staking
            </p>
            <div className="text-center">
              <button
                className="btn btn--small btn--primary text-capitalize"
                onClick={() => handleStakeTokens()}
              >
                Stake
              </button>
            </div>
          </>
        )}
      </div>
      <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
        <div className="stackbuttonWrapper">
          <button
            type="button"
            className={`stackPrevButton ${activeStackTab <= 1 ? "disabled" : ""
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
            className="stackPrevButton ml-5"
            disabled={true}
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

export default Confirmation;
