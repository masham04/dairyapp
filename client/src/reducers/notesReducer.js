import {
  NOTE_GETALL_REQUEST,
  NOTE_GETALL_SUCCESS,
  NOTE_GETALL_FAIL,
  NOTE_GET_REQUEST,
  NOTE_GET_SUCCESS,
  NOTE_GET_FAIL,
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAIL,
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
  //////////////////////////////////////////////////////////

  export const getReducer = (state = {note : []}, action) => {
    switch (action.type) {
      case NOTE_GET_REQUEST:
        return { loading: true, note: [] };
      case NOTE_GET_SUCCESS:
        return { loading: false, note: action.payload };
      case NOTE_GET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state
    }
  };

/////////////////////////////////////////////////////////////////////

export const addNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_ADD_REQUEST:
      return { loading: true, };
    case NOTE_ADD_SUCCESS:
      return { loading: false, state: action.payload };
    case NOTE_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state
  }
};