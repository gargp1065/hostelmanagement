const router = require('express').Router();
const passport = require('passport')

// Student models
const Student = require("../../models/Student")
const Users = require("../../models/Users")
const Complaint  = require("../../models/Complaint")

const { response } = require('express');


///To get Information of all alloted students for admin page

router.get('/details', passport.authenticate('jwt', {session: false}), (req, res) => {
  let response = []; 
  Student.find({}).then(students => {
    return res.status(200).json(students.filter(({room_alloted}) => room_alloted));
  }).catch(err => console.log("Error while fetching data"))
})

// To get all unalloted students

router.get('/unallotedStudents', passport.authenticate('jwt', {session: false}), (req, res) => {
  let response = [];
  Student.find({}).then(students => {
    return res.status(200).json(students.filter(({room_alloted}) => !room_alloted)); 
  })
})

// To allot a student a room
router.put('/allotRoom', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  var arr = [];
  Student.find({'room_alloted': true}).then(students => {
    students.map(student => {
      arr.push(student.room_number);
    })
    var sum=0;
    for(var i=0; i<arr.length; i++) {
      sum += arr[i];
    }
    console.log(arr);
    roomNumber = ((arr.length+2)*(arr.length+1))/2 - sum;
    if(roomNumber == 0)
      roomNumber = 1;
    const {id} = req.body;
    console.log(id);
    console.log(`Room number ${roomNumber}`)
    Student.findByIdAndUpdate(id, {$set: {"room_number": roomNumber, "room_alloted": true}})
      .then((data) => {
        // console.log(data)
        res.status(200).json({ message: 'Room Alloted', success: true })})    
    .catch((err) => {return next(err)}) 
  })
})

// POST


router.get('/all', (req, res) => {
  Users.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch all students' }))
})


///To post a complaint of a Student
router.post('/complaint', passport.authenticate('jwt', {session : false}),  (req, res) => {
  // console.log(req.body)
  const { email } = req.body;
  // console.log(req.body.complaint)
  const newObject = {
    cType: req.body.cType, 
    userComplaint: req.body.complaint,
  }
  Complaint.findOne({email: email}).then(user => {
    //console.log(user)
    if(user === null) {
      const newComplaint = {
        name: req.body.name, 
        email: req.body.email,
        room_number: req.body.room_number,
        complaints: [newObject]
      }
      const newCompPost = new Complaint(newComplaint);
      //console.log(newCompPost.complaints)
      newCompPost.save() 
      .then(resp => {
        console.log(resp)
        return res.json(resp);
      }).catch(err => console.log("Error Occured while posting new entry"))
    }
    else {
      user.complaints.push(newObject);
      user.save()
      .then(resp => {
        return res.json(resp);
      }).catch(err => console.log("Error Occured while existing user posting Complaint"))
    }
  }).catch(err => console.log("Error Occured while posting Complaint"))
})

///To get all the complaints for a particular user

router.get('/complaint/:email', passport.authenticate('jwt', {session: false}), (req, res)=>{
  // console.log(req.body);
  const { email } = req.params;
  Complaint.findOne({email: email}).then(allComplaints => {
    // console.log(allComplaints);
    res.json(allComplaints);
  })
  .catch(err => console.log({error :"Failed", err}))
})

router.post('/adminComplaint/changeStatus', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {id1, id2} = req.body;
  console.log(id2);
  Complaint.findById(id1).then(complaint => {
    console.log(complaint.complaints.length)
    for(var i=0;i<complaint.complaints.length;i++) {
      console.log(complaint.complaints[i]);
      if(complaint.complaints[i]._id == id2) {
        console.log(1077);
        console.log(complaint.complaints[i]);
        complaint.complaints[i].status = 'Approved'
        complaint.save().then(resp => {
          return res.json(resp)
        }).catch(err => {
          console.log("Error Occured")
        })
      }
    }
    // return res.json(complaint);
    console.log(complaint);
  }).catch(err => {return res.json("Error Occured")})
})



//To get all the complaints for admin 


router.get('/complaintAdmin/:findBy', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.params)
  const {findBy} = req.params;
  let resp = [];
  Complaint.find({}).then(allComplaints =>{
    if(allComplaints.length > 0) {
      for(var i=0; i<allComplaints.length; i++) {
        if(allComplaints[i].complaints.length > 0) {
          for(var j=0; j<allComplaints[i].complaints.length; j++) {
            if(allComplaints[i].complaints[j].status === findBy) {
              let temp = {
                id: allComplaints[i]._id,
                name: allComplaints[i].name, 
                email: allComplaints[i].email, 
                room_number: allComplaints[i].room_number,
                complaint: allComplaints[i].complaints[j]
              }
              resp.push(temp);
            }
          }
        } 
      }
    }
    // console.log(resp);
    res.json(resp)
  })
})
module.exports = router;

