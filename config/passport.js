const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// const { default: Student } = require("../client/src/components/pages/Student");
const Student = mongoose.model("student");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;




module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload.email);  
      Student.findOne({email: jwt_payload.email})
        .then(user => {
          if (user) {
            // console.log(user)
            return done(null, user);
          }
          else {
            User.findOne({email: jwt_payload.email})
            .then(user => {
              if(user) {
                return done(null, user);
              }
              return done(null, false);
            })
          }
          
        })
        .catch(err => console.log(err));
    })
  );
};
