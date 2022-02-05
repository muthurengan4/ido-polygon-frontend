import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { FETCH_FAQ_START } from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../Helper/NotificationMessage";
import {
  fetchFaqSuccess,
  fetchFaqFailure,
} from "../actions/FaqAction";


function* fetchFaqAPI(action) {
  try {
    const response = yield api.getMethod("faqs_index", action.data);
    if (response.data.success) {
      yield put(fetchFaqSuccess(response.data.data));
    } else {
      yield put(fetchFaqFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFaqFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_FAQ_START, fetchFaqAPI)]);
}
