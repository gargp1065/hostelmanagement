import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "",
      dob: "",
      father_name: "",
      mother_name: "",
      telnum: "",
      address: "",
      father_telnum: "",
      guardian_name: "",
      guardian_telnum: "",
      guardian_add: "",
      email: "",
      password: "",
      password2: "",
      category: "",
      mother_telnum: "",
      father_occupation: "",
      mother_occupation: "",
      guardian_relation: "",
      college_name: "",
      course: "",
      admission_year: "",
      duration: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      category: this.state.category,
      name: this.state.name,
      gender: this.state.gender,
      dob: this.state.dob,
      father_name: this.state.father_name,
      mother_name: this.state.mother_name,
      telnum: this.state.telnum,
      address: this.state.address,
      father_telnum: this.state.father_telnum,
      mother_telnum: this.state.mother_telnum,
      father_occupation: this.state.father_occupation,
      mother_occupation: this.state.mother_occupation,
      guardian_name: this.state.guardian_name,
      guardian_telnum: this.state.guardian_telnum,
      guardian_add: this.state.guardian_add,
      guardian_relation: this.state.guardian_relation,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      college_name: this.state.college_name,
      course: this.state.course,
      admission_year: this.state.admission_year,
      duration: this.state.duration
    };
    // console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    // const { errors } = this.state;

    return (
      
      <div className="register mid container">
        <div>
          <div>
            <div>
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div>
                  <h5>Candidate Details</h5>
                  <br></br>
                  <div className="row">
                    
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="name"> Name</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      {/* {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="dob">D.O.B</label>
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="D.O.B"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.onChange}
                      />
                      {/* {errors.dob && (
                        <div className="invalid-feedback">{errors.dob}</div>
                      )} */}
                    </div>
                  </div>
                  <div className="row"> 
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Gender"
                        name="gender"
                        value={this.state.gender}
                        onChange={this.onChange}
                      >
                      <option value>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>  
                      </select>
                      {/* {errors.gender && (
                        <div className="invalid-feedback">{errors.gender}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Category"
                        name="category"
                        value={this.state.category}
                        onChange={this.onChange}
                      >
                      <option value>Select Cateogry</option>
                      <option value="general">General</option>
                      <option value="st">ST</option>
                      <option value="sc">SC</option>
                      <option value="obc  ">OBC</option>  
                      </select>
                      {/* {errors.category && (
                        <div className="invalid-feedback">{errors.category}</div>
                      )} */}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                      placeholder="Address"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                    {/* {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )} */}
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="telnum">Candidate Number</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Contact Number"
                        name="telnum"
                        value={this.state.telnum}
                        onChange={this.onChange}
                      />
                      {/* {errors.telnum && (
                        <div className="invalid-feedback">{errors.telnum}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      {/* {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )} */}
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      {/* {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="password2">Confirm Password</label>
                      <input
                        type="password"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                      />
                      {/* {errors.password && (
                        <div className="invalid-feedback">{errors.password2}</div>
                      )} */}
                    </div>
                  </div>
                </div>

                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                <div>
                  <h5>Family Details</h5>
                  <br></br>
                  
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="father_name">Father Name</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Father Name"
                        name="father_name"
                        value={this.state.father_name}
                        onChange={this.onChange}
                      />
                      {/* {errors.father_name && (
                        <div className="invalid-feedback">{errors.father_name}</div>
                      )} */}
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="mother_name">Mother Name</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Mother Name"
                        name="mother_name"
                        value={this.state.mother_name}
                        onChange={this.onChange}
                      />
                      {/* {errors.mother_name && (
                        <div className="invalid-feedback">{errors.mother_name}</div>
                      )} */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="father_telnum">Father Number</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Father Number"
                        name="father_telnum"
                        value={this.state.father_telnum}
                        onChange={this.onChange}
                      />
                      {/* {errors.father_telnum && (
                        <div className="invalid-feedback">{errors.father_telnum}</div>
                      )} */}
                    </div>

                    <div className="form-group col-md-6 col-sm-12 ">
                      <label htmlFor="mother_telnum">Mother Numer</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Mother Numer"
                        name="mother_telnum"
                        value={this.state.mother_telnum}
                        onChange={this.onChange}
                      />
                      {/* {errors.mother_telnum && (
                        <div className="invalid-feedback">{errors.mother_telnum}</div>
                      )} */}
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12 ">
                      <label htmlFor="father_occupation">Father Occupation</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Father Occupation"
                        name="father_occupation"
                        value={this.state.father_occupation}
                        onChange={this.onChange}
                      />
                      {/* {errors.father_occupation && (
                        <div className="invalid-feedback">{errors.father_occupation}</div>
                      )} */}
                    </div>

                    <div className="form-group col-md-6 col-sm-12 ">
                      <label htmlFor="mother_occupation">Mother Occupation</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Mother Occupation"
                        name="mother_occupation"
                        value={this.state.mother_occupation}
                        onChange={this.onChange}
                      />
                      {/* {errors.mother_occupation && (
                        <div className="invalid-feedback">{errors.mother_occupation}</div>
                      )} */}
                    </div>
                  </div>
                </div>

                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                
                <div>
                  <h5>Guardian Details</h5>
                  <br></br>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="guardian_name">Guardian Name</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Guardian Name"
                        name="guardian_name"
                        value={this.state.guardian_name}
                        onChange={this.onChange}
                      />
                      {/* {errors.guardian_name && (
                        <div className="invalid-feedback">{errors.guardian_name}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="guardian_relation">Relation</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Relation"
                        name="guardian_relation"
                        value={this.state.guardian_relation}
                        onChange={this.onChange}
                      />
                      {/* {errors.guardian_relation && (
                        <div className="invalid-feedback">{errors.guardian_relation}</div>
                      )} */}
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label htmlFor="guardian_telnum">Contact Numer</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Contact Number"
                        name="guardian_telnum"
                        value={this.state.guardian_telnum}
                        onChange={this.onChange}
                      />
                      {/* {errors.guardian_telnum && (
                        <div className="invalid-feedback">{errors.guardian_telnum}</div>
                      )} */}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardian_add">Address</label>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                      placeholder="Address"
                      name="guardian_add"
                      value={this.state.guardian_add}
                      onChange={this.onChange}
                    />
                    {/* {errors.guardian_add && (
                      <div className="invalid-feedback">{errors.guardian_add}</div>
                    )} */}
                  </div>
                </div>   


                <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>

                <div>
                  <h5>College Details</h5>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="college_name">College Name</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="College Name"
                        name="college_name"
                        value={this.state.college_name}
                        onChange={this.onChange}
                      />
                      {/* {errors.college_name && (
                        <div className="invalid-feedback">{errors.college_name}</div>
                      )} */}
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="course">Course</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Course"
                        name="course"
                        value={this.state.course}
                        onChange={this.onChange}
                      />
                      {/* {errors.course && (
                        <div className="invalid-feedback">{errors.course}</div>
                      )} */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="admission_year">Admission Year</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Admission Year"
                        name="admission_year"
                        value={this.state.admission_year}
                        onChange={this.onChange}
                      />
                      {/* {errors.admission_year && (
                        <div className="invalid-feedback">{errors.admission_year}</div>
                      )} */}
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label htmlFor="duration">Duration</label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="Duration of Course"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.onChange}
                      />
                      {/* {errors.duration && (
                        <div className="invalid-feedback">{errors.duration}</div>
                      )} */}
                    </div>
                  </div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { registerUser }
)(withRouter(Register));
