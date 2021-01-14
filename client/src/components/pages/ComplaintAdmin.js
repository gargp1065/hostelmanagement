import axios from 'axios'
import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';


class ComplaintAdmin extends Component {
    constructor() {
        super();
        this.state = {
            findBy: "", 
            loading: true,
            data: [], 
            isModalOpen: false, 
            openComplaint: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onFetchDetails = this.onFetchDetails.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeComplaintStatus = this.changeComplaintStatus.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    onChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value
        })
    }
    async changeComplaintStatus(e) {
        e.preventDefault();
        this.setState({loaing: true});
        const obj = {
            id1: this.state.openComplaint.id, 
            id2: this.state.openComplaint.complaint._id
        }
        axios.post(`api/student/adminComplaint/changeStatus`, obj).then(res => {
            alert("The Complaint has been Approved");
            console.log(res)
            const complaintIndex = this.state.data.findIndex(({ id }) => id === obj.id1)
            console.log([...this.state.data.slice(0, complaintIndex), { ...this.state.data[complaintIndex], status: 'Approved' }, ...this.state.data.slice(complaintIndex + 1)])
            this.setState({
                data: [...this.state.data.slice(0, complaintIndex), ...this.state.data.slice(complaintIndex + 1)]    
            })
            this.toggleModal(); 

        }).catch(err => {alert("Please try after some time")})
        console.log(e);

    }
    async onFetchDetails() {
        this.setState({loading: false})
        if(this.state.findBy === 'Approved') {
            await axios.get(`api/student/complaintAdmin/${this.state.findBy}`).then(res => {
                console.log(res);
                this.setState({
                    data: res.data, 
                    loading: false
                })
            })
            .catch()
        }
        else if(this.state.findBy === 'Unapproved') {
            // console.log(22)
            await axios.get(`api/student/complaintAdmin/${this.state.findBy}`).then(res =>{
                // console.log(res);
                this.setState({
                    data: res.data,
                    loading: false
                })
            }).catch()
        }
    }

    render() {
        let tableContent;
        tableContent = (!this.state.data) ? null : (
            this.state.data.map((complaint,index) => 
                <tr key={index}>
                    <th scope="row">{this.state.data.indexOf(complaint) + 1}</th>
                    <td>{complaint.name ? complaint.name  : '-'}</td>
                    <td>{complaint.email ? complaint.email : '-'}</td>
                    <td>{complaint.room_number ? complaint.room_number : '-'}</td>
                    <td style={{ cursor: 'pointer'}}
                        onClick={() => {
                            this.toggleModal()
                            this.setState({
                                openComplaint: complaint
                            })
                        }}
                        className="fas fa-info">
                    </td>
                </tr>    
            )
        )
        return (
            <div className="mid container">
                <label htmlFor="find" style={{ marginLeft: '14px' }}><h5>Display Compalints of Students</h5></label>
                <div className="col-8 input-group-prepend">
                    <select className="form-control"
                        id="find" onChange={this.onChange} value={this.state.findBy}
                        name="findBy"
                    >   <option value="" defaultValue disabled>Select</option>
                        <option value="Approved">Approved</option>
                        <option value="Unapproved">Unapproved</option>
                    </select>
                    <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }} onClick={this.onFetchDetails}>Find Details</button>
                </div>
                <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                    {!this.state.loading ? <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Room No.</th>
                                <th scope="col">Complaints</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>
                    }
                </div>
                
                <Modal style={{margin: '20rem auto'}} isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Complaint Details</ModalHeader>
                    <ModalBody>
                        
                        <div>
                            <b>Complaint Type: </b><p2>{this.state.openComplaint.complaint && this.state.openComplaint.complaint.cType}</p2>
                            {/* {console.log(this.state.openComplaint)} */}
                        </div>
                        <div>
                        <b>Complaint Body: </b><p2>{this.state.openComplaint.complaint && this.state.openComplaint.complaint.userComplaint}</p2>
                        </div>


                    {this.state.openComplaint.complaint && this.state.openComplaint.complaint.status === 'Unapproved' && <button className="btn btn-secondary" onClick={this.changeComplaintStatus}>Approve</button>}  
                    <button className="btn-small btn-primary" onClick={this.toggleModal} style={{marginLeft: '190px'}}>Cancel</button>
                    </ModalBody>
                </Modal>


            </div>
            
        )
    }
}

export default ComplaintAdmin