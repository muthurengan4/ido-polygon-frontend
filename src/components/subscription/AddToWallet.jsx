import React, { useState } from 'react'

const AddToWallet = (props) => {

	const { status, modal } = props;

	const [formValidation , setFormValidation] = useState(false);

	const [buttonDisable , setButtonDisable] = useState(false);

	const handleFormValidation = (value) => {
    if(value <= 0){
      setFormValidation("Min")
      setButtonDisable(true)
		}
		else{
      setFormValidation(false)
      setButtonDisable(false)
    }
  }

	return (
		<>
			<div id={modal ? `authModal` : ""} className={`overflow-y-scroll addwalletform  w-100 ${status ? "show" : ''} ${!modal && "mt-sm-5"}`} >
				{modal && (
					<div className="wrapper" onClick={() => props.handleAddWalletModal(false)}></div>
				)}
				<div className={modal ? "authModalWrapper  no-padding " : ""}>
					<div className={`${modal ? "modal-body col-lg-4 col-md-6 col-xs-12 col-sm-12" : " col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding"}  ${status ? "show" : ""}`}>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding">
							<form className={`login-form form--dark  ${modal ? "no-padding form-wrapper" : "addwalletform"}`} method="post" onSubmit={(event) => props.addTokenToWallet(event)}>
								<header className="crumina-module crumina-heading heading--h2 heading--with-decoration mb-5">
									<div className="headerwrapper">
										<h3 className="heading-title text-capitalize">Add To wallet</h3>
										{modal && (
											<div className="modal-close" onClick={() => props.handleAddWalletModal(false)}>
												<svg className="woox-icon"><use xlinkHref="#icon-error-circle"></use></svg>
											</div>
										)}
									</div>
									<p className="text-left text-capitalize">add money to your launchpad wallet</p>
								</header>
								<label for="name3" className="input-label text-capitalize">amount <abbr className="required" title="required">*</abbr></label>
								<div className="input-with-icon input-icon--right">
									<input className={`input--dark input--squared ${formValidation != false ? "error" : ""}`}
										id='name3'
										name="tokenAmount"
										placeholder="Token"
										type="number"
										onChange={(event) => { props.setTokenAmount(event.currentTarget.value) ; handleFormValidation(event.currentTarget.value)} }
									/>
									{!formValidation && (
										<p className="mt-3 mb-0 whitecolor">You will be paying {props.tokenAmount / 1000} ether</p>
									)}
									{formValidation == "Min" && (
										<p className="custom-required mb-0 mt-3">Min amount is 0.01</p>
									)}
								</div>
								<button
									type="button"
									id="add2wallet"
									className="btn btn--large btn--primary blacktext btn--with-icon btn--icon-right text-capitalize mt-4"
									onClick={(event) => props.addTokenToWallet(event)}
									disabled={buttonDisable}
								>
									{props.buttonContentAddWallet !== "" ? props.buttonContentAddWallet : "add to wallet"}
									<svg className="woox-icon icon-arrow-right addwalletIcon"><use xlinkHref="#icon-arrow-right"></use></svg>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddToWallet
