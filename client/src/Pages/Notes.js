import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNotes } from "../actions/notesActions";
import { Header } from "../components/Header";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 100,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

const Notes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteslist = useSelector((state) => state.noteslist);
  const { error, notes } = noteslist;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <viewNote />
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
          {!notes ? (
            <div>
              <h2>{error}</h2>
            </div>
          ) : (
            <div>
              {notes.map((el, key) => {
                return (
                  <div className="container">
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <Card className="card" key={key}>
                          <Link
                            to={`/note/${el._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <CardActionArea>
                              <CardContent>
                                <h2>{el.title}</h2>
                                <br />
                                <p>{el.content}</p>
                              </CardContent>
                            </CardActionArea>
                          </Link>
                        </Card>
                      </Grid>
                    </Grid>
                    <Fab
                      style={{ backgroundColor: "black", color: "white" }}
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
                        />
                        <TextField
                          margin="dense"
                          id="content"
                          label="Detail"
                          type="text"
                          multiline
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                          Subscribe
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
