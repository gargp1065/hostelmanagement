import axios from 'axios';
import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import {Button, Modal, ModalHeader, ModalBody, Table} from 'reactstrap'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
class ComplaintModal extends Component {
    constructor() {
        super()
        this.state = {
            dataFetched: false,
            complaints: []
                
        }
        // this.toggleModal = this.toggleModal.bind(this); 
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        if(nextProps.isModalOpen) {
            axios
        .get(`/api/student/complaint/${this.props.auth.user.email}`).then(res =>{
                this.setState({
                    complaints: res.data.complaints,
                    dataFetched: true
                })
            })
        }
    }
    render() {

        return (

            <Modal isOpen = {this.props.isModalOpen} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>Your Complaints</ModalHeader>
                <ModalBody>
                        {this.state.dataFetched && <Table>
                            {/* {console.log(this.state.complaints)}s */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Complaint</th>
                                    <th> Status</th>
                                </tr>
                            </thead>
                            <tbody>  
                                {this.state.complaints.map(({cType, userComplaint, status}, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{cType}</td>
                                        <td>{userComplaint}</td>
                                        <td>{status}</td>
                                    </tr>
                                    )
                                )}
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Electrical</td>
                                    <td>otto</td>
                                    <td>dfkn</td>
                                </tr> */}
                            </tbody>
                        </Table>}
                        {!this.state.dataFetched && <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
                    </ModalBody> 
                </Modal>
        )
    }
}


const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect (
    mapStatesToProps
)(withRouter(ComplaintModal))
