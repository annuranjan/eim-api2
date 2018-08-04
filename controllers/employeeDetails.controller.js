const mongoose = require('mongoose');
const EmployeeDetails = require('../models/employeeDetails.model');

exports.addDetails = (req, res) => {

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

    });

    empDet.save().then(result => {
        return res.status(201).send(result);
    }).catch(error => {
        console.log(error);
        return res.status(500).send(error);
    });
}