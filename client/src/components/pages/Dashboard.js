import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import {Link} from 'react-router-dom'


// const clean = require("../../img/cleaning.jpg");
const student = require("../../img/student.jpg").default;
const staff = require("../../img/staff.jpeg").default;
const bedRoom = require("../../img/cleaning1.jpg").default;
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;
    // console.log(this.props.auth)
    return (
      <div className="mid container">
        <div className="text-center" style={{ fontSize: "25px" }}>
          Welcome {user.name}!
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>

          <div className="card hoverable" style={{border: "1px solid black", width: "20rem", hover: '', height: '23rem' }}>
            <img src={student} className="card-img-top" alt="Cleaning" style={{height: '325px'}}/>
            <div className="card-body" style={{ height: '10rem' }}>
              <h5 className="card-title">Student</h5>
              <Link to="/student" className="card-text">
                Add new Student and Allot Room or Check Info
              </Link>
            </div>
          </div>

          <div className="card" style={{ border: "1px solid black", width: "20rem", hover: '', height: '23rem' }}>
            <img src={bedRoom} className="card-img-top" alt="Cleaning" style={{height: '225px'}}/>
            <div className="card-body" style={{ height: '10rem' }}>
              <h5 className="card-title">Room Repair/Cleaning Status</h5>
              <Link to="/block">
                  Room Repair/Cleaning or Check Info
                </Link>
            </div>
          </div>

          <div className="card" style={{ border: "1px solid black", width: "20rem", hover: '', height: '23rem' }}>
            <img src={staff} className="card-img-top" alt="Cleaning" style={{height: '311px'}}/>
            <div className="card-body" style={{ height: '10rem' }}>
              <h5 className="card-title">Staff Info</h5>
              <Link to="/staff">
                Add Staff or Check their info
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  { getCurrentUser }
)(Dashboard);
