import React from 'react'

const PreAuthorization = (props) => {

  const { hanldeActiveStackTab, activeStackTab } = props;

  return (
    <>
      <div className="stack-tab">
        <h4 className="text-center text-capitalize letter-3">Confirm Staking Process</h4>
        <p className="text-center">In this step, you initiate the staking process. You will be allowed to unstake your tokens at any time</p>
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
            className={`stackPrevButton ml-5`}
            onClick={() => hanldeActiveStackTab((prev) => prev + 1)}
          >
            <svg class="woox-icon">
              <use xlinkHref="#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default PreAuthorization
