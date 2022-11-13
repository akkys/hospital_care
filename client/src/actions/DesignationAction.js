import Axios from "axios";
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

const listDesignations = () => async (dispatch) => {
  try {
    dispatch({ type: DESIGNATION_LIST_REQUEST });

    const { data } = await Axios.get("/api/admin/designation/");
    dispatch({ type: DESIGNATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DESIGNATION_LIST_FAIL, payload: error });
  }
};

const addDesignation = (designation) => async (dispatch, getState) => {
  try {
    dispatch({ type: DESIGNATION_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!designation._id) {
      const { data } = await Axios.post(
        "/api/admin/designation/add",
        designation,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: DESIGNATION_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/api/admin/designation/update/" + designation._id,
        designation,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: DESIGNATION_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: DESIGNATION_ADD_FAIL,
      // payload: error.response.data.msg,
      payload: error.response.data.error,
    });
  }
};

const deleteDesignation = (designationId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DESIGNATION_DELETE_REQUEST, payload: designationId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(
      "/api/admin/designation/" + designationId,
      {
        headers: {
          "x-auth-token": userInfo.token,
        },
      }
    );
    dispatch({
      type: DESIGNATION_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({ type: DESIGNATION_DELETE_FAIL, payload: error.message });
  }
};

export { listDesignations, addDesignation, deleteDesignation };
