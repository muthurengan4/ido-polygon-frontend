import {
  STAKE_TOKEN_START,
  STAKE_TOKEN_SUCESS,
  STAKE_TOKEN_FAILURE,
  STAKE_ROUND_CHECK_START,
  STAKE_ROUND_CHECK_SUCCESS,
  STAKE_ROUND_CHECK_FAILURE,
  CLEAR_STAKE_ROUND_CHECK_DATA,
} from "../actions/ActionConstant";

const initialState = {
  stakeToken: {
    data: {},
    loading: true,
    error: false,
  },
  stakeRoundCheck: {
    data: {},
    loading: false,
    error: false,
  },
};

const StakeUnstakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STAKE_TOKEN_START:
      return {
        ...state,
        stakeToken: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case STAKE_TOKEN_SUCESS:
      return {
        ...state,
        stakeToken: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case STAKE_TOKEN_FAILURE:
      return {
        ...state,
        stakeToken: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case STAKE_ROUND_CHECK_START:
      return {
        ...state,
        stakeRoundCheck: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case STAKE_ROUND_CHECK_SUCCESS:
      return {
        ...state,
        stakeRoundCheck: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case STAKE_ROUND_CHECK_FAILURE:
      return {
        ...state,
        stakeRoundCheck: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case CLEAR_STAKE_ROUND_CHECK_DATA:
      return {
        ...state,
        stakeRoundCheck: {
          data: {},
          loading: false,
          error: false,
        },
      };

    default:
      return state;
  }
};

export default StakeUnstakeReducer;
