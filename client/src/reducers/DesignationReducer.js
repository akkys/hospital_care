import {
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_SUCCESS,
  DESIGNATION_LIST_FAIL,
  DESIGNATION_ADD_REQUEST,
  DESIGNATION_ADD_SUCCESS,
  DESIGNATION_ADD_FAIL,
  DESIGNATION_DELETE_REQUEST,
  DESIGNATION_DELETE_SUCCESS,
  DESIGNATION_DELETE_FAIL,
} from "../actionTypes/DesignationConstants";

const designationListReducer = (
  state = {
    designations: [],
  },
  action
) => {
  switch (action.type) {
    case DESIGNATION_LIST_REQUEST:
      return { loading: true, designations: [] };
    case DESIGNATION_LIST_SUCCESS:
      return { loading: false, designations: action.payload };
    case DESIGNATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addDesignationReducer = (state = { designation: {} }, action) => {
  switch (action.type) {
    case DESIGNATION_ADD_REQUEST:
      return { loading: true };
    case DESIGNATION_ADD_SUCCESS:
      return { loading: false, success: true, designation: action.payload };
    case DESIGNATION_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteDesignationReducer = (
  state = {
    designation: {},
  },
  action
) => {
  switch (action.type) {
    case DESIGNATION_DELETE_REQUEST:
      return { loading: true };
    case DESIGNATION_DELETE_SUCCESS:
      return { loading: false, success: true, designation: action.payload };
    case DESIGNATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  designationListReducer,
  addDesignationReducer,
  deleteDesignationReducer,
};
