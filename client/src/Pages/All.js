import React, { useEffect } from "react";
import { getNotes } from "../actions/notesActions";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import Loader from "react-loader-spinner";

const All = () => {
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
    <div>
      {notes.map((el, ind) => {
        return (
          <Container>
            {error && <h2>{error}</h2>}
            <Row>
              <Col key={ind} sm={12} md={6} lg={3}>
                {el.title}
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
};

export default All;
