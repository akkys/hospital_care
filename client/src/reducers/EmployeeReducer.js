import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_ADD_REQUEST,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_ADD_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
} from "../actionTypes/EmployeeConstant";

const employeeListReducer = (
  state = {
    employees: [],
  },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true, employees: [] };
    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, employees: action.payload };
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addEmployeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_REQUEST:
      return { loading: true };
    case EMPLOYEE_ADD_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case EMPLOYEE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteEmployeeReducer = (
  state = {
    employee: {},
  },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_REQUEST:
      return { loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case EMPLOYEE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { addEmployeeReducer, employeeListReducer, deleteEmployeeReducer };
