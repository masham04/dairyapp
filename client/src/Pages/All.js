import React, { useEffect } from "react";
import { getNotes } from "../actions/notesActions";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const All = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const noteslist = useSelector((state) => state.noteslist);
  const { loading, error, notes } = noteslist;

  const added = useSelector((state) => state.addNote);
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch, added]);
  if (loading)
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
    <div
      className={classes.root}
      style={{
        Width: "1100px",
        marginTop: "50px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      {error && <h2>{error}</h2>}
      <Grid container spacing={3}>
        {notes.map((el, ind) => {
          return (
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                <b>{el.title}</b>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default All;
