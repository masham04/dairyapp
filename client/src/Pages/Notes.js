import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/Header";
// import { addNote } from "../actions/notesActions";
import All from "./All";

const Notes = () => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleSubmit = () => {
  //   dispatch(addNote(title, content));
  //   setOpen(false);
  // };

  return (
    <div>
      <Header />
      {error && <h2>{error}</h2>}
      {userInfo && <All />}
      {!userInfo && (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <h2>
            please <Link to="/login">Login!</Link>
          </h2>
        </div>
      )}
      
    </div>
  );
};
export default Notes;
