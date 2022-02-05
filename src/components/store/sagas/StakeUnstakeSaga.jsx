import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";

import {
  STAKE_TOKEN_START,
  STAKE_ROUND_CHECK_START
} from "../actions/ActionConstant";

import {
  stakeTokenSuccess,
  stakeTokenFailure,
  stakeRoundCheckSuccess,
  stakeRoundCheckFailure
} from "../actions/StakeUnstakeAction";

function* stakeTokenAPI(action) {
  try {
    const response = yield api.postMethod(
      "user_staked_amount_save",
      action.data
    );
    if (response.data.success) {
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
      yield put(stakeTokenSuccess(response.data.data));
    } else {
      yield put(stakeTokenFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(stakeTokenFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* stakeRoundCheckAPI(action) {
  try {
    const response = yield api.postMethod(
      "subscription_round_check",
      action.data
    );
    if (response.data.success) {
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
      yield put(stakeRoundCheckSuccess(response.data.data));
    } else {
      yield put(stakeRoundCheckFailure(response.data.error));
      // const notificationMessage = getErrorNotificationMessage(
      //   response.data.error
      // );
      // yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(stakeRoundCheckFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest(STAKE_TOKEN_START, stakeTokenAPI)]);
  yield all([yield takeLatest(STAKE_ROUND_CHECK_START, stakeRoundCheckAPI)]);
}