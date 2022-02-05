import {
  FETCH_WALLET_DETAILS_START,
  FETCH_WALLET_DETAILS_SUCCESS,
  FETCH_WALLET_DETAILS_FAILURE,
  ADD_MONEY_VIA_CARD_START,
  ADD_MONEY_VIA_CARD_SUCCESS,
  ADD_MONEY_VIA_CARD_FAILURE,
  ADD_MONEY_VIA_BANK_START,
  ADD_MONEY_VIA_BANK_SUCCESS,
  ADD_MONEY_VIA_BANK_FAILURE,
  WALLET_HISTORY_START,
  WALLET_HISTORY_SUCCESS,
  WALLET_HISTORY_FAILURE,
} from "./ActionConstant";

// Get Wallet Details actions.

export function fetchWalletDetailsStart(data) {
  return {
    type: FETCH_WALLET_DETAILS_START,
    data,
  };
}

export function fetchWalletDetailsSuccess(data) {
  return {
    type: FETCH_WALLET_DETAILS_SUCCESS,
    data,
  };
}

export function fetchWalletDetailsFailure(error) {
  return {
    type: FETCH_WALLET_DETAILS_FAILURE,
    error,
  };
}

// add Wallet via card actions.

export function addMoneyViaCardStart(data) {
  return {
    type: ADD_MONEY_VIA_CARD_START,
    data,
  };
}

export function addMoneyViaCardSuccess(data) {
  return {
    type: ADD_MONEY_VIA_CARD_SUCCESS,
    data,
  };
}

export function addMoneyViaCardFailure(error) {
  return {
    type: ADD_MONEY_VIA_CARD_FAILURE,
    error,
  };
}

// add Wallet via bank actions.

export function addMoneyViaBankStart(data) {
  return {
    type: ADD_MONEY_VIA_BANK_START,
    data,
  };
}

export function addMoneyViaBankSuccess(data) {
  return {
    type: ADD_MONEY_VIA_BANK_SUCCESS,
    data,
  };
}

export function addMoneyViaBankFailure(error) {
  return {
    type: ADD_MONEY_VIA_BANK_FAILURE,
    error,
  };
}

// Wallet history

export function walletHistoryStart(data) {
  return {
    type: WALLET_HISTORY_START,
    data,
  };
}

export function walletHistorySuccess(data) {
  return {
    type: WALLET_HISTORY_SUCCESS,
    data,
  };
}

export function walletHistoryFailure(error) {
  return {
    type: WALLET_HISTORY_FAILURE,
    error,
  };
}
