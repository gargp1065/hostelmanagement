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
const student = require("../../validation/student");

// @route GET api/users/test
// @desc Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "It works!!" }));

// @route POST api/users/registers
// @desc Registers users
// @access  Public
router.post("/register", (req, res) => {
  // console.log(res.json());
  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // User.findOne({ email: req.body.email})
  // .then(user => {
  //   if(user) {
  //     errors.email = "Email Already Exists";
  //     return res.status(400).json(errors);
  //   }
  //   else {
  //     const avatar = gravatar.url(req.body.email, {
  //       s: "200", // Size
  //       r: "pg", // Rating
  //       d: "mm" // Default
  //     })
  //     const newUser =  User({
  //       name: req.body.name, 
  //       email: req.body.email,
  //       password: req.body.password,
  //     })
  //     console.log(newUser)
  //     brcrypt.genSalt(10, (err, salt) => {
  //       brcrypt.hash(newUser.password, salt, (err, hash) => {
  //         if (err) throw err;
  //         (newUser.password = hash),
  //           newUser
  //             .save()
  //             .then(user => res.json(user))
  //             .catch(err => console.log(err));
  //       });
  //     });
  //   }
  // })
  Student.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // errors.email = "Email Already Exists";
      return res.status(400).json("Email Already Exists");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new Student({  
        name: req.body.name,
        // user_name: req.body.user_name,
        email: req.body.email,
        avatar,
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
        // email: this.state.email,
        // password: this.state.password,
        // password2: this.state.password2,
        college_name: req.body.college_name,
        course: req.body.course,
        admission_year: req.body.admission_year,
        duration: req.body.duration
      });
      // console.log(newUser)
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


// @route POST api/users/login
// @desc Login user / Returning JWT Token
// @access  Public
// router.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const { errors, isValid } = validateLoginInput(req.body);

//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   // Find user by email
//   Student.findOne({ email }).then(user => {
//     // Check for user
//     if (!user) {
//       errors.email = "User not found";
//       return res.status(404).json(errors);
//     }
//     // Check Password
//     brcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User Matched

//         Student.findOne({email}, 'name room_alloted email category gender dob father_name mother_name telnum address father_num course admission_year admin room_number').then(student => {
//           const payload = {...student._doc};

//           console.log(payload)
//           jwt.sign(
//             payload, keys.secretOrKey,
//             {expiresIn: 7200},
//             (err, token) => {
//               // console.log(err)
//               // console.log(token)
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               })
//             }
//           )
//         });

//         // const payload = { id: user.id, name: user.name, avatar: user.avatar, admin: user.admin  }; // Create JWT Payload

//         // // Sign Token
//         // jwt.sign(
//         //   payload,
//         //   keys.secretOrKey,
//         //   { expiresIn: 7200 },
//         //   (err, token) => {
//         //     res.json({
//         //       success: true,
//         //       token: "Bearer " + token
//         //     });
//         //   }
//         // );
//       } else {
//         errors.password = "Password Incorrect";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });





router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  User.findOne({email})
  .then(user => {
    // console.log(user);
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
      })
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
              error.password = "Password Incorrect"
              return res.status(400).json(errors)
            }
          })
        }
        else {
          errors.email = "User Not Found"
          return res.status(400).json(errors);
        }
      })
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
