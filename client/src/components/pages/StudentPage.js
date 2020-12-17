import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {Button, Modal, ModalHeader, ModalBody, Table} from 'reactstrap'
import classnames from "classnames";
import axios from 'axios'

import ComplaintModal from '../pages/ComplaintModal'

const staff = require("../../img/staff.jpeg").default;
const leave = require("../../img/leave.jpg").default;
class StudentPage extends Component {
    
    constructor() {
        super()
        this.state ={
            isModalOpen: false,
            isComplaintModalOpen: false,
            complaint: "",
            cType: "",
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleComplaintModal = this.toggleComplaintModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleComplaintModal() {
        this.setState({
            isComplaintModalOpen: !this.state.isComplaintModalOpen
        });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.toggleModal();
        const newComplaint = {
            email: this.props.auth.user.email,
            name: this.props.auth.user.name,
            room_number: this.props.auth.user.room_number,
            cType: this.state.cType,
            complaint: this.state.complaint
        }
        console.log(newComplaint)
        axios
            .post("/api/student/complaint", newComplaint).then(res => {
                alert("Your complaint has been registered");
                // this.props.history.push("/studentPage")
            }).catch(err => alert("Please try after some time")) 
    }
    render() {
        console.log(staff)
        const { user } = this.props.auth;
        // console.log(user._doc)
        if(!user.room_alloted) {
            return (
                <div className="container">
                    <div className="text-center" style={{ fontSize: "25px" }}>
                        Welcome {user.name} !!!
                    </div>
                    Room Not Alloted Yet.
                    Kindly Wait.
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="text-center" style={{fontSize: "25px"}}>
                        {console.log(this.props.auth.user)}
                        Welcome {user.name} !!!
                    </div>
                    <div style={{ display: 'flex', marginTop: '2rem' }}>
                        <div className="card" style={{ width: "18rem", hover: '', height: '22rem' ,marginRight: '25px'}}>
                            <img src={staff} className="card-img-top" alt="Cleaning" />
                            <div className="card-body">
                                <h5 className="card-title">Raise A Compliant</h5>
                                <div>
                                    <Button onClick={this.toggleModal}>
                                   Raise a Compliant.
                                </Button>
                                <br></br>
                                <Button onClick = {this.toggleComplaintModal}>
                                    View your Complaints
                                </Button>
                                </div>
                                {/* <Button onClick={this.toggleModal}>
                                </Button> */}
                            </div>
                        </div>
                        <div className="card" style={{ width: "18rem", hover: '', height: '22rem' }}>
                            <img src={leave} className="card-img-top" alt="Cleaning" />
                            <div className="card-body">
                                <h5 className="card-title">Apply for holiday</h5>
                                <button className="btn btn-primary" onClick={this.toggleModal}>
                                    
                                </button>
                                <Button className="btn-primary" onClick = {this.toggleComplaintModal}>
                                    Apply
                                </Button>
                                {/* <Button onClick={this.toggleModal}>
                                </Button> */}
                            </div>
                        </div>
                    </div>
                    <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Complaint</ModalHeader>
                    <ModalBody>
                        
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="cType">Choose the type</label>
                            <select
                                type="text"
                                className={classnames("form-control form-control-lg")}//,{
                                //   "is-invalid": errors.duration
                                // })}
                                placeholder="cType"
                                name="cType"
                                value={this.state.cType}
                                onChange={this.onChange}
                            >
                            <option value>Select Type</option>
                            <option value="elctrical">Electrical</option>
                            <option value="mess">Mess</option>
                            <option value="cleaning">Cleaning</option>  
                            </select>

                            <label htmlFor="complaint">Type your Complaint</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="complaint"
                                name="complaint"
                                value={this.state.complaint}
                                onChange={this.onChange}
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>                         
                    </ModalBody>
                </Modal>
                <ComplaintModal email={this.props.auth.user.email} isModalOpen={this.state.isComplaintModalOpen} toggleModal={this.toggleComplaintModal}></ComplaintModal>
               </div>
            )
        }
    }
}


const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect (
    mapStatesToProps
)(withRouter(StudentPage))

