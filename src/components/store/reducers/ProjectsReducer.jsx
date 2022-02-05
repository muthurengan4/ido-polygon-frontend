import {
  ADD_PROJECT_START,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  FETCH_OWN_PROJECT_START,
  FETCH_OWN_PROJECT_SUCCESS,
  FETCH_OWN_PROJECT_FAILURE,
  FETCH_SINGLE_OWN_PROJECT_START,
  FETCH_SINGLE_OWN_PROJECT_SUCCESS,
  FETCH_SINGLE_OWN_PROJECT_FAILURE,
  DELETE_OWN_PROJECT_START,
  DELETE_OWN_PROJECT_SUCCESS,
  DELETE_OWN_PROJECT_FAILURE,
  FETCH_INVESTED_PROJECT_START,
  FETCH_INVESTED_PROJECT_SUCCESS,
  FETCH_INVESTED_PROJECT_FAILURE,
  FETCH_PROJECT_ALL_START,
  FETCH_PROJECT_ALL_SUCCESS,
  FETCH_PROJECT_ALL_FAILURE,
  FETCH_SINGLE_PROJECT_START,
  FETCH_SINGLE_PROJECT_SUCCESS,
  FETCH_SINGLE_PROJECT_FAILURE,
  SAVE_INVESTMENT_TRANS_START,
  SAVE_INVESTMENT_TRANS_SUCCESS,
  SAVE_INVESTMENT_TRANS_FAILURE,
  SEND_PROJECT_TOKEN_ADMIN_START,
  SEND_PROJECT_TOKEN_ADMIN_SUCCESS,
  SEND_PROJECT_TOKEN_ADMIN_FAILURE,
  PROJECT_INVESTMENT_CLAIM_START,
  PROJECT_INVESTMENT_CLAIM_SUCCESS,
  PROJECT_INVESTMENT_CLAIM_FAILURE,
  STAKE_TRANSACTION_START,
  STAKE_TRANSACTION_SUCCESS,
  STAKE_TRANSACTION_FAILURE,
  UNSTAKE_TRANSACTION_START,
  UNSTAKE_TRANSACTION_SUCCESS,
  UNSTAKE_TRANSACTION_FAILURE,
  USER_SUB_ELIGIABLE_START,
  USER_SUB_ELIGIABLE_SUCCESS,
  USER_SUB_ELIGIABLE_FAILURE,
  SEND_PROJECT_TOKEN_ADMIN_RESET,
  RESET_ADD_PROJECT_DATAS,
  RESET_SEND_TOEKN_ADMIN_DATAS
} from '../actions/ActionConstant'

const initialState = {

  addProject: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null,
    editStatus: false,
    addStatus: false
  },
  ownProject: {
    data: {},
    loading: true,
    error: false,
    fetchStatus: null
  },
  deleteProject: {
    data: {},
    loading: true,
    error: false,
  },
  investedproject: {
    data: {},
    loading: true,
    error: false,
  },
  projects: {
    data: {},
    loading: true,
    error: false,
  },
  singleProject: {
    data: {},
    loading: true,
    error: false,
  },
  editProject: {
    data: {},
    loading: true,
    error: false,
  },
  saveInvestTrans: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
  sendProTokenAdmin: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
  investClaimSave: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
  stackTrans: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
  unStackTrans: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
  userSubEli: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    buttonDisable: false,
    loadingButtonContent: null
  },
};

const ProjectReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_PROJECT_START:
      return {
        ...state,
        addProject: {
          ...state.addProject,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
          editStatus: false,
          data: {},
          addStatus: false
        },
      };

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        addProject: {
          ...state.addProject,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
          editStatus: true,
          addStatus: true
        }
      };

    case ADD_PROJECT_FAILURE:
      return {
        ...state,
        addProject: {
          ...state.addProject,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
          editStatus: false,
          addStatus: false
        },
      };

    case FETCH_OWN_PROJECT_START:
      return {
        ...state,
        ownProject: {
          ...state.ownProject,
          loading: true,
        },
        addProject: {
          ...state.addProject,
          editStatus: false
        }
      };

    case FETCH_OWN_PROJECT_SUCCESS:
      return {
        ...state,
        ownProject: {
          ...state.ownProject,
          loading: false,
          data: action.data
        },
      };

    case FETCH_OWN_PROJECT_FAILURE:
      return {
        ...state,
        ownProject: {
          ...state.ownProject,
          loading: false,
          data: {},
          error: action.data
        },
      };

    case FETCH_SINGLE_OWN_PROJECT_START:
      return {
        ...state,
        editProject: {
          ...state.editProject,
          loading: true,
        }
      };

    case FETCH_SINGLE_OWN_PROJECT_SUCCESS:
      return {
        ...state,
        editProject: {
          ...state.editProject,
          loading: false,
          data: action.data,
        },
      };

    case FETCH_SINGLE_OWN_PROJECT_FAILURE:
      return {
        ...state,
        editProject: {
          ...state.editProject,
          loading: false,
          data: {},
          error: action.data,
          editStatus: false
        },
      };

    case DELETE_OWN_PROJECT_START:
      return {
        ...state,
        deleteProject: {
          ...state.deleteProject,
          loading: true,
        },
      };

    case DELETE_OWN_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProject: {
          ...state.deleteProject,
          loading: false,
          data: action.data
        },
      };

    case DELETE_OWN_PROJECT_FAILURE:
      return {
        ...state,
        deleteProject: {
          ...state.deleteProject,
          loading: false,
          data: {},
          error: action.error
        },
      };

    case FETCH_INVESTED_PROJECT_START:
      return {
        ...state,
        investedproject: {
          ...state.investedproject,
          loading: true,
        },
      };

    case FETCH_INVESTED_PROJECT_SUCCESS:
      return {
        ...state,
        investedproject: {
          ...state.investedproject,
          loading: false,
          data: action.data
        },
      };

    case FETCH_INVESTED_PROJECT_FAILURE:
      return {
        ...state,
        investedproject: {
          ...state.investedproject,
          loading: false,
          data: {},
          error: action.data
        },
      };

    case FETCH_PROJECT_ALL_START:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: true,
        },
      };

    case FETCH_PROJECT_ALL_SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          data: action.data
        },
      };

    case FETCH_PROJECT_ALL_FAILURE:
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          data: {},
          error: action.data
        },
      };

    case FETCH_SINGLE_PROJECT_START:
      return {
        ...state,
        singleProject: {
          ...state.singleProject,
          loading: true,
        },
      };

    case FETCH_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        singleProject: {
          ...state.singleProject,
          loading: false,
          data: action.data
        },
      };

    case FETCH_SINGLE_PROJECT_FAILURE:
      return {
        ...state,
        singleProject: {
          ...state.singleProject,
          loading: true,
          data: {},
          error: action.data
        },
      };

    case SAVE_INVESTMENT_TRANS_START:
      return {
        ...state,
        saveInvestTrans: {
          ...state.saveInvestTrans,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
        },
      };

    case SAVE_INVESTMENT_TRANS_SUCCESS:
      return {
        ...state,
        saveInvestTrans: {
          ...state.saveInvestTrans,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case SAVE_INVESTMENT_TRANS_FAILURE:
      return {
        ...state,
        saveInvestTrans: {
          ...state.saveInvestTrans,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case SEND_PROJECT_TOKEN_ADMIN_START:
      return {
        ...state,
        sendProTokenAdmin: {
          ...state.sendProTokenAdmin,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
        },
      };

    case SEND_PROJECT_TOKEN_ADMIN_SUCCESS:
      return {
        ...state,
        sendProTokenAdmin: {
          ...state.sendProTokenAdmin,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case SEND_PROJECT_TOKEN_ADMIN_FAILURE:
      return {
        ...state,
        sendProTokenAdmin: {
          ...state.sendProTokenAdmin,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case PROJECT_INVESTMENT_CLAIM_START:
      return {
        ...state,
        investClaimSave: {
          ...state.investClaimSave,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
        },
      };

    case PROJECT_INVESTMENT_CLAIM_SUCCESS:
      return {
        ...state,
        investClaimSave: {
          ...state.investClaimSave,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case PROJECT_INVESTMENT_CLAIM_FAILURE:
      return {
        ...state,
        investClaimSave: {
          ...state.investClaimSave,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case STAKE_TRANSACTION_START:
      return {
        ...state,
        stakeTrans: {
          ...state.stakeTrans,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
        },
      };

    case STAKE_TRANSACTION_SUCCESS:
      return {
        ...state,
        stakeTrans: {
          ...state.stakeTrans,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case STAKE_TRANSACTION_FAILURE:
      return {
        ...state,
        stakeTrans: {
          ...state.stakeTrans,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case UNSTAKE_TRANSACTION_START:
      return {
        ...state,
        unStakeTrans: {
          ...state.unStakeTrans,
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
        },
      };

    case UNSTAKE_TRANSACTION_SUCCESS:
      return {
        ...state,
        unStakeTrans: {
          ...state.unStakeTrans,
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case UNSTAKE_TRANSACTION_FAILURE:
      return {
        ...state,
        unStakeTrans: {
          ...state.unStakeTrans,
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case SEND_PROJECT_TOKEN_ADMIN_RESET:
      return {
        ...state,
        sendProTokenAdmin: {
          ...state.sendProTokenAdmin,
          data: {},
          loading: true,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null
        },
      };

    case RESET_ADD_PROJECT_DATAS:
      return {
        ...state,
        addProject: {
          data: {},
          loading: true,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null,
          editStatus: false,
          addStatus: false
        },
      }

    case RESET_SEND_TOEKN_ADMIN_DATAS: {
      return {
        ...state,
        sendProTokenAdmin: {
          data: {},
          loading: true,
          error: false,
          inputData: {},
          buttonDisable: false,
          loadingButtonContent: null
        },
      }
    }

    case USER_SUB_ELIGIABLE_START:
      return {
        ...state,
        userSubEli: {
          loading: true,
          buttonDisable: true,
          loadingButtonContent: "Loading...!!",
          inputData: action.data,
          data: {}
        },
      };

    case USER_SUB_ELIGIABLE_SUCCESS:
      return {
        ...state,
        userSubEli: {
          data: action.data,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
        },
      };

    case USER_SUB_ELIGIABLE_FAILURE:
      return {
        ...state,
        userSubEli: {
          error: action.error,
          loading: false,
          buttonDisable: false,
          loadingButtonContent: null,
          inputData: {},
          data: action.error
        },
      };

    default:
      return state;
  }

}

export default ProjectReducer