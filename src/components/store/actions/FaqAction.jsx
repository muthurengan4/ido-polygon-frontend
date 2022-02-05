import {
  FETCH_FAQ_START,
  FETCH_FAQ_SUCCESS,
  FETCH_FAQ_FAILURE
} from './ActionConstant'

export function fetchFaqStart(data) {
  return {
    type: FETCH_FAQ_START,
    data,
  };
}

export function fetchFaqSuccess(data) {
  return {
    type: FETCH_FAQ_SUCCESS,
    data,
  };
}

export function fetchFaqFailure(data) {
  return {
    type: FETCH_FAQ_FAILURE,
    data,
  };
}