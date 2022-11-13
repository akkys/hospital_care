import Axios from "axios";
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

const listWardens = () => async (dispatch) => {
  try {
    dispatch({ type: WARDEN_LIST_REQUEST });

    const { data } = await Axios.get("/api/warden/");
    dispatch({ type: WARDEN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: WARDEN_LIST_FAIL, payload: error });
  }
};

const addWarden = (warden) => async (dispatch, getState) => {
  try {
    dispatch({ type: WARDEN_ADD_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!warden._id) {
      const { data } = await Axios.post("/api/warden/add", warden, {
        headers: {
          "x-auth-token": userInfo.token,
        },
      });
      dispatch({ type: WARDEN_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.post(
        "/api/warden/update/" + warden._id,
        warden,
        {
          headers: {
            "x-auth-token": userInfo.token,
          },
        }
      );
      dispatch({ type: WARDEN_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: WARDEN_ADD_FAIL,
      // payload: error.response.data.msg,
      payload: error.response.data.error,
    });
  }
};

const deleteWarden = (wardenId) => async (dispatch, getState) => {
  try {
    dispatch({ type: WARDEN_DELETE_REQUEST, payload: wardenId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete("/api/warden/" + wardenId, {
      headers: {
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({ type: WARDEN_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: WARDEN_DELETE_FAIL, payload: error.message });
  }
};

export { listWardens, addWarden, deleteWarden };
