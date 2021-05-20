import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote, getNote, updateNote } from "../actions/notesActions";
import { Header } from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "react-loader-spinner";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    maxWidth: "700px",
  },
});

const Note = ({ match }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const noteDetail = useSelector((state) => state.noteDetail);
  const { error, loading, note } = noteDetail;



  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const updateClose = () => {
    setUpdate(false);
  };
  const updateOpen = () => {
    setUpdate(true);
  };


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleDelete = async () => {
    dispatch(deleteNote(match.params.id));
    setOpen(false)
    window.location.replace('/all-notes')

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateNote(match.params.id, title, content));
    setUpdate(false)
    dispatch(getNote(match.params.id));
  };

  useEffect(() => {
    dispatch(getNote(match.params.id));
  }, [dispatch, match]);

  if (loading)
    return (
      <center>
        <Loader
          style={{ marginTop: "40vh" }}
          type="Circles"
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
      <Link
        to="/all-notes"
        style={{
          textDecoration: "none",
          position: "absolute",
          left: "5%",
          top: "12%",
        }}
      >
        <Button variant="outlined">Back</Button>
      </Link>

      <Card
        className={classes.root}
        style={{
          height: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "12vh",
        }}
      >
        <div style={{ maxWidth: "500px", padding: "30px" }}>
          <h2>{error && <h2>{error}</h2>}</h2>
          <h1>{note.title}</h1>
          <br />
          <br />
          <h3>{note.content}</h3>
        </div>

        <CardActions>
          <Button size="medium" style={{ width: "50%" }} onClick={handleClickOpen}>
            <DeleteIcon /> Delete
          </Button>
          <Button size="medium" style={{ width: "50%" }} onClick={updateOpen}>
            <EditIcon /> Edit
          </Button>
        </CardActions>
      </Card>
      {/* Delete Dialogue Box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this note?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* update Dialogue Box */}
      <Dialog
        open={update}
        onClose={updateClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
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
            variant="outlined"
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
          <Button onClick={updateClose} color="primary">
            Cancel
              </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
              </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Note;