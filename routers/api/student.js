const router = require('express').Router();
const passport = require('passport')

// Student models
const Student = require("../../models/Student")
const Users = require("../../models/Users")
const Complaint  = require("../../models/Complaint")

const StudentValidation = require('../../validation/student');
const { response } = require('express');

///To get Information of all alloted students for admin page

router.get('/details', passport.authenticate('jwt', {session: false}), (req, res) => {
  let response = []; 
  Student.find({}).then(students => {
    students.map(student => {
      if(student.room_alloted === true) {
        response.push(student)
      }
    })
    return res.status(200).json(students);
  }).catch(err => console.log("Error while fetching data"))
})

// To get all unalloted students

router.get('/unallotedStudents', passport.authenticate('jwt', {session: false}), (req, res) => {
  let response = [];
  Student.find({}).then(students => {
    students.map(student => {
      if(student.room_alloted === false) {
        response.push(student)
      }
    })
    console.log(response);
    return res.status(200).json(response); 
  })
})

// To allot a student a room
// router.post('/allotRoom', passport.authenticate('jwt', {session: false}), (req, res) => {
//   const { room_number, id } = req.body;
//   const 
//   Student.findByIdAndUpdate(id, {room_number: room_number, room_alloted: 'true'}).then(student => {
//     return res.json(student);
//   }).catch(err => {console.log(err)});
// })



// POST

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { email, id } = req.body

  const { errors, isValid } = StudentValidation(req.body)

  if (!isValid) return res.status(400).json(errors)

  Student.findOne({
    $or: [
      { email },
      { id }
    ]
  }).then(currentUser => {
    if (currentUser) {
      res.status(400).json({ error: 'Student with this id or email already exists.' })
    } else {
      const newStudent = new Student(req.body)

      newStudent.save()
        .then(student => res.json(student))
        .catch(err => res.status(500).json({ error: 'Failed to save new student in the DB', err }))
    }
  })

})


// GET

// Get a list of students with a given batch
router.get('/batch/:batch', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { batch } = req.params;

  Student.find({ batch })
    .then(students => res.json(students))
    .catch(err => console.log({ error: 'Failed to fetch students', err }))
})


// Get a list of student with a given room
router.get('/room/:room', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { room } = req.params;

  Student.find({ room })
    .then(students => res.json(students))
    .catch(err => console.log({ error: 'Failed to fetch students', err }))
})

// Get a student with a given ID
router.get('/id/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;

  Student.find({ id })
    .then(students => res.json(students))
    .catch(err => console.log({ error: 'Failed to fetch students', err }))
})


router.get('/all', (req, res) => {
  Users.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch all students' }))
})



// PUT

// Update student availability
router.put('/availability', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, isAvailable } = req.body

  Student.findOneAndUpdate({ id }, { $set: { isAvailable } })
    .then(data => res.status(200).json({ message: 'Student availability has been updated.', success: true }))
    .catch(err => res.json({ ...err, message: 'Failed to update student status.' }))
})


// DELETE 

// Delete a student with a student ID
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.body
  Student.findOneAndDelete({ id })
    .then(data => res.json({ message: `Student with ID ${id} has been deleted`, success: true }))
    .catch(err => res.json({ messgae: 'Failed to remove the student', ...err, success: false }))
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

