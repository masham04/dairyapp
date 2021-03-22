import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    const token = jwt.sign({ id: user._id }, "top-secret", {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};

export const signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid password!",
      });
    }
    const token = jwt.sign({ id: user._id }, "top-secret", {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};
