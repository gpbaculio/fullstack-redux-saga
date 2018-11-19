import jwt from "jsonwebtoken";
import User from "../models/User";

export default (req, res, next) => {
  const header = req.headers.authorization; // token wil be injected on header if found on localStorage
  console.log('req.headers =', req.headers)
  let token;

  if (header) {
    token = header.split(" ")[1];
    console.log('token = ', token)
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
