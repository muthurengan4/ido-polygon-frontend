import {
  FETCH_VERI_DOCUMENT_START,
  FETCH_VERI_DOCUMENT_SUCCESS,
  FETCH_VERI_DOCUMENT_FAILURE,
  SAVE_VERI_DOC_START,
  SAVE_VERI_DOC_SUCCESS,
  SAVE_VERI_DOC_FAILURE,
  DEL_VERI_DOC_START,
  DEL_VERI_DOC_SUCCESS,
  DEL_VERI_DOC_FAILURE,
  VERI_STATUS_CHECK_START,
  VERI_STATUS_CHECK_SUCCESS,
  VERI_STATUS_CHECK_FAILURE,
  DELETE_ALL_VERI_DOC_START,
  DELETE_ALL_VERI_DOC_SUCCESS,
  DELETE_ALL_VERI_DOC_FAILURE,
  FETCH_SINGLE_VERI_DOC_START,
  FETCH_SINGLE_VERI_DOC_SUCCESS,
  FETCH_SINGLE_VERI_DOC_FAILURE,
} from "./ActionConstant";

export function fetchVeriDocumentsStart(data) {
  return {
    type: FETCH_VERI_DOCUMENT_START,
    data,
  };
}

export function fetchVeriDocumentsSuccess(data) {
  return {
    type: FETCH_VERI_DOCUMENT_SUCCESS,
    data,
  };
}

export function fetchVeriDocumentsFailure(error) {
  return {
    type: FETCH_VERI_DOCUMENT_FAILURE,
    error,
  };
}

export function saveVeriDocStart(data) {
  return {
    type: SAVE_VERI_DOC_START,
    data,
  };
}

export function saveVeriDocSuccess(data) {
  return {
    type: SAVE_VERI_DOC_SUCCESS,
    data,
  };
}

export function saveVeriDocFailure(error) {
  return {
    type: SAVE_VERI_DOC_FAILURE,
    error,
  };
}

export function delVeriDocStart(data) {
  return {
    type: DEL_VERI_DOC_START,
    data,
  };
}

export function delVeriDocSuccess(data) {
  return {
    type: DEL_VERI_DOC_SUCCESS,
    data,
  };
}

export function delVeriDocFailure(error) {
  return {
    type: DEL_VERI_DOC_FAILURE,
    error,
  };
}

export function verificationStatusCheckStart(data) {
  return {
    type: VERI_STATUS_CHECK_START,
    data,
  };
}

export function verificationStatusCheckSuccess(data) {
  return {
    type: VERI_STATUS_CHECK_SUCCESS,
    data,
  };
}

export function verificationStatusCheckFailure(error) {
  return {
    type: VERI_STATUS_CHECK_FAILURE,
    error,
  };
}

export function deleteAllVeriDocStart(data) {
  return {
    type: DELETE_ALL_VERI_DOC_START,
    data,
  };
}

export function deleteAllVeriDocSuccess(data) {
  return {
    type: DELETE_ALL_VERI_DOC_SUCCESS,
    data,
  };
}

export function deleteAllVeriDocFailure(error) {
  return {
    type: DELETE_ALL_VERI_DOC_FAILURE,
    error,
  };
}

export function fetchSingleVeriDocStart(data) {
  return {
    type: FETCH_SINGLE_VERI_DOC_START,
    data,
  };
}

export function fetchSingleVeriDocSuccess(data) {
  return {
    type: FETCH_SINGLE_VERI_DOC_SUCCESS,
    data,
  };
}

export function fetchSingleVeriDocFailure(error) {
  return {
    type: FETCH_SINGLE_VERI_DOC_FAILURE,
    error,
  };
}
