import {
 SAVE_WALLET_PAYMENT_DETAILS_START,
 SAVE_WALLET_PAYMENT_DETAILS_SUCCESS,
 SAVE_WALLET_PAYMENT_DETAILS_FAILURE,
} from "./ActionConstant";

// Get Wallet Details actions.

export function saveWalletPaymentDetailsStart(data) {
 return {
  type: SAVE_WALLET_PAYMENT_DETAILS_START,
  data,
 };
}

export function saveWalletPaymentDetailsSuccess(data) {
 return {
  type: SAVE_WALLET_PAYMENT_DETAILS_SUCCESS,
  data,
 };
}

export function saveWalletPaymentDetailsFailure(error) {
 return {
  type: SAVE_WALLET_PAYMENT_DETAILS_FAILURE,
  error,
 };
}
