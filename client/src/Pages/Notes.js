import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNotes } from "../actions/notesActions";
import { Header } from "../components/Header";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

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
                        <Card className="card">
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
                          {/* <CardActions>
                            <Button size="medium" style={{ width: "50%" }}>
                              <DeleteIcon /> Delete
                            </Button>
                            <Button size="medium" style={{ width: "50%" }}>
                              <EditIcon /> Edit
                            </Button>
                          </CardActions> */}
                        </Card>
                      </Grid>
                    </Grid>
                    <Fab
                      style={{ backgroundColor: "black", color: "white" }}
                      className={classes.fab}
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
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
