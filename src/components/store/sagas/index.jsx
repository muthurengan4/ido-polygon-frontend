import { all, fork } from "redux-saga/effects";
import UserSaga from "./UserSaga";
import ErrorSaga from "./ErrorSaga";
import NotificationSaga from "./NotificationSaga";
import PageSaga from "./PageSaga";
import WalletSaga from "./WalletSaga";
import VerificationDocumentSaga from "./VerificationDocumentSaga";
import SubscriptionSaga from "./SubscriptionSaga";
import WithDrawSaga from "./WithDrawSaga";
import BankAccountSaga from "./BankAccountSaga";
import CardsSaga from "./CardsSaga";
import KycDocumentSaga from "./KycDocumentSaga";
import ProjectSaga from "./ProjectSaga";
import CryptoWalletSaga from "./CryptoWalletSaga";
import FaqSaga from './FaqSaga'
import StakeUnstakeSaga from "./StakeUnstakeSaga"

export default function* rootSaga() {
  yield all([fork(UserSaga)]);
  yield all([fork(ErrorSaga)]);
  yield all([fork(PageSaga)]);
  yield all([fork(VerificationDocumentSaga)]);
  yield all([fork(WalletSaga)]);
  yield all([fork(SubscriptionSaga)]);
  yield all([fork(WithDrawSaga)]);
  yield all([fork(BankAccountSaga)]);
  yield all([fork(CardsSaga)]);
  yield all([fork(KycDocumentSaga)]);
  yield all([fork(CryptoWalletSaga)]);
  yield all([fork(NotificationSaga)]);
  yield all([fork(ProjectSaga)]);
  yield all([fork(FaqSaga)]);
  yield all([fork(StakeUnstakeSaga)]);
}
