import jwt from "jsonwebtoken";
import User from "../models/User";

export default (req, res, next) => {
  const { authorization } = req.headers; // token wil be injected on header if found on localStorage

  let token;

  if (authorization) {
    token = authorization.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: "Something went wrong. Please log in again." } });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};
