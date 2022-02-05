import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  fetchMySubscriptionSuccess,
  fetchMySubscriptionFailure,
  fetchSingleSubscriptionSuccess,
  fetchSingleSubscriptionFailure,
  subscriptionPaymentStripeFailure,
  subscriptionPaymentStripeSuccess,
  subscriptionPaymentWalletSuccess,
  subscriptionPaymentWalletFailure,
  saveSubPaymentCryptoSuccess,
  saveSubPaymentCryptoFailure,
  subscriptionElegibilityCheckFailure,
  subscriptionElegibilityCheckSuccess,
  projectPaymentSaveFailure,
  projectPaymentSaveSuccess,
} from "../actions/SubscriptionAction";

import api from "../../Environment";
import {
  FETCH_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_START,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SAVE_SUB_PAYMENT_CRYPTO_START,
  SUBSCRIOTION_ELEGIBILITY_CHECK_START,
  PROJECT_PAYMENT_SAVE_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";

function* getSubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_index");
    yield put(fetchSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_history");
    if (response.data.success) {
      yield put(fetchMySubscriptionSuccess(response.data.data));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getSingleSubscriptionAPI() {
  try {
    const subscriptionInputData = yield select(
      (state) => state.subscriptions.singleSubInputData.data
    );
    console.log("subsc", subscriptionInputData);
    const response = yield api.postMethod(
      "model_subscriptions_view",
      subscriptionInputData
    );
    yield put(fetchSingleSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentStripeAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayStripe.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_stripe",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(subscriptionPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentWalletAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayWallet.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_wallet",
      subscriptioDetails
    );

    if (response.data.success) {
      yield put(subscriptionPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(subscriptionPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveSubPaymenCryptoAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.cryptoWalletSub.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_payment_by_crypto",
      subscriptioDetails
    );

    if (response.data.success) {
      yield put(saveSubPaymentCryptoSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/account/own-projects");
    } else {
      yield put(saveSubPaymentCryptoFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveSubPaymentCryptoFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionElegibilityCheckAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subscriptionElegibily.inputData
    );
    const response = yield api.postMethod(
      "user_subscription_eligiable_check",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionElegibilityCheckSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(subscriptionElegibilityCheckFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionElegibilityCheckFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* projectPaymentSaveAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.projectPaymentSave.inputData
    );
    const response = yield api.postMethod(
      "project_payment_save",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(projectPaymentSaveSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(projectPaymentSaveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(projectPaymentSaveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SUBSCRIPTION_START, getSubscriptionAPI)]);
  yield all([
    yield takeLatest(FETCH_MY_SUBSCRIPTION_START, getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_SUBSCRIPTION_START, getSingleSubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_STRIPE_START,
      subscriptionPaymentStripeAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SAVE_SUB_PAYMENT_CRYPTO_START,
      saveSubPaymenCryptoAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_WALLET_START,
      subscriptionPaymentWalletAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIOTION_ELEGIBILITY_CHECK_START,
      subscriptionElegibilityCheckAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      PROJECT_PAYMENT_SAVE_START,
      projectPaymentSaveAPI
    ),
  ]);
}
