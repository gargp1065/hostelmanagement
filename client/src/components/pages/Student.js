import React, { Component } from 'react';
import classnames from "classnames";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
// import { countDocuments } from '../../../../models/Users';

class Student extends Component {
    constructor(props) {
        super(
            
        );
        this.state = {
            findBy: '',
            val: '',
            data: [],
            loading: true,
            errors: {},
            isModalOpen: false, 
            openStudent: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onFetchDetails = this.onFetchDetails.bind(this);
        this.allotRoom = this.allotRoom.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    componentDidMount() {
        axios.get("/api/student/details")
        .then(res => {
            this.setState({
                loading: false,
                data: res.data
            })
        })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onFetchDetails() {
        this.setState({loading: true});
        if(this.state.findBy === 'alloted') {
            await axios.get('/api/student/details')
            .then((res) => {
                if(!res.data.length)  {
                    alert("No room alloted");
                }
                this.setState({
                    data: res.data,
                    loading: false
                })
            }).catch(err => console.log(err));
        }
        else if(this.state.findBy === 'unalloted') {
            await axios.get('api/student/unallotedStudents')
            .then((res) => {
                if(!res.data.length) {
                    alert("No new application");
                }
                this.setState({
                    data: res.data,
                    loading: false
                })
            })
        }
        else {
            this.setState({loading: false})
            alert("Select any option")
        }
    }

    async allotRoom(id) {
        this.setState({loading: true});
        let obj = {
            id: id
        }
        await axios.put('api/student/allotRoom', obj)
        .then((res) => {
            console.log(res);
            const allotIndex = this.state.data.findIndex(({ id }) => id === obj.id)
            this.setState({
                loading: false,
                data: [...this.state.data.slice(0, allotIndex), ...this.state.data.slice(allotIndex + 1)]   
            })
        })
    }

    render() {
        const { errors, data, loading } = this.state;
        console.log(data)
        console.log(loading)
        let tableContent;
        (!data) ? (
            tableContent = null
        ) : tableContent = data ? data.map(
            el =>
                <tr key={el._id}>
                    <th scope="row">{data.indexOf(el) + 1}</th>
                    <td>{el.name ? el.name : "-"}</td>
                    <td>{el.email ? el.email : "-"}</td>
                    <td>{el.room_number ? el.room_number : "-"}</td>
                    <td>{el.gender ? el.gender : "-"}</td>
                    <td style={{cursor : 'pointer'}} onClick = {() => {
                        this.toggleModal();
                        this.setState({
                            openStudent: el
                        })
                    }} className="fa fa-info"> </td>
                    {!el.room_alloted && <td style={{ cursor: 'pointer', color: '#00a4eb' }}
                        onClick=
                        {() => this.allotRoom(el._id)}
                    >
                        Click Me
                    </td>}
                </tr>
        ) : null

        return (
            <div className="mid container">
                <br />
                <label htmlFor="find" style={{ marginLeft: '14px' }}><h5>Find By</h5></label>
                <div className="col-8 input-group-prepend">
                    <select className={classnames("form-control", {
                        "is-invalid": errors.room
                    })}
                        id="find" onChange={this.onChange} value={this.state.findBy}
                        name="findBy"
                    >   <option value="" defaultValue disabled>Select</option>
                        <option value="alloted">Room Alloted</option>
                        <option value="unalloted">Room Unalloted</option>
                        <option value="isAvailable"></option>
                    </select>
                    <input type="text" id="val" placeholder="Value"
                        className={classnames("form-control", {
                            "is-invalid": errors.room
                        })}
                        onChange={this.onChange}
                        name="val"
                        value={this.state.val}
                        required={true}
                    />
                    {errors.room && (
                        <div className="invalid-tooltip">{errors.room}</div>
                    )}
                    <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }} onClick={this.onFetchDetails}>Find Details</button>
                </div>
                <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                    {!loading ? <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Room No.</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Description</th>
                                {this.state.findBy === 'unalloted' && <th scope ="col">Allot Room</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>
                    }
                </div>
                <Modal style={{margin: '15rem auto'}} isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Student Details</ModalHeader>
                    <ModalBody>
                        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            <div style={{padding: '20px', width: '50%'}}>
                                <h5 style={{textDecoration: 'underline'}}>Personal Details</h5>
                                <div>
                                    <b>Name: </b><p2>{this.state.openStudent && this.state.openStudent.name}</p2>
                                </div>
                                <div>
                                    <b>DOB: </b><p2>{this.state.openStudent && this.state.openStudent.dob}</p2>
                                </div>
                                <div>
                                    <b>Phone Number: </b><p2>{this.state.openStudent && this.state.openStudent.telnum}</p2>
                                </div>
                                <div>
                                    <b>Father Name: </b><p2>{this.state.openStudent && this.state.openStudent.father_name}</p2>
                                </div>
                                <div>
                                    <b>Mother Name: </b><p2>{this.state.openStudent && this.state.openStudent.mother_name}</p2>
                                </div>
                                <div>
                                    <b>Address: </b><p2>{this.state.openStudent && this.state.openStudent.address}</p2>
                                </div>

                                <br></br>
                            </div>
                            <div style={{padding: '20px', width: '50%'}}>
                                <h5 style={{textDecoration: 'underline'}}>Guardian Details</h5>
                                <div>
                                    <b>Guardian Name: </b><p2>{this.state.openStudent && this.state.openStudent.guardian_name}</p2>
                                </div>
                                <div>
                                    <b>Phone Number: </b><p2>{this.state.openStudent && this.state.openStudent.guardian_telnum}</p2>
                                </div>
                                <div>
                                    <b>Address: </b><p2>{this.state.openStudent && this.state.openStudent.guardian_add}</p2>
                                </div>
                                <div>
                                    <b>Relation: </b><p2>{this.state.openStudent && this.state.openStudent.guardian_relation}</p2>
                                </div>
                            </div>
                            <div style={{padding: '20px', width: '50%'}}>
                                <h5 style={{textDecoration: 'underline'}}>College Details</h5>
                                <div>
                                    <b>College Name: </b><p2>{this.state.openStudent && this.state.openStudent.college_name}</p2>
                                </div>
                                <div>
                                    <b>Course: </b><p2>{this.state.openStudent && this.state.openStudent.course}</p2>
                                </div>
                                <div>
                                    <b>Year of Admission: </b><p2>{this.state.openStudent && this.state.openStudent.admission_year}</p2>
                                </div>
                                <div>
                                    <b>Duration: </b><p2>{this.state.openStudent && this.state.openStudent.duration}</p2>
                                </div>
                            </div>



                        </div>
                    
                    <button className="btn btn-primary" onClick={this.toggleModal} style={{marginLeft: '190px'}}>Close</button>
                    </ModalBody>
                </Modal>
            </div>

        );
    }
}

export default Student; 