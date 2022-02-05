import {
  ADD_PROJECT_START,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  FETCH_OWN_PROJECT_START,
  FETCH_OWN_PROJECT_SUCCESS,
  FETCH_OWN_PROJECT_FAILURE,
  FETCH_SINGLE_OWN_PROJECT_START,
  FETCH_SINGLE_OWN_PROJECT_SUCCESS,
  FETCH_SINGLE_OWN_PROJECT_FAILURE,
  DELETE_OWN_PROJECT_START,
  DELETE_OWN_PROJECT_SUCCESS,
  DELETE_OWN_PROJECT_FAILURE,
  FETCH_INVESTED_PROJECT_START,
  FETCH_INVESTED_PROJECT_SUCCESS,
  FETCH_INVESTED_PROJECT_FAILURE,
  FETCH_PROJECT_ALL_START,
  FETCH_PROJECT_ALL_SUCCESS,
  FETCH_PROJECT_ALL_FAILURE,
  FETCH_SINGLE_PROJECT_START,
  FETCH_SINGLE_PROJECT_SUCCESS,
  FETCH_SINGLE_PROJECT_FAILURE,
  SAVE_INVESTMENT_TRANS_START,
  SAVE_INVESTMENT_TRANS_SUCCESS,
  SAVE_INVESTMENT_TRANS_FAILURE,
  SEND_PROJECT_TOKEN_ADMIN_START,
  SEND_PROJECT_TOKEN_ADMIN_SUCCESS,
  SEND_PROJECT_TOKEN_ADMIN_FAILURE,
  PROJECT_INVESTMENT_CLAIM_START,
  PROJECT_INVESTMENT_CLAIM_SUCCESS,
  PROJECT_INVESTMENT_CLAIM_FAILURE,
  STAKE_TRANSACTION_START,
  STAKE_TRANSACTION_SUCCESS,
  STAKE_TRANSACTION_FAILURE,
  UNSTAKE_TRANSACTION_START,
  UNSTAKE_TRANSACTION_SUCCESS,
  UNSTAKE_TRANSACTION_FAILURE,
  USER_SUB_ELIGIABLE_START,
  USER_SUB_ELIGIABLE_SUCCESS,
  USER_SUB_ELIGIABLE_FAILURE,
  SEND_PROJECT_TOKEN_ADMIN_RESET,
  RESET_ADD_PROJECT_DATAS,
  RESET_SEND_TOEKN_ADMIN_DATAS,
} from './ActionConstant'

export function addProjectStart(data) {
  return {
    type: ADD_PROJECT_START,
    data
  };
}

export function addProjectSuccess(data) {
  return {
    type: ADD_PROJECT_SUCCESS,
    data
  };
}

export function addProjectFailure(error) {
  return {
    type: ADD_PROJECT_FAILURE,
    error
  };
}

export function fetchOwnProjectsStart(data) {
  return {
    type: FETCH_OWN_PROJECT_START,
    data
  };
}

export function fetchOwnProjectsSuccess(data) {
  return {
    type: FETCH_OWN_PROJECT_SUCCESS,
    data
  };
}

export function fetchOwnProjectsFailure(error) {
  return {
    type: FETCH_OWN_PROJECT_FAILURE,
    error
  };
}


export function fetchSingleOwnProjectsStart(data) {
  return {
    type: FETCH_SINGLE_OWN_PROJECT_START,
    data
  };
}

export function fetchSingleOwnProjectsSuccess(data) {
  return {
    type: FETCH_SINGLE_OWN_PROJECT_SUCCESS,
    data
  };
}

export function fetchSingleOwnProjectsFailure(error) {
  return {
    type: FETCH_SINGLE_OWN_PROJECT_FAILURE,
    error
  };
}


export function deleteOwnProjectsStart(data) {
  return {
    type: DELETE_OWN_PROJECT_START,
    data
  };
}

export function deleteOwnProjectsSuccess(data) {
  return {
    type: DELETE_OWN_PROJECT_SUCCESS,
    data
  };
}

export function deleteOwnProjectsFailure(error) {
  return {
    type: DELETE_OWN_PROJECT_FAILURE,
    error
  };
}

export function fetchInvestedProjectsStart(data) {
  return {
    type: FETCH_INVESTED_PROJECT_START,
    data
  };
}

