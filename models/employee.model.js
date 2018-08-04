const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    empId: {
        type: Number,
        index: true,
        unique: true
    },
    name: {
        firstname: String,
        middlename: String,
        lastname: String
    },
    usertype: String,
    domainname: String
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');

// var nameSchema = new Schema({
//     firstname: String,
//     middlename: String,
//     lastname: String
// });

// var EmployeeSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     empId: {
//         type: Number,
//         index: true,
//         unique: true
//     },
//     name: nameSchema,
//     usertype: String,
//     domainname: String
// });