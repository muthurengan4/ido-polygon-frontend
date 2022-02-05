import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {getKycDocumentStart} from '../../store/actions/KycDocumentAction'

const Verification = (props) => {

  useEffect(() => {
    props.dispatch(getKycDocumentStart())
  },[])

  return (
    <>
      <div className="col-lg-12 no-padding ">
        <div className="d-flex justify-content-between">
          {props.profileDetails.data.is_verified == 1 ? (
            <h6 className="text-capitalize">Your account is verified</h6>
          ): (
            <h6 className="text-capitalize">Your account is not verified</h6>
          )}  
          <div>
          <button type="button" className="btn btn--large btn--primary text-capitalize p-2 blacktext">add Document</button>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToPros = (state) => ({

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros , mapDispatchToProps) (Verification)
