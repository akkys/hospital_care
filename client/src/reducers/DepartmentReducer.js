import {
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_ADD_REQUEST,
  DEPARTMENT_ADD_SUCCESS,
  DEPARTMENT_ADD_FAIL,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
} from "../actionTypes/DepartmentConstants";

const departmentListReducer = (
  state = {
    departments: [],
  },
  action
) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loading: true, departments: [] };
    case DEPARTMENT_LIST_SUCCESS:
      return { loading: false, departments: action.payload };
    case DEPARTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addDepartmentReducer = (state = { department: {} }, action) => {
  switch (action.type) {
    case DEPARTMENT_ADD_REQUEST:
      return { loading: true };
    case DEPARTMENT_ADD_SUCCESS:
      return { loading: false, success: true, department: action.payload };
    case DEPARTMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteDepartmentReducer = (
  state = {
    department: {},
  },
  action
) => {
  switch (action.type) {
    case DEPARTMENT_DELETE_REQUEST:
      return { loading: true };
    case DEPARTMENT_DELETE_SUCCESS:
      return { loading: false, success: true, department: action.payload };
    case DEPARTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { departmentListReducer, addDepartmentReducer, deleteDepartmentReducer };
