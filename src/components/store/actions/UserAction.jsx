import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_LOGIN_DETAILS,
  GET_REGISTER_DETAILS,
  NOTIFICATION_STATUS_UPDATE_START,
  NOTIFICATION_STATUS_UPDATE_SUCCESS,
  NOTIFICATION_STATUS_UPDATE_FAILURE,
  GET_FORGOT_PASSWORD_DETAILS,
  FETCH_PAYMENTS_START,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  MODEL_ENROLL_START,
  MODEL_ENROLL_SUCCESS,
  MODEL_ENROLL_FAILURE,
  USERNAME_AVAILABILITY_START,
  USERNAME_AVAILABILITY_SUCCESS,
  USERNAME_AVAILABILITY_FAILURE,
  EDIT_USER_DETAILS_RESET,
  CONTACT_US_START,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAILURE,
} from "./ActionConstant";

// Get user details actions.

export function fetchUserDetailsStart(data) {
  return {
    type: FETCH_USER_DETAILS_START,
    data,
  };
}

export function fetchUserDetailsSuccess(data) {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    data,
  };
}

export function fetchUserDetailsFailure(error) {
  return {
    type: FETCH_USER_DETAILS_FAILURE,
    error,
  };
}

// Edit user details action.

export function editUserDetails(name, value) {
  return {
    type: EDIT_USER_DETAILS,
    name,
    value,
  };
}

// Update user detatils actions

export function updateUserDetailsStart(data) {
  return {
    type: UPDATE_USER_DETAILS_START,
    data,
  };
}

export function updateUserDetailsSuccess(data) {
  return {
    type: UPDATE_USER_DETAILS_SUCCESS,
    data,
  };
}

export function updateUserDetailsFailure(error) {
  return {
    type: UPDATE_USER_DETAILS_FAILURE,
    error,
  };
}


// Get login Input

export function getLoginInputData(name, value) {
  return {
    type: GET_LOGIN_DETAILS,
    name,
    value,
  };
}

// User login actions.

export function userLoginStart(data) {
  return {
    type: LOGIN_START,
    data,
  };
}

export function userLoginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

export function userLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}


export function notificationStatusUpdateStart(data) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_START,
    data,
  };
}

export function notificationStatusUpdateSuccess(data) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_SUCCESS,
    data,
  };
}

export function notificationStatusUpdateFailure(error) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_FAILURE,
    error,
  };
}

// Get Payments actions.

export function fetchPaymentsStart(data) {
  return {
    type: FETCH_PAYMENTS_START,
    data,
  };
}

export function fetchPaymentsSuccess(data) {
  return {
    type: FETCH_PAYMENTS_SUCCESS,
    data,
  };
}

export function fetchPaymentsFailure(error) {
  return {
    type: FETCH_PAYMENTS_FAILURE,
    error,
  };
}

// Model Enroll

export function modelEnrollStart(data) {
  return {
    type: MODEL_ENROLL_START,
    data,
  };
}

export function modelEnrollSuccess(data) {
  return {
    type: MODEL_ENROLL_SUCCESS,
    data,
  };
}

export function modelEnrollFailure(error) {
  return {
    type: MODEL_ENROLL_FAILURE,
    error,
  };
}

// Username AVAILABILITY

export function usernameAvailablityStart(data) {
  return {
    type: USERNAME_AVAILABILITY_START,
    data,
  };
}

export function usernameAvailablitySuccess(data) {
  return {
    type: USERNAME_AVAILABILITY_SUCCESS,
    data,
  };
}

export function usernameAvailablityFailure(error) {
  return {
    type: USERNAME_AVAILABILITY_FAILURE,
    error,
  };
}
// Contact us details

export function contactUsStart(data) {
  return {
    type: CONTACT_US_START,
    data,
  };
}

export function contactUsSuccess(data) {
  return {
    type: CONTACT_US_SUCCESS,
    data,
  };
}

export function contactUsFailure(error) {
  return {
    type: CONTACT_US_FAILURE,
    error,
  };
}
