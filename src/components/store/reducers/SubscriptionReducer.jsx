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
} from "../actions/ActionConstant";

const initialState = {
  subscription: {
    data: {},
    loading: true,
    error: false,
  },
  mySubscription: {
    data: {},
    loading: true,
    error: false,
  },
  singleSubscription: {
    data: {},
    loading: true,
    error: false,
  },
  subPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  cryptoWalletSub: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subscriptionElegibily: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  projectPaymentSave: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const SubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_START:
      return {
        ...state,
        subscription: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscription: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case FETCH_MY_SUBSCRIPTION_START:
      return {
        ...state,
        mySubscription: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_MY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        mySubscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_MY_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        mySubscription: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_SINGLE_SUBSCRIPTION_START:
      return {
        ...state,
        singleSubscription: {
          data: {},
          loading: true,
          error: false,
        },
        singleSubInputData: {
          data: action.data,
        },
      };
    case FETCH_SINGLE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        singleSubscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SINGLE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        singleSubscription: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_START:
      return {
        ...state,
        subPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        subPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        subPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_START:
      return {
        ...state,
        subPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        subPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        subPayWallet: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case SAVE_SUB_PAYMENT_CRYPTO_START:
      return {
        ...state,
        cryptoWalletSub: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SAVE_SUB_PAYMENT_CRYPTO_SUCCESS:
      return {
        ...state,
        cryptoWalletSub: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SAVE_SUB_PAYMENT_CRYPTO_FAILURE:
      return {
        ...state,
        cryptoWalletSub: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIOTION_ELEGIBILITY_CHECK_START:
      return {
        ...state,
        subscriptionElegibily: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIOTION_ELEGIBILITY_CHECK_SUCCESS:
      return {
        ...state,
        subscriptionElegibily: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIOTION_ELEGIBILITY_CHECK_FAILURE:
      return {
        ...state,
        subscriptionElegibily: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PROJECT_PAYMENT_SAVE_START:
      return {
        ...state,
        projectPaymentSave: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PROJECT_PAYMENT_SAVE_SUCCESS:
      return {
        ...state,
        projectPaymentSave: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PROJECT_PAYMENT_SAVE_FAILURE:
      return {
        ...state,
        projectPaymentSave: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    default:
      return state;
  }
};

export default SubscriptionReducer;
