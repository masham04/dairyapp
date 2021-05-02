import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNote } from "../actions/notesActions";
import { Header } from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "react-loader-spinner";

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

  useEffect(() => {
    dispatch(getNote(match.params.id));
  }, [dispatch, match]);
  const handleDelete = () => {
    alert("Confirm Delete!");
  };
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
          <Button size="medium" style={{ width: "50%" }} onClick={handleDelete}>
            <DeleteIcon /> Delete
          </Button>
          <Button size="medium" style={{ width: "50%" }}>
            <EditIcon /> Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Note;
