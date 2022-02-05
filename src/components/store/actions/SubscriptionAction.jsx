import {
  FETCH_SUBSCRIPTION_START,
  FETCH_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_FAILURE,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_SUCCESS,
  FETCH_MY_SUBSCRIPTION_FAILURE,
  FETCH_SINGLE_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_SUCCESS,
  FETCH_SINGLE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS,
  SUBSCRIPTION_PAYMENT_STRIPE_FAILURE,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SUBSCRIPTION_PAYMENT_WALLET_SUCCESS,
  SUBSCRIPTION_PAYMENT_WALLET_FAILURE,
  SAVE_SUB_PAYMENT_CRYPTO_START,
  SAVE_SUB_PAYMENT_CRYPTO_SUCCESS,
  SAVE_SUB_PAYMENT_CRYPTO_FAILURE,
  SUBSCRIOTION_ELEGIBILITY_CHECK_START,
  SUBSCRIOTION_ELEGIBILITY_CHECK_SUCCESS,
  SUBSCRIOTION_ELEGIBILITY_CHECK_FAILURE,
  PROJECT_PAYMENT_SAVE_START,
  PROJECT_PAYMENT_SAVE_SUCCESS,
  PROJECT_PAYMENT_SAVE_FAILURE,
} from "./ActionConstant";

// Get subscription actions.

export function fetchSubscriptionStart(data) {
  return {
    type: FETCH_SUBSCRIPTION_START,
    data,
  };
}

export function fetchSubscriptionSuccess(data) {
  return {
    type: FETCH_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchSubscriptionFailure(error) {
  return {
    type: FETCH_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Get My subscription actions.

export function fetchMySubscriptionStart(data) {
  return {
    type: FETCH_MY_SUBSCRIPTION_START,
    data,
  };
}

export function fetchMySubscriptionSuccess(data) {
  return {
    type: FETCH_MY_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchMySubscriptionFailure(error) {
  return {
    type: FETCH_MY_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Get single subscription actions.

export function fetchSingleSubscriptionStart(data) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_START,
    data,
  };
}

export function fetchSingleSubscriptionSuccess(data) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_SUCCESS,
    data,
  };
}

export function fetchSingleSubscriptionFailure(error) {
  return {
    type: FETCH_SINGLE_SUBSCRIPTION_FAILURE,
    error,
  };
}

// Subscription Payment stripe actions.

export function subscriptionPaymentStripeStart(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_START,
    data,
  };
}

export function subscriptionPaymentStripeSuccess(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS,
    data,
  };
}

export function subscriptionPaymentStripeFailure(error) {
  return {
    type: SUBSCRIPTION_PAYMENT_STRIPE_FAILURE,
    error,
  };
}

// Subscription Payment wallet actions.

export function subscriptionPaymentWalletStart(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_START,
    data,
  };
}

export function subscriptionPaymentWalletSuccess(data) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_SUCCESS,
    data,
  };
}

export function subscriptionPaymentWalletFailure(error) {
  return {
    type: SUBSCRIPTION_PAYMENT_WALLET_FAILURE,
    error,
  };
}

// crypto subscription

export function saveSubPaymentCryptoStart(data) {
  return {
    type: SAVE_SUB_PAYMENT_CRYPTO_START,
    data,
  };
}

export function saveSubPaymentCryptoSuccess(data) {
  return {
    type: SAVE_SUB_PAYMENT_CRYPTO_SUCCESS,
    data,
  };
}

export function saveSubPaymentCryptoFailure(error) {
  return {
    type: SAVE_SUB_PAYMENT_CRYPTO_FAILURE,
    error,
  };
}

export function subscriptionElegibilityCheckStart(data) {
  return {
    type: SUBSCRIOTION_ELEGIBILITY_CHECK_START,
    data,
  };
}

export function subscriptionElegibilityCheckSuccess(data) {
  return {
    type: SUBSCRIOTION_ELEGIBILITY_CHECK_SUCCESS,
    data,
  };
}

export function subscriptionElegibilityCheckFailure(error) {
  return {
    type: SUBSCRIOTION_ELEGIBILITY_CHECK_FAILURE,
    error,
  };
}

export function projectPaymentSaveStart(data) {
  return {
    type: PROJECT_PAYMENT_SAVE_START,
    data,
  };
}

export function projectPaymentSaveSuccess(data) {
  return {
    type: PROJECT_PAYMENT_SAVE_SUCCESS,
    data,
  };
}

export function projectPaymentSaveFailure(error) {
  return {
    type: PROJECT_PAYMENT_SAVE_FAILURE,
    error,
  };
}