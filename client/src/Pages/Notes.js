import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/Header";
import { addNote } from "../actions/notesActions";
import All from "./All";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Notes = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote(title, content));
    setOpen(false);
  };

  return (
    <div>
      <Header />
      {error && <h2>{error}</h2>}
      {userInfo && (
        <div>
          <All />
          <Button
            style={{
              width: "70px",
              height: "70px",
              fontSize: "20px",
              backgroundColor: "black",
              color: "#ffff",
              borderRadius: "50%",
              position: "fixed",
              top: "85%",
              right: "10%",
            }}
            onClick={handleClickOpen}
          >
            +
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
              <TextField
                margin="dense"
                id="content"
                multiline
                rows={4}
                label="Description"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
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
