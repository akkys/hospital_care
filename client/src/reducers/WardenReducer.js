import {
  WARDEN_LIST_REQUEST,
  WARDEN_LIST_SUCCESS,
  WARDEN_LIST_FAIL,
  WARDEN_ADD_REQUEST,
  WARDEN_ADD_SUCCESS,
  WARDEN_ADD_FAIL,
  WARDEN_DELETE_REQUEST,
  WARDEN_DELETE_SUCCESS,
  WARDEN_DELETE_FAIL,
} from "../actionTypes/WardenConstants";

const wardenListReducer = (
  state = {
    wardens: [],
  },
  action
) => {
  switch (action.type) {
    case WARDEN_LIST_REQUEST:
      return { loading: true, wardens: [] };
    case WARDEN_LIST_SUCCESS:
      return { loading: false, wardens: action.payload };
    case WARDEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addWardenReducer = (state = { warden: {} }, action) => {
  switch (action.type) {
    case WARDEN_ADD_REQUEST:
      return { loading: true };
    case WARDEN_ADD_SUCCESS:
      return { loading: false, success: true, warden: action.payload };
    case WARDEN_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteWardenReducer = (
  state = {
    warden: {},
  },
  action
) => {
  switch (action.type) {
    case WARDEN_DELETE_REQUEST:
      return { loading: true };
    case WARDEN_DELETE_SUCCESS:
      return { loading: false, success: true, warden: action.payload };
    case WARDEN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { wardenListReducer, addWardenReducer, deleteWardenReducer };
