import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import {
  getAllReducer,
  getReducer,
  addNoteReducer,
  deleteNoteReducer,
  editNoteReducer
} from "./reducers/notesReducer";

const reducer = combineReducers({
  noteslist: getAllReducer,
  noteDetail: getReducer,
  addNote: addNoteReducer,
  deleteNote: deleteNoteReducer,
  editNote: editNoteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
