import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import notifyReducer from "react-redux-notify";
import CardsReducer from "./CardsReducer";
import ErrorReducer from "./ErrorReducer";
import NotificationReducer from "./NotificationReducer";
import WalletReducer from "./WalletReducer";
import PageReducer from "./PageReducer";
import VerificationDocumentReducer from "./VerificationDocumentReducer";
import SubscriptionReducer from "./SubscriptionReducer";
import WithDrawReducer from "./WithDrawReducer";
import BankAccountReducer from "./BankAccountReducer";
import KycDocumentReducer from "./KycDocumentReducer";
import ProjectReducer from "./ProjectsReducer";
import CryptoWalletReducer from "./CryptoWalletReducer";
import FaqReducer from "./FaqReducer";
import StakeUnstakeReducer from "./StakeUnstakeReducer";

export default combineReducers({
  users: UserReducer,
  cards: CardsReducer,
  errorDetails: ErrorReducer,
  notification: NotificationReducer,
  notifications: notifyReducer,
  kycDocument: KycDocumentReducer,
  subscriptions: SubscriptionReducer,
  docs: VerificationDocumentReducer,
  wallet: WalletReducer,
  page: PageReducer,
  withDraw: WithDrawReducer,
  bankAccount: BankAccountReducer,
  projectReducer: ProjectReducer,
  cryptoWallet: CryptoWalletReducer,
  faq : FaqReducer,
  stakeUnstake : StakeUnstakeReducer,
});
