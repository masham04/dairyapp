import Note from "../model/note.js";
import User from "../model/user.js";

const createNote = (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).json({ message: "Title and content cannot be empty!" });
    return;
  }
  const username = req.params.username;
  User.findOne({
    username: username
  })
    .exec((err, user) => {
      const note = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: user._id
      });
      note
      .save(note)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating the note."
        });
      });
  });
};
////////////////Update///////////////////////

const updateNote = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update note with id=${id}. Note was not found!`
          });
        } else
          res.send({ message: "Note was updated successfully!" });
      })
      .catch(err => {
        res.status(500).send({
          message: `Error occurred while updating note with id=${id}.`
        });
      });
  };
  //////////////////////////Delete///////////////////////////////////
  const deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete note with id=${id}. Note was not found!`
          });
        } else {
          res.send({
            message: "Note was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete note with id=${id}.`
        });
      });
  };

//////////////////////Get/////////////////////////
const getNote = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: `Not found note with id=${id}.` });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `Error fetching note with id=${id}` });
      });
  };
  ///////////////////Get_All/////////////////////

  const getAllNotes = (req, res) => {
    const username = req.params.username;
    User.findOne({
      username: username
    })
      .exec((err, user) => {
        Note.find({userId: user._id}).sort({date: -1})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).json({
            message:
              err.message || "Some error occurred while fetching notes."
          });
        });
      });
  };
  export default {
    createNote,
    updateNote,
    deleteNote,
    getNote,
    getAllNotes
  }