import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_LOGIN_DETAILS,
  NOTIFICATION_STATUS_UPDATE_START,
  NOTIFICATION_STATUS_UPDATE_SUCCESS,
  NOTIFICATION_STATUS_UPDATE_FAILURE,
  FETCH_PAYMENTS_START,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  MODEL_ENROLL_START,
  MODEL_ENROLL_SUCCESS,
  MODEL_ENROLL_FAILURE,
  USERNAME_AVAILABILITY_START,
  USERNAME_AVAILABILITY_SUCCESS,
  USERNAME_AVAILABILITY_FAILURE,
  CONTACT_US_START,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  profile: {
    data: {},
    loading: true,
    error: false,
  },
  profileInputData: {
    data: {},
    loading: true,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  buttonDisable: false,
  loadingButtonContent: null,
  loginInputData: {
    data: {},
    loading: false,
    error: false,
    buttonDisable: false,
    loadingButtonContent: null,
  },
  notificationUpdate: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
  },
  payments: {
    data: {},
    loading: true,
    error: false,
  },
  modelEnroll: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  usernameAva: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  contactUs: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS_START:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case EDIT_USER_DETAILS:
      return {
        ...state,
        profile: {
          loading: false,
          error: false,
          data: {
            ...state.profile.data,
            [action.name]: action.value,
          },
        },
      };
    case UPDATE_USER_DETAILS_START:
      return {
        ...state,
        profileInputData: {
          data: {
            name: state.profile.data.name,
            picture: action.data
              ? action.data.picture != undefined
                ? action.data.picture
                : ""
              : "",
          },
          buttonDisable: true,
          loadingButtonContent: "Loading...please wait",
        },
      };

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        profile: {
          data: state.profile.data,
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
        profileInputData: {
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case GET_LOGIN_DETAILS:
      return {
        ...state,
        loginInputData: {
          loading: false,
          error: false,
          data: {
            ...state.loginInputData.data,
            [action.name]: action.value,
          },
        },
      };
    case LOGIN_START:
      return {
        ...state,
        loginInputData: {
          data: {
            ...action.data,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
        loginInputData: {
          data: action,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginInputData: {
          data: {},
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case NOTIFICATION_STATUS_UPDATE_START:
      return {
        ...state,
        notificationUpdate: {
          inputData: action.data,
          data: {},
          loading: true,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: action.data,
          loading: false,
          error: false,
        },
        profile: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case NOTIFICATION_STATUS_UPDATE_FAILURE:
      return {
        ...state,
        notificationUpdate: {
          inputData: {},
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case FETCH_PAYMENTS_START:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        payments: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        payments: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case MODEL_ENROLL_START:
      return {
        ...state,
        modelEnroll: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case MODEL_ENROLL_SUCCESS:
      return {
        ...state,
        modelEnroll: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case MODEL_ENROLL_FAILURE:
      return {
        ...state,
        modelEnroll: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case USERNAME_AVAILABILITY_START:
      return {
        ...state,
        usernameAva: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case USERNAME_AVAILABILITY_SUCCESS:
      return {
        ...state,
        usernameAva: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case USERNAME_AVAILABILITY_FAILURE:
      return {
        ...state,
        usernameAva: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };
    case CONTACT_US_START:
      return {
        ...state,
        contactUs: {
          inputData: action.data,
          buttonDisable: true,
          loadingButtonContent: "Loading please wait",
          data: {},
          loading: true,
        },
      };
    case CONTACT_US_SUCCESS:
      return {
        ...state,
        contactUs: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: action.data,
          loading: false,
        },
      };
    case CONTACT_US_FAILURE:
      return {
        ...state,
        contactUs: {
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          data: {},
          error: action.error,
          loading: true,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