export function fetchInvestedProjectsSuccess(data) {
  return {
    type: FETCH_INVESTED_PROJECT_SUCCESS,
    data
  };
}

export function fetchInvestedProjectsFailure(error) {
  return {
    type: FETCH_INVESTED_PROJECT_FAILURE,
    error
  };
}

export function fetchProjectAllStart(data) {
  return {
    type: FETCH_PROJECT_ALL_START,
    data
  };
}

export function fetchProjectAllSuccess(data) {
  return {
    type: FETCH_PROJECT_ALL_SUCCESS,
    data
  };
}

export function fetchProjectAllFailure(error) {
  return {
    type: FETCH_PROJECT_ALL_FAILURE,
    error
  };
}

export function fetchSingleProjectStart(data) {
  return {
    type: FETCH_SINGLE_PROJECT_START,
    data
  };
}

export function fetchSingleProjectSuccess(data) {
  return {
    type: FETCH_SINGLE_PROJECT_SUCCESS,
    data
  };
}

export function fetchSingleProjectFailure(error) {
  return {
    type: FETCH_SINGLE_PROJECT_FAILURE,
    error
  };
}

export function saveInvestmentTransStart(data) {
  return {
    type: SAVE_INVESTMENT_TRANS_START,
    data
  };
}

export function saveInvestmentTransSuccess(data) {
  return {
    type: SAVE_INVESTMENT_TRANS_SUCCESS,
    data
  };
}

export function saveInvestmentTransFailure(error) {
  return {
    type: SAVE_INVESTMENT_TRANS_FAILURE,
    error
  };
}

export function sendProjectTokenAdminStart(data) {
  return {
    type: SEND_PROJECT_TOKEN_ADMIN_START,
    data
  };
}

export function sendProjectTokenAdminSuccess(data) {
  return {
    type: SEND_PROJECT_TOKEN_ADMIN_SUCCESS,
    data
  };
}

export function sendProjectTokenAdminFailure(error) {
  return {
    type: SEND_PROJECT_TOKEN_ADMIN_FAILURE,
    error
  };
}


export function projectInvestmentClaimStart(data) {
  return {
    type: PROJECT_INVESTMENT_CLAIM_START,
    data
  };
}

export function projectInvestmentClaimSuccess(data) {
  return {
    type: PROJECT_INVESTMENT_CLAIM_SUCCESS,
    data
  };
}

export function projectInvestmentClaimFailure(error) {
  return {
    type: PROJECT_INVESTMENT_CLAIM_FAILURE,
    error
  };
}

export function stakeTransactionStart(data) {
  return {
    type: STAKE_TRANSACTION_START,
    data
  };
}

export function stakeTransactionSuccess(data) {
  return {
    type: STAKE_TRANSACTION_SUCCESS,
    data
  };
}

export function stakeTransactionFailure(error) {
  return {
    type: STAKE_TRANSACTION_FAILURE,
    error
  };
}

export function unStackTransactionStart(data) {
  return {
    type: UNSTAKE_TRANSACTION_START,
    data
  };
}

export function unStackTransactionSuccess(data) {
  return {
    type: UNSTAKE_TRANSACTION_SUCCESS,
    data
  };
}

export function unStackTransactionFailure(error) {
  return {
    type: UNSTAKE_TRANSACTION_FAILURE,
    error
  };
}

export function userSubEligiableStart(data) {
  return {
    type: USER_SUB_ELIGIABLE_START,
    data
  };
}

export function userSubEligiableSuccess(data) {
  return {
    type: USER_SUB_ELIGIABLE_SUCCESS,
    data
  };
}

export function userSubEligiableFailure(error) {
  return {
    type: USER_SUB_ELIGIABLE_FAILURE,
    error
  };
}



export function sendProjectTokenAdminRestart(data) {
  return {
    type: SEND_PROJECT_TOKEN_ADMIN_RESET,
    data
  };
}

export function resetAddProjectData(data) {
  return {
    type: RESET_ADD_PROJECT_DATAS,
    data
  };
}

export function resetSendAdminTokenData(data) {
  return {
    type: RESET_SEND_TOEKN_ADMIN_DATAS,
    data
  };
}