var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var subMedicine = new Schema({ 
            medid   : String,
            name    : String,
            qty     : String,
            cost : Number});


var billing = new Schema({

    month : String , 
    year : String , 
    medicines : [ subMedicine ]

});            

var schema = new Schema({
    url             : String,
    patientid       : String,
    registrationNumber : String,
    dob             : Date,
    dateOfAdmission : Date,    
    name            : String,
    gender          : String,    
    medicines       : [ subMedicine ],
    newmedicines    : [ subMedicine ],
    medtotalcost    : Number,
    bills           : [ billing ], 
    newmedtotalcost : Number
});

module.exports = mongoose.model('Med2patients', schema);

