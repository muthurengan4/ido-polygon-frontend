import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../../account/auth/AuthProvider"


const AmountToStake = (props) => {

  const { hanldeActiveStackTab, activeStackTab ,  stakeAmount} = props;
  const { auth} = useContext(authContext);

  const [isValid, setIsValid] = useState(
    stakeAmount > 0
  );

  useEffect(() => {
    setIsValid(
      stakeAmount
    );
  }, [stakeAmount]);

  return (
    <>
      <div className="stack-tab">
        <h4 className="text-center text-capitalize letter-3">Please enter the amount of BUSDX you want to stake</h4>
        <div className="form-group amount-to-unstack-sec">
          <label className="custom-label ml-0 text-capitalize text-center">Amount</label>
          <input type="text" className="form-control" placeholder={auth.BUSDXTokenBalance} name="title" required="" value={stakeAmount}
            onChange={(e) => props.setStakeAmount(Number(e.target.value))} />
        </div>
        <div className="stackamount-to-unsatck">
          <a href="#" onClick={(event) => { event.preventDefault(); props.setStakeAmount(Number(auth.BUSDXTokenBalance))}}>
            MAX
          </a>
        </div>
        <h6 className="text-center letter-3">Please make sure to only use whole numbers. Delete everything after the decimal point.</h6>
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
  )
}

export default AmountToStake
