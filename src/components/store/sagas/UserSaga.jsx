import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  updateUserDetailsSuccess,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userRegisterFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  deleteAccountSuccess,
  deleteAccountFailure,
  updateUserDetailsFailure,
  registerVerifyFailure,
  registerVerifyResendFailure,
  registerVerifySuccess,
  registerVerifyResendSuccess,
  notificationStatusUpdateSuccess,
  notificationStatusUpdateFailure,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  changePasswordSuccess,
  changePasswordFailure,
  modelEnrollSuccess,
  modelEnrollFailure,
  userRegisterStart,
  setPasswordSuccess,
  setPasswordFailure,
  contactUsSuccess,
  contactUsFailure,
} from "../actions/UserAction";

import api from "../../Environment";
import {
  FETCH_USER_DETAILS_START,
  UPDATE_USER_DETAILS_START,
  LOGIN_START,
  REGISTER_START,
  FORGOT_PASSWORD_START,
  SET_PASSWORD_START,
  DELETE_ACCOUNT_START,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_RESEND_START,
  NOTIFICATION_STATUS_UPDATE_START,
  FETCH_PAYMENTS_START,
  CHANGE_PASSWORD_START,
  MODEL_ENROLL_START,
  USERNAME_AVAILABILITY_START,
  CONTACT_US_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";
import { checkLogoutStatus } from "../actions/ErrorAction";

function* getUserDetailsAPI() {
  try {
    const response = yield api.postMethod("profile");

    if (response.data.success) {
      yield put(fetchUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem(
        "is_subscription_enabled",
        response.data.data.is_subscription_enabled
      );
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
    } else {
      yield put(fetchUserDetailsFailure(response.data.error));
      yield put(checkLogoutStatus(response.data));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateUserDetailsAPI(action) {
  try {
    const userData = yield select((state) => state.users.profileInputData.data);
    const response = yield api.postMethod("update_profile", userData);
    if (response.data.success) {
      yield put(updateUserDetailsSuccess(response.data));
      localStorage.setItem("user_picture", response.data.data.picture);
      localStorage.setItem("user_unique_id", response.data.data.user_unique_id);
      localStorage.setItem("user_cover", response.data.data.cover);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("username", response.data.data.username);
      localStorage.setItem("is_model", response.data.data.is_model);
      localStorage.setItem(
        "is_document_verified",
        response.data.data.is_document_verified
      );
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(() => {
        window.location.assign("/account/profile");
      }, 1000);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(updateUserDetailsFailure(response.data.error));
    }
  } catch (error) {
    yield put(updateUserDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userLoginAPI() {
  try {
    const userData = yield select((state) => state.users.loginInputData.data);

    const response = yield api.postMethod("login", userData);
    yield put(userLoginSuccess(response.data));
    if (response.data.success) {
      if (response.data.code == 1001)
        window.location.assign("/register-verify");
      else {
        localStorage.setItem("wallet_address", userData.wallet_address)
        localStorage.setItem("userLoginStatus", true);
        localStorage.setItem("user_picture", response.data.data.picture);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem(
          "user_unique_id",
          response.data.data.user_unique_id
        );
        localStorage.setItem(
          "is_document_verified",
          response.data.data.is_document_verified
        );
        // const notificationMessage = getSuccessNotificationMessage(
        //   response.data.message
        // );
        // yield put(createNotification(notificationMessage));
        // window.location.assign("/");
      }
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("accessToken", response.data.data.token);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(userLoginFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* notificationStatusUpdateAPI() {
  try {
    const userData = yield select(
      (state) => state.users.notificationUpdate.inputData
    );
    const response = yield api.postMethod(
      "notifications_status_update",
      userData
    );
    if (response.data.success) {
      yield put(notificationStatusUpdateSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
      yield put(notificationStatusUpdateFailure(response.data.error));
    }
  } catch (error) {
    yield put(notificationStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getPaymentsAPI() {
  try {
    const response = yield api.postMethod("payments_index");

    if (response.data.success) {
      yield put(fetchPaymentsSuccess(response.data));
    } else {
      yield put(fetchPaymentsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userAvailabilityAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.usernameAva.inputData
    );
    const response = yield api.postMethod("username_validation", inputData);
    if (response.data.success) {
    } else {
      yield put(modelEnrollFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(modelEnrollFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* contactUsAPI() {
  try {
    const inputData = yield select(
      (state) => state.users.contactUs.inputData
    );
    const response = yield api.postMethod("contact_form_save", inputData);
    if (response.data.success) {
      yield put(contactUsSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/");
    } else {
      yield put(contactUsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(contactUsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}



export default function* pageSaga() {
  yield all([
    yield takeLatest(FETCH_USER_DETAILS_START, getUserDetailsAPI),
    yield takeLatest(UPDATE_USER_DETAILS_START, updateUserDetailsAPI),
    yield takeLatest(LOGIN_START, userLoginAPI),
    yield takeLatest(
      NOTIFICATION_STATUS_UPDATE_START,
      notificationStatusUpdateAPI
    ),
    yield takeLatest(FETCH_PAYMENTS_START, getPaymentsAPI),
    yield takeLatest(USERNAME_AVAILABILITY_START, userAvailabilityAPI),
    yield takeLatest(CONTACT_US_START, contactUsAPI),
  ]);
}
