import React,{useEffect} from 'react'

const ProfileActionConfirmation = (props) => {

  const {status , onClose , warningMessage , confirmMessage , onConfirm , disabled , loadingButtonContent} = props;

  return (
    <>
    <div class="light-theme">
      <div id="authModal" className={`overflow-y-scroll ${status ? "show" : ""}`} >
        <div className="authModalWrapper no-padding">
          {status && (
            <div className="wrapper" onClick={() => onClose(false)}></div>
          )}
           <div className={`modal-body addProject-modal col-lg-4 col-md-8 col-xs-11 col-sm-11 ${status ? "show" : ""}`}>
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration mb-0 w-100">
              <div className="headerwrapper">
                <div
                  className="modal-close ml-auto"
                  onClick={() => onClose(false)}
                >
                  <svg className="woox-icon">
                    <use xlinkHref="#icon-error-circle"></use>
                  </svg>
                </div>
              </div>
            </header>
            <div className="warning-message mt-3 mb-5">
              <h4 className="text-muted m-0 text-center">{warningMessage}</h4>
            </div>
            <div className="d-flex">
              <button
                  type="button"
                  className="btn btn--medium btn--muted btn--primary text-capitalize"
                  onClick={() => onClose(false)}
                >cancel</button>
              <button
                type="button"
                className="btn btn--medium btn--primary text-capitalize"
                onClick={(event) => onConfirm(event)}
                disabled={disabled}
              >{loadingButtonContent != null ? loadingButtonContent : confirmMessage}</button>
            </div>
           </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ProfileActionConfirmation
