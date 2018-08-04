const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var EmployeeDetailsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    empId: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    personal: {
        dob: String,
        gender: String,
        nationality: String,
        bloodGroup: String,
        maritalStatus: String,
        category: String,
        religion: String
    },
    companyDetails: {
        employeeStatus: String,
        dateOfJoining: String,
        dateOfLeaving: String,
        dept: String,
        designation: String,
        salary: Number,
        manager: {
            empId: Number
        }
    },
    identificationDetails: {
        passport: {
            passNum: String,
            yearOfIssue: String,
            yearOfExpiry: String
        },
        otherIdentites: [{
            idName: String,
            idNum: String
        }]
    },
    contactDetails: {
        address: {
            address: String,
            city: String,
            state: String,
            pincode: Number
        },
        email: {
            type: String,
            unique: true
        },
        phone: Number
    },
    skills: {
        language: [String],
        trainings: [{
            trainingName: String,
            dateOfCompletion: String,
            passingGrade: String
        }]
    },
    familyAndEmergency: {
        family: [{
            name: String,
            relation: String,
            age: Number,
            phone: Number
        }],
        emergency: [{
            name: String,
            relation: String,
            address: String,
            city: String,
            state: String,
            phone: Number
        }],
        nominee: [{
            name: String,
            relation: String,
            phone: Number
        }]
    },
    experience: [{
        companyName: String,
        designation: String,
        joiningDate: String,
        leavingDate: String,
        reasonForLeaving: String,
        jobDescription: String,
        projectDesc: String
    }],
    education: [{
        qualification: String,
        schoolName: String,
        passingYear: String,
        passingGrade: String
    }]
});
//**personalSchema Start */
// var personalSchema = new Schema({
//     empId: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     dob: String,
//     gender: String,
//     nationality: String,
//     bloodGroup: String,
//     maritalStatus: String,
//     category: String,
//     religion: String
// });
//**personalSchema End */

//**CompanyDetailsSchema Start */
// var managerIdSchema = new Schema({
//     empId: Number
// });

// var companyDetailsSchema = new Schema({
//     employeeStatus: String,
//     dateOfJoining: String,
//     dateOfLeaving: String,
//     dept: String,
//     designation: String,
//     salary: Number,
//     manager: managerIdSchema
// });
//**CompanyDetailsSchema End */

// **identificationDetails Schema starts */
// var otherIdentitiesSchema = new Schema({
//     idName: String,
//     idNum: String
// });

// var passportSchema = new Schema({
//     passNum: String,
//     yearOfIssue: String,
//     yearOfExpiry: String
// });

// var identificationDetailsSchema = new Schema({
//     passport: passportSchema,
//     otherIdentites: [otherIdentitiesSchema]
// });
// **identificationDetails Schema End */

// **contactDetails Schema Start */
// var addressSchema = new Schema({
//     address: String,
//     city: String,
//     state: String,
//     pincode: Number
// });
// var contactDetailsSchema = new Schema({
//     address: addressSchema,
//     email: {
//         type: String,
//         index: true,
//         unique: true
//     },
//     phone: Number
// });
// **contactDetails Schema End */

//**skillsSchema start */
// var trainingSchema = new Schema({
//     trainingName: String,
//     dateOfCompletion: String,
//     passingGrade: String
// });

// var skillsSchema = new Schema({
//     language: [String],
//     trainings: [trainingSchema]
// });
//**skillsSchema end */

//**family-emergency Start */
// var familySchema = new Schema({
//     name: String,
//     relation: String,
//     age: Number,
//     phone: Number
// });
// var emergencySchema = new Schema({
//     name: String,
//     relation: String,
//     address: String,
//     city: String,
//     state: String,
//     phone: Number
// });
// var nomineeSchema = new Schema({
//     name: String,
//     relation: String,
//     phone: Number
// });

// var familyEmergencySchema = new Schema({
//     family: [familySchema],
//     emergency: [emergencySchema],
//     nominee: [nomineeSchema]
// });
//**family-emergency End */

//**experienceSchema Start */
// var experienceSchema = new Schema({
//     companyName: String,
//     designation: String,
//     joiningDate: String,
//     leavingDate: String,
//     reasonForLeaving: String,
//     jobDescription: String,
//     projectDesc: String
// });
//**experienceSchema End */

//**educationSchema Start */
// var educationSchema = new Schema({
//     qualification: String,
//     schoolName: String,
//     passingYear: String,
//     passingGrade: String
// });
//**educationSchema End */

// var EmployeeDetailsSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     personal: personalSchema,
//     companyDetails: companyDetailsSchema,
//     identificationDetails: identificationDetailsSchema,
//     contactDetails: contactDetailsSchema,
//     skills: skillsSchema,
//     familyAndEmergency: familyEmergencySchema,
//     experience: [experienceSchema],
//     education: [educationSchema]
// });

module.exports = mongoose.model('EmployeeDetails', EmployeeDetailsSchema, "employee-details");