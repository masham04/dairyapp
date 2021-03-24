import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNote } from "../actions/notesActions";
import { Header } from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
  },
});

const Note = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const noteDetail = useSelector((state) => state.noteDetail);
  const { error, note } = noteDetail;
  console.log(note);

  useEffect(() => {
    dispatch(getNote(match.params.id));
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Card
        className={classes.root}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
        }}
      >
        <CardActionArea>
          <CardContent style={{ height: "50vh" }}>
            <h2>{note.title}</h2>
            <br />
            <br />
            <p>{note.content}</p>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ marginTop: "auto" }}>
          <Button size="medium" style={{ width: "50%" }}>
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
