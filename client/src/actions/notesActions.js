import {
  NOTE_GETALL_REQUEST,
  NOTE_GETALL_SUCCESS,
  NOTE_GETALL_FAIL,
} from "../constants/noteConstants";
import axios from "axios";

export const getNotes = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: NOTE_GETALL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${userInfo.accessToken}`,
      },
    };
    const { data } = await axios.get(`/${userInfo.username}/notes`, config);
    dispatch({
      type: NOTE_GETALL_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: NOTE_GETALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


