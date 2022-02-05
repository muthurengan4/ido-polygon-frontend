import {
  FETCH_FAQ_START,
  FETCH_FAQ_SUCCESS,
  FETCH_FAQ_FAILURE
} from "../actions/ActionConstant";

const initialState = {
  faqData: {
    data: {},
    loading: true,
    error: false,
  },
};

const FaqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQ_START:
      return {
        ...state,
        faqData: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_FAQ_SUCCESS:
      return {
        ...state,
        faqData: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_FAQ_FAILURE:
      return {
        ...state,
        faqData: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default FaqReducer;