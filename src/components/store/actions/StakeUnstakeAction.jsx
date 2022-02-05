import {
  STAKE_TOKEN_START,
  STAKE_TOKEN_SUCESS,
  STAKE_TOKEN_FAILURE,
  STAKE_ROUND_CHECK_START,
  STAKE_ROUND_CHECK_SUCCESS,
  STAKE_ROUND_CHECK_FAILURE,
  CLEAR_STAKE_ROUND_CHECK_DATA
} from "./ActionConstant";

export function stakeTokenStart(data) {
  return {
    type: STAKE_TOKEN_START,
    data,
  };
}

export function stakeTokenSuccess(data) {
  return {
    type: STAKE_TOKEN_SUCESS,
    data,
  };
}

export function stakeTokenFailure(error) {
  return {
    type: STAKE_TOKEN_FAILURE,
    error,
  };
}

export function stakeRoundCheckStart(data) {
  return {
    type: STAKE_ROUND_CHECK_START,
    data,
  };
}

export function stakeRoundCheckSuccess(data) {
  return {
    type: STAKE_ROUND_CHECK_SUCCESS,
    data,
  };
}

export function stakeRoundCheckFailure(error) {
  return {
    type: STAKE_ROUND_CHECK_FAILURE,
    error,
  };
}

export function clearStakeRoundCheckData() {
  return {
    type: CLEAR_STAKE_ROUND_CHECK_DATA,
  };
}
