import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
  const { loading, notes } = noteslist;
  console.log(notes);
  const added = useSelector((state) => state.addNote);
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch, added]);
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
    <div
      className={classes.root}
      style={{
        Width: "1100px",
        marginTop: "40px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <h1>All Notes</h1>
      <br />
      <Grid container spacing={3}>
        {notes.map((el, ind) => {
          return (
            <Grid item xs={12} sm={3} key={ind}>
              <Link to={`/note/${el._id}`} style={{ textDecoration: "none" }}>
                <Paper className={classes.paper}>
                  <h3>
                    <b>{el.title}</b>
                  </h3>
                  <br />
                  <br />
                  <b>Date: </b>
                  <span>{el.date}</span>
                </Paper>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      
    </div>
  );
};

export default All;
