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
    status: {
        type: String,
        default: "active"
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');
