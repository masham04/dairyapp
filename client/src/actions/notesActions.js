import {
  NOTE_GETALL_REQUEST,
  NOTE_GETALL_SUCCESS,
  NOTE_GETALL_FAIL,
  NOTE_GET_REQUEST,
  NOTE_GET_SUCCESS,
  NOTE_GET_FAIL,
  NOTE_ADD_REQUEST,
  NOTE_ADD_FAIL,
  NOTE_ADD_SUCCESS
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
////////////////////////////////////////////////////////////////////

export const getNote = (id) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: NOTE_GET_REQUEST,
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
    const { data } = await axios.get(`/${userInfo.username}/note/${id}`, config);
    dispatch({
      type: NOTE_GET_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: NOTE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//////////////////////////////////////////////////////////////////////////

export const addNote = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: NOTE_ADD_REQUEST,
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
    const { data } = await axios.post(`/${userInfo.username}/note/add`, config);
    dispatch({
      type: NOTE_ADD_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: NOTE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};