const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.dob= !isEmpty(data.dob) ? data.dob : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.father_name = !isEmpty(data.father_name) ? data.father_name : "";
  data.mother_name = !isEmpty(data.name) ? data.mother_name : "";
  data.telnum = !isEmpty(data.telnum) ? data.telnum : "";
  data.address = !isEmpty(data.address) ? data.address: "";
  data.father_telnum = !isEmpty(data.father_telnum) ? data.father_telnum : "";
  data.mother_telnum = !isEmpty(data.mother_telnum) ? data.mother_telnum : "";
  data.father_occupation = !isEmpty(data.father_occupation) ? data.father_occupation : "";
  data.mother_occupation = !isEmpty(data.mother_occupation) ? data.mother_occupation : "";
  data.guardian_name = !isEmpty(data.guardian_name) ? data.guardian_name : "";
  data.guardian_telnum = !isEmpty(data.guardian_telnum) ? data.telnum : "";
  data.guardian_add = !isEmpty(data.guardian_add) ? data.guardian_add : "";
  data.guardian_relation = !isEmpty(data.guardian_relation) ? data.guardian_relation : "";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.college_name = !isEmpty(data.college_name) ? data.college_name : "";
  data.admission_year = !isEmpty(data.admission_year) ? data.admission_year : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";


  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 Characters";
  }


  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is Required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be 8 characters long";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must be same";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required.";
  }

  if(Validator.isEmpty(data.dob)) {
    errors.dob = "DOB is required";
  }

  if(Validator.isEmpty(data.category)) {
    errors.category = "Category is required";
  }
  
  if(Validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required";
  }
  
  if(Validator.isEmpty(data.father_name)) {
    errors.father_name = "Father Name is required";
  }
  
  if(Validator.isEmpty(data.mother_name)) {
    errors.mother_name = "Mother Name is required";
  }
  
  if(Validator.isEmpty(data.telnum)) {
    errors.telnum = "Telnum is required";
  }


  if(Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }
  
  if(Validator.isEmpty(data.father_telnum)) {
    errors.father_telnum = "Telnum is required";
  }


  if(Validator.isEmpty(data.mother_telnum)) {
    errors.mother_telnum = "Telnum is required";
  }



  if(Validator.isEmpty(data.father_occupation)) {
    errors.mother_telnum = "Occupation is required";
  }

  if(Validator.isEmpty(data.mother_occupation)) {
    errors.mother_telnum = "Occupation is required";
  }

  if(Validator.isEmpty(data.guardian_name)) {
    errors.mother_telnum = "Name is required";
  }

  if(Validator.isEmpty(data.guardian_add)) {
    errors.guardian_add = "Address is required";
  }

  if(Validator.isEmpty(data.guardian_telnum)) {
    errors.guardian_telnum = "Telnum is required";
  }


  if(Validator.isEmpty(data.guardian_relation)) {
    errors.guardian_relation = "Relation is required";
  }

  if(Validator.isEmpty(data.college_name)) {
    errors.college_name = "College Name is required";
  }

  if(Validator.isEmpty(data.course)) {
    errors.course = "Telnum is required";
  }

  if(Validator.isEmpty(data.duration)) {
    errors.duration = "Duration is required";
  }

  if(Validator.isEmpty(data.admission_year)) {
    errors.admission_year = "Admission Year is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
