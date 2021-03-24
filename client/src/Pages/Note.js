import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNote } from "../actions/notesActions";

const Note = ({match}) => {
  const dispatch = useDispatch();
 
  const noteDetail = useSelector((state) => state.noteDetail)
  const {error,note} = noteDetail;
  console.log(note)

  useEffect(() => {
    dispatch(getNote(match.params.id));
  }, [dispatch]);

  return (
    <div>
      <h2>Note Page</h2>
    </div>
  );
};

export default Note;
