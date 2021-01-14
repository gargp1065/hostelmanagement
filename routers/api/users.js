const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const brcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/Users");
const Student = require("../../models/Student");

// @route GET api/users/test
// @desc Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "It works!!" }));

// @route POST api/users/registers
// @desc Registers users
// @access  Public
router.post("/register", (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  console.log(errors);
  if(!isValid) 
    return res.status(400).json(errors);
  Student.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new Student({  
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        gender: req.body.gender,
        dob: req.body.dob,
        father_name: req.body.father_name,
        mother_name: req.body.mother_name,
        telnum: req.body.telnum,
        address: req.body.address,
        father_telnum: req.body.father_telnum,
        mother_telnum: req.body.mother_telnum,
        father_occupation: req.body.father_occupation,
        mother_occupation: req.body.mother_occupation,
        guardian_name: req.body.guardian_name,
        guardian_telnum: req.body.guardian_telnum,
        guardian_add: req.body.guardian_add,
        guardian_relation: req.body.guardian_relation,
        college_name: req.body.college_name,
        course: req.body.course,
        admission_year: req.body.admission_year,
        duration: req.body.duration
      });
      brcrypt.genSalt(10, (err, salt) => {
        brcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          (newUser.password = hash),
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
        });
      });
    }
  });
});


router.post('/registerAdmin', (req, res) => {
  User.findOne({email: req.body.email}).then(user =>{
    if(user) {
      return res.status(400).json("Email Already exist")
    }
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      admin: req.body.admin
    })  
    brcrypt.genSalt(10, (err, salt) => {
      brcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        (newUser.password = hash), 
          newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      })
    })
  })
})





router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if(!isValid)
    return res.status(400).json(errors);
  User.findOne({email})
  .then(user => {
    console.log(user);  
    if(user) {
      brcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
          const payload = {id: user.id, email: user.email, admin: user.admin, name: user.name}
          jwt.sign(
            payload, 
            keys.secretOrKey, 
            {expiresIn: 8200}, 
            (err, token) => {
              res.json({
                success: true, 
                token: "Bearer " + token
              });
            }
          )
        }
        else {
          errors.password = "Password Incorrect"
          return res.status(400).json(errors);
        }
      }).catch(errors => res.status(400).json(errors))
    }
    else {
      Student.findOne({email})
      .then(user => {
        if(user) {
          brcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
              const payload = {id: user.id, name: user.name, email: user.email, room_alloted: user.room_alloted, admin: user.admin, room_number: user.room_number};
              jwt.sign(
                payload, 
                keys.secretOrKey,
                {expiresIn: 8200},
                (err, token) =>{
                  res.json({
                    success: true, 
                    token: "Bearer " + token
                  });
                }
              )
            }
            else {
              errors.password = "Password Incorrect"
              return res.status(404).json(errors)
            }
          }).catch(errors => res.status(400).json(errors));
        }
        else {
          errors.email = "User Not Found"
          return res.status(400).json(errors);
        }
      }).catch(errors => res.status(400).json(errors))
    }
  })

})




// @route GET api/users/current
// @desc Return Current User
// @access  Private
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
