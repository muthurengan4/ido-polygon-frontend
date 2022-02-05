import {
 SAVE_WALLET_PAYMENT_DETAILS_START,
 SAVE_WALLET_PAYMENT_DETAILS_SUCCESS,
 SAVE_WALLET_PAYMENT_DETAILS_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
 savePaymentDetails: {
  data: {},
  loading: true,
  error: false,
  buttonDisable: false,
  loadingButtonContent: null,
  inputData: {},
 },
 buttonDisable: false,
 loadingButtonContent: null,
};

const CryptoWalletReducer = (state = initialState, action) => {
 switch (action.type) {
  case SAVE_WALLET_PAYMENT_DETAILS_START:
   return {
    ...state,
    savePaymentDetails: {
     data: {},
     loading: true,
     error: {},
     inputData: action.data,
     buttonDisable: true,
     loadingButtonContent: "Loading please wait",
    },
   };
  case SAVE_WALLET_PAYMENT_DETAILS_SUCCESS:
   return {
    ...state,
    savePaymentDetails: {
     data: {},
     loading: true,
     error: {},
     inputData: action.data,
     buttonDisable: false,
     loadingButtonContent: null,
    },
   };
  case SAVE_WALLET_PAYMENT_DETAILS_FAILURE:
   return {
    ...state,
    savePaymentDetails: {
     data: {},
     loading: true,
     error: action.error,
     inputData: {},
     buttonDisable: false,
     loadingButtonContent: null,
    },
   };
  default:
   return state;
 }
};

export default CryptoWalletReducer;
