const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const User = require("../../models/User");

const Validator = require("validator");
const isEmpty = require("is-empty");


//HELPERRMETHODS
function validateLoginInput(data) {
let errors = {};

data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";

if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
} else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
}

if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};


function validateRegisterInput(data) {
let errors = {};

data.name = !isEmpty(data.name) ? data.name : "";
data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";
data.password2 = !isEmpty(data.password2) ? data.password2 : "";
data.admin = !isEmpty(data.admin) ? data.admin: "";

if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
}


if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
} else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
}

if(Validator.isEmpty(data.admin)){ 
    errors.admin = "Admin Role is required";
}


if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
}
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
}
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
}
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
}
return {
    errors,
    isValid: isEmpty(errors)
  };
};


// MAIN
router.post("/register", (req, res) =>{
    const{ errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
    // Hash 
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    });

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
const password = req.body.password;
const admin = req.body.admin;


User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// 
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

// 
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });

      }
    });
  });
});

module.exports = router;
