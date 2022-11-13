import Axios from "axios";
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

const listDepartments = () => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });

    const { data } = await Axios.get("/api/admin/department/");
    dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DEPARTMENT_LIST_FAIL, payload: error });
  }
};

const addDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!department._id) {
      const { data } = await Axios.post(
        "/api/admin/department/add",
        department,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: DEPARTMENT_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/api/admin/department/update/" + department._id,
        department,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: DEPARTMENT_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: DEPARTMENT_ADD_FAIL,
      // payload: error.response.data.msg,
      payload: error.response.data.error,
    });
  }
};

const deleteDepartment = (departmentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_DELETE_REQUEST, payload: departmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(
      "/api/admin/department/" + departmentId,
      {
        headers: {
          "x-auth-token": userInfo.token,
        },
      }
    );
    dispatch({ type: DEPARTMENT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: DEPARTMENT_DELETE_FAIL, payload: error.message });
  }
};

export { listDepartments, addDepartment, deleteDepartment };
