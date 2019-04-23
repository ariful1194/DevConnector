const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// bring User MOdel here
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({
    msg: "users test"
  });
});

//@route  Post api/users/register
//@desc   Register A User
//@access PUblic
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email Already Exist!";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //size
          r: "jp", //Rating
          d: "mm" // Default
        });

        newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch();
});

//@route  Post api/users/login
//@desc   User Login // create jwt
//@access PUblic\
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find the user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User Not Found!";
        return res.status(404).json(errors);
      }

      //check passpord
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create jwt payload
          //sign token

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 5555 },
            (err, token) => {
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          errors.password = "Password Incorrect!";
          return res.status(400).json(errors);
        }
      });
    })
    .then();
});

//@route  GET api/users/current
//@desc   Return Current User
//@access Private\
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
