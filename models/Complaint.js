const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var complaintScehma = new Schema({
    cType: {
        type: String, 
        required: true
    },
    userComplaint: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        default: "Unapproved"
    } 
})

const ComplaintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    room_number: {
        type:  Number,
        required: true
    },
    complaints: [complaintScehma] 
    
})

module.exports = Complaint = mongoose.model("complaint", ComplaintSchema);