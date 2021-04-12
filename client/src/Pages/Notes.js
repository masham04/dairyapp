import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNotes } from "../actions/notesActions";
import { Header } from "../components/Header";
import { addNote } from "../actions/notesActions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

const Notes = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteslist = useSelector((state) => state.noteslist);
  const { error, notes } = noteslist;

  const added = useSelector((state) => state.addNote);
  console.log(added);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(addNote(title, content));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch, added]);

  if (!notes.length)
    return (
      <center>
        <Loader
          style={{ marginTop: "40vh" }}
          type="Bars"
          color="#3d3a3ade"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </center>
    );
  return (
    <div>
      <Header />
      {!userInfo ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <h3>please login!</h3>
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      ) : (
        <div>
          {!notes === 0 ? (
            <div>
              <h2>{error && <h2>{error}</h2>}</h2>
            </div>
          ) : (
            <div>
              {notes.map((el, ind) => {
                return (
                  <div>
                    <div style={{ float: "right" }}>{el.title}</div>

                    <Fab
                      // style={{ backgroundColor: "black", color: "white" }}
                      className={classes.fab}
                      aria-label="add"
                      onClick={handleClickOpen}
                    >
                      <AddIcon />
                    </Fab>
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
                          id="name"
                          label="Title"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                          margin="dense"
                          id="content"
                          label="Description"
                          type="text"
                          fullWidth
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Notes;
