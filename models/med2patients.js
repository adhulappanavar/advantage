var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subMedicine = new Schema({ 
            medid   : String,
            name    : String,
            qty     : String,
            cost : Number});

var schema = new Schema({
    url             : String,
    patientid       : String,
    registrationNumber : String,
    dob             : Date,
    dateOfAdmission : Date,    
    name            : String,
    height          : Number,
    weight          : Number,
    profession      : String,
    medicines       : [ subMedicine ],
    newmedicines    : [ subMedicine ],
    medtotalcost    : Number,
    newmedtotalcost : Number
});

module.exports = mongoose.model('Med2patients', schema);

