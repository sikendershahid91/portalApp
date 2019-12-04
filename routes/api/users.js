const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

//HELPER METHODS
const Validator = require("validator");
const isEmpty = require("is-empty");
function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";


if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
}


if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
} else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
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

//MAIN
router.post("/register", (req, res) =>){
    const{ errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email }).then(used => {
        if(used){
            return res.status(400).json({email: "Email already exists."
        });
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        }
    })

}
