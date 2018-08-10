const mongoose = require('mongoose');
const EmployeeDetails = require('../models/employeeDetails.model');

exports.addDetails = (req, res) => {

    console.log(req.body);
    //Validating email
    if (!req.body.contactDetails.email) {
        return res.status(400).send({
            message: "Email needed to register!"
        });
    }

    //Check condition whether the employee already exists or not
    EmployeeDetails.find({
        empId: req.params.id
    }, (err, details) => {
        if (err) {
            return res.status(500).send({
                message: "Some error encountered. Please try again!"
            });
        }
        if (details == null) {

            return res.status(409).send({
                message: "A user with that empId already exists."
            });
        }
    });

    let empDet = new EmployeeDetails({
        _id: new mongoose.Types.ObjectId(),
        empId: req.params.id,
        personal: {
            dob: req.body.personal.dob,
            gender: req.body.personal.gender,
            nationality: req.body.personal.nationality,
            bloodGroup: req.body.personal.bloodGroup,
            maritalStatus: req.body.personal.maritalStatus,
            category: req.body.personal.category,
            religion: req.body.personal.religion
        },
        contactDetails: {
            address: {
                address: req.body.contactDetails.address.address,
                city: req.body.contactDetails.address.city,
                state: req.body.contactDetails.address.state,
                pincode: req.body.contactDetails.address.pincode
            },
            email: req.body.contactDetails.email,
            phone: req.body.contactDetails.phone
        },
        companyDetails: {
            employeeStatus: req.body.companyDetails.employeeStatus,
            dateOfJoining: req.body.companyDetails.dateOfJoining,
            dateOfLeaving: req.body.companyDetails.dateOfLeaving,
            dept: req.body.companyDetails.dept,
            designation: req.body.companyDetails.designation,
            salary: req.body.companyDetails.salary,
            manager: {
                empId: req.body.companyDetails.manager
            }
        },
        //Flag 
        // skills: {
        //     language: req.body.skills.language,
        //     trainings: [{
        //         trainingName: req.body.skills.trainings.,
        //         dateOfCompletion: req.body.companyDetails.dept,
        //         passingGrade: req.body.companyDetails.dept
        //     }]
        // },

    });

    empDet.save().then(result => {
        return res.status(201).send(result);
    }).catch(error => {
        console.log(error);
        return res.status(500).send(error);
    });
}

// empId: {
//     type: Number,
//     required: true,
//     unique: true,
//     index: true
// },
// personal: {
//     dob: String,
//     gender: String,
//     nationality: String,
//     bloodGroup: String,
//     maritalStatus: String,
//     category: String,
//     religion: String
// },
// companyDetails: {
//     employeeStatus: String,
//     dateOfJoining: String,
//     dateOfLeaving: String,
//     dept: String,
//     designation: String,
//     salary: Number,
//     manager: {
//         empId: Number
//     }
// },
// identificationDetails: {
//     passport: {
//         passNum: String,
//         yearOfIssue: String,
//         yearOfExpiry: String
//     },
//     otherIdentites: [{
//         idName: String,
//         idNum: String
//     }]
// },
// contactDetails: {
//     address: {
//         address: String,
//         city: String,
//         state: String,
//         pincode: Number
//     },
//     email: {
//         type: String,
//         unique: true
//     },
//     phone: Number
// },
// skills: {
//     language: [String],
//     trainings: [{
//         trainingName: String,
//         dateOfCompletion: String,
//         passingGrade: String
//     }]
// },
// familyAndEmergency: {
//     family: [{
//         name: String,
//         relation: String,
//         age: Number,
//         phone: Number
//     }],
//     emergency: [{
//         name: String,
//         relation: String,
//         address: String,
//         city: String,
//         state: String,
//         phone: Number
//     }],
//     nominee: [{
//         name: String,
//         relation: String,
//         phone: Number
//     }]
// },
// experience: [{
//     companyName: String,
//     designation: String,
//     joiningDate: String,
//     leavingDate: String,
//     reasonForLeaving: String,
//     jobDescription: String,
//     projectDesc: String
// }],
// education: [{
//     qualification: String,
//     schoolName: String,
//     passingYear: String,
//     passingGrade: String
// }]
// });