import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";

import {
  ADD_PROJECT_START,
  FETCH_OWN_PROJECT_START,
  FETCH_SINGLE_OWN_PROJECT_START,
  DELETE_OWN_PROJECT_START,
  FETCH_INVESTED_PROJECT_START,
  FETCH_PROJECT_ALL_START,
  FETCH_SINGLE_PROJECT_START,
  SAVE_INVESTMENT_TRANS_START,
  SEND_PROJECT_TOKEN_ADMIN_START,
  PROJECT_INVESTMENT_CLAIM_START,
  STAKE_TRANSACTION_START,
  UNSTAKE_TRANSACTION_START,
  USER_SUB_ELIGIABLE_START
} from "../actions/ActionConstant";

import {
  addProjectSuccess,
  addProjectFailure,
  fetchOwnProjectsSuccess,
  fetchOwnProjectsFailure,
  fetchSingleOwnProjectsSuccess,
  fetchSingleOwnProjectsFailure,
  fetchOwnProjectsStart,
  deleteOwnProjectsSuccess,
  deleteOwnProjectsFailure,
  fetchInvestedProjectsSuccess,
  fetchInvestedProjectsFailure,
  fetchProjectAllSuccess,
  fetchProjectAllFailure,
  fetchSingleProjectSuccess,
  fetchSingleProjectFailure,
  saveInvestmentTransSuccess,
  saveInvestmentTransFailure,
  sendProjectTokenAdminSuccess,
  sendProjectTokenAdminFailure,
  projectInvestmentClaimSuccess,
  projectInvestmentClaimFailure,
  stakeTransactionSuccess,
  stakeTransactionFailure,
  unStackTransactionSuccess,
  unStackTransactionFailure,
  userSubEligiableSuccess,
  userSubEligiableFailure
} from "../actions/ProjectActions";


function* addProjectAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.addProject.inputData
    );
    const response = yield api.postMethod(
      "projects_save",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(addProjectSuccess(response.data.data));
      yield put(fetchOwnProjectsStart());
    } else {
      yield put(addProjectFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addProjectFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchOwnProjectsAPI() {
  try {
    const response = yield api.postMethod(
      "projects_index_for_owner",
    );
    if (response.data.success) {
      yield put(fetchOwnProjectsSuccess(response.data.data));
    } else {
      yield put(fetchOwnProjectsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchOwnProjectsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleOwnProjectsAPI(action) {
  try {
    const response = yield api.postMethod(
      "projects_view_for_owner",
      action.data
    );
    if (response.data.success) {
      yield put(fetchSingleOwnProjectsSuccess(response.data.data));
    } else {
      yield put(fetchSingleOwnProjectsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleOwnProjectsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* deleteOwnProjectAPI(action) {
  try {
    const response = yield api.postMethod(
      "projects_delete",
      action.data
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(deleteOwnProjectsSuccess(response.data.data));
      yield put(fetchOwnProjectsStart());
    } else {
      yield put(deleteOwnProjectsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteOwnProjectsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* fetchInvestedProjectsAPI() {
  try {
    const response = yield api.postMethod(
      "invested_projects",
    );
    if (response.data.success) {
      yield put(fetchInvestedProjectsSuccess(response.data.data));
    } else {
      yield put(fetchInvestedProjectsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchInvestedProjectsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchProjectsAllAPI() {
  try {
    const response = yield api.postMethod(
      "projects",
    );
    if (response.data.success) {
      yield put(fetchProjectAllSuccess(response.data.data));
    } else {
      yield put(fetchProjectAllFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchProjectAllFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchSingleProjectAPI(action) {
  try {
    const response = yield api.postMethod(
      "projects_view",
      action.data
    );
    if (response.data.success) {
      yield put(fetchSingleProjectSuccess(response.data.data));
    } else {
      yield put(fetchSingleProjectFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleProjectFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveInvestmentTransAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.saveInvestTrans.inputData
    );
    const response = yield api.postMethod(
      "projects_investment_save",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(saveInvestmentTransSuccess(response.data.data));
      yield put(fetchOwnProjectsStart());
    } else {
      yield put(saveInvestmentTransFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveInvestmentTransFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendProjectTokenAdminAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.sendProTokenAdmin.inputData
    );
    const response = yield api.postMethod(
      "project_transactions_save",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(sendProjectTokenAdminSuccess(response.data.data));
      yield put(fetchOwnProjectsStart());
    } else {
      yield put(sendProjectTokenAdminFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendProjectTokenAdminFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* investClaimSaveAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.investClaimSave.inputData
    );
    const response = yield api.postMethod(
      "projects_investment_claim",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(projectInvestmentClaimSuccess(response.data.data));
    } else {
      yield put(projectInvestmentClaimFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(projectInvestmentClaimFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* stakeTransAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.stakeTrans.inputData
    );
    const response = yield api.postMethod(
      "project_stacking_save",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(stakeTransactionSuccess(response.data.data));
      // window.location.reload()
    } else {
      yield put(stakeTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(stakeTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* unStakeTransAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.unStakeTrans.inputData
    );
    const response = yield api.postMethod(
      "project_unstacking_save",
      inputData
    );
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(unStackTransactionSuccess(response.data.data));
      // window.location.reload()
    } else {
      yield put(unStackTransactionFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(unStackTransactionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* userSubEligiableAPI() {
  try {
    const inputData = yield select(
      (state) => state.projectReducer.userSubEli.inputData
    );
    const response = yield api.postMethod(
      "user_subscription_eligiable_check",
      inputData
    );
    if (response.data.success) {
      yield put(userSubEligiableSuccess(response.data));
    } else {
      yield put(userSubEligiableFailure(response.data));
    }
  } catch (error) {
    yield put(userSubEligiableFailure(error));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest(ADD_PROJECT_START, addProjectAPI)]);
  yield all([yield takeLatest(FETCH_OWN_PROJECT_START, fetchOwnProjectsAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_OWN_PROJECT_START, fetchSingleOwnProjectsAPI)]);
  yield all([yield takeLatest(DELETE_OWN_PROJECT_START, deleteOwnProjectAPI)]);
  yield all([yield takeLatest(FETCH_INVESTED_PROJECT_START, fetchInvestedProjectsAPI)]);
  yield all([yield takeLatest(FETCH_PROJECT_ALL_START, fetchProjectsAllAPI)]);
  yield all([yield takeLatest(FETCH_SINGLE_PROJECT_START, fetchSingleProjectAPI)]);
  yield all([yield takeLatest(SAVE_INVESTMENT_TRANS_START, saveInvestmentTransAPI)]);
  yield all([yield takeLatest(SEND_PROJECT_TOKEN_ADMIN_START, sendProjectTokenAdminAPI)]);
  yield all([yield takeLatest(PROJECT_INVESTMENT_CLAIM_START, investClaimSaveAPI)]);
  yield all([yield takeLatest(STAKE_TRANSACTION_START, stakeTransAPI)]);
  yield all([yield takeLatest(UNSTAKE_TRANSACTION_START, unStakeTransAPI)]);
  yield all([yield takeLatest(USER_SUB_ELIGIABLE_START, userSubEligiableAPI)]);
}