import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { getNotes } from "../actions/notesActions";

const Notes = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteslist = useSelector((state) => state.noteslist);
  const { loading, error, notes } = noteslist;
  console.log(notes);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <div style={{ color: "white" }}>
      {!userInfo ? (
        <div>
          <Header />
          <div style={{ textAlign: "center" }}>
            <h3>please login!</h3>
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <h2> Welcome to Dairy App,{userInfo.username}</h2>
          {!notes ? (
            <div>
              <h3>No Notes</h3>
            </div>
          ) : (
            notes.map((el) => (
              <div>
                <h2>{el.title}</h2>
                <h4>{el.content}</h4>
                <h4>{el.date}</h4>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;
