const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  admin: {
    type: Boolean,
    default: false,
    // required: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  telnum: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  father_name: {
    type: String,
    required: true
  },
  mother_name: {
    type: String,
    required: true
  },
  father_telnum: {
    type: String,
    required: true
  },
  mother_telnum: {
    type: String,
    required: true
  },
  father_occupation: {
    type: String,
    required: true
  },
  mother_occupation: {
    type: String,
    required: true
  },
  guardian_name: {
    type: String,
    required: true
  },
  guardian_add: {
    type: String,
    required: true
  },
  guardian_telnum: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  guardian_relation: {
    type: String,
    required: true
  },
  college_name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  admission_year: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  room_alloted: {
    type: Boolean,
    default: false
  },
  room_number: {
    type: Number,
    default: 0
  }
});

module.exports = Student = mongoose.model("student", StudentSchema);
