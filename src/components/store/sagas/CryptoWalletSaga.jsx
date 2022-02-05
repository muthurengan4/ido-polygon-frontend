import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
 SAVE_WALLET_PAYMENT_DETAILS_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
 getSuccessNotificationMessage,
 getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";
import { saveWalletPaymentDetailsFailure, saveWalletPaymentDetailsSuccess } from "../actions/CryptoWalletAction";



function* saveWalletDetailsAPI() {
 try {
  const inputData = yield select((state) => state.cryptoWallet.savePaymentDetails.inputData);
  const response = yield api.postMethod(
   "token_payments_save",
   inputData
  );
  if (response.data.success) {
   yield put(saveWalletPaymentDetailsSuccess(response.data.data));
   const notificationMessage = getSuccessNotificationMessage(
    response.data.message
   );
   yield put(createNotification(notificationMessage));
   // window.location.assign("/wallet");
  } else {
   yield put(saveWalletPaymentDetailsFailure(response.data.error));
   const notificationMessage = getErrorNotificationMessage(
    response.data.error
   );
   yield put(createNotification(notificationMessage));
  }
 } catch (error) {
  yield put(saveWalletPaymentDetailsFailure(error));
  const notificationMessage = getErrorNotificationMessage(
   error.response.data.error
  );
  yield put(createNotification(notificationMessage));
 }
}



export default function* pageSaga() {
 yield all([
  yield takeLatest(SAVE_WALLET_PAYMENT_DETAILS_START, saveWalletDetailsAPI),
 ]);
}
