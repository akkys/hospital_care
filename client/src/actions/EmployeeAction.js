import Axios from "axios";
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

const listEmps = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await Axios.get("/api/admin/employee/");
    dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EMPLOYEE_LIST_FAIL, payload: error });
  }
};

const addEmps = (employee) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!employee._id) {
      const { data } = await Axios.post("/api/admin/employee/add", employee, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: EMPLOYEE_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/api/admin/employee/update/" + employee._id,
        employee,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: EMPLOYEE_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ADD_FAIL,
      // payload: error.response.data.msg,
      payload: error.response.data.error,
    });
  }
};

const deleteEmps = (employeeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_DELETE_REQUEST, payload: employeeId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/api/admin/employee/" + employeeId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: EMPLOYEE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: EMPLOYEE_DELETE_FAIL, payload: error.message });
  }
};

export { addEmps, listEmps, deleteEmps };
