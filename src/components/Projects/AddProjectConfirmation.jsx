import React, { useEffect } from 'react';

const AddProjectConfirmation = (props) => {

  const { status, addproject, transferTokenToAdminWallet } = props;

  // make body not scrollable

  useEffect(() => {
    if (status) {
      document.body.classList.add("noBodyOverflow");
    } else {
      document.body.classList.remove("noBodyOverflow");
    }
  }, [status])

  //prevent reload

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
      <div id="authModal" className={`overflow-y-scroll ${status ? "show" : null}`} >
        <div className="authModalWrapper no-padding">
          <div className={`modal-body form-wrapper form--dark col-lg-4 col-md-6 col-xs-10 col-sm-10 ${status ? "show" : null}`}>
            <div className="outside-scroll"></div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  no-padding ">
              <div className="headerwrapper mb-3">
                <h4 className="text-center text-capitalize">Notify Admin</h4>
              </div>
              <div className="custom-hr mb-3"></div>
              {Object.keys(addproject).length > 0 ?
                <div className="w-100">
                  <div className="row no-margin">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding mb-2 pr-lg-16 ">
                      <div className="d-flex justify-content-between">
                        <h4 className="text-capitalize heading">Project Name : </h4>

                        <h4 className="text-muted">{addproject.data.name}</h4>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding mb-2 pr-lg-16">
                      <div className="d-flex justify-content-between">
                        <h4 className="text-capitalize heading">allowed tokens : </h4>
                        <h4 className="text-muted">{addproject.data.allowed_tokens}</h4>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding mb-2 pr-lg-16">
                      <div className="d-flex justify-content-between">
                        <h4 className="text-capitalize heading">total tokens : </h4>
                        <h4 className="text-muted">{addproject.data.total_tokens}</h4>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding mb-2 pr-lg-16">
                      <div className="d-flex justify-content-between">
                        <h4 className="text-capitalize heading">Token symbol : </h4>
                        <h4 className="text-muted">{addproject.data.token_symbol}</h4>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 no-padding mb-2 pr-lg-16">
                      <div className="d-flex justify-content-between">
                        <h4 className="text-capitalize heading">exchange rate : </h4>
                        <h4 className="text-muted">{addproject.data.exchange_rate}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                : ""}
              <div className="buttoncancelsavewrapper mt-3">
                <button
                  type="button"
                  className="btn btn--medium btn--primary text-capitalize"
                  onClick={transferTokenToAdminWallet}
                  disabled={props.submitButtonContent !== "" ? true : false}
                >
                  {props.submitButtonContent !== "" ? props.submitButtonContent : "notify admin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectConfirmation
