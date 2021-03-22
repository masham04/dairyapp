import {
  NOTE_GETALL_REQUEST,
  NOTE_GETALL_SUCCESS,
  NOTE_GETALL_FAIL,
} from "../constants/noteConstants";

export const getAllReducer = (state = {notes : []}, action) => {
    switch (action.type) {
      case NOTE_GETALL_REQUEST:
        return { loading: true, notes: [] };
      case NOTE_GETALL_SUCCESS:
        return { loading: false, notes: action.payload };
      case NOTE_GETALL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state
    }
  };
