var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var payment = new Schema ({

        amountPaid : Number , 

        modeOfPayment : String , 

        paidBy : String , 

        phoneNo : Number ,

        chequeNo : String , 

        reciptNo : String,

        narration : String,

        date : Date,        

        month : String

    },
    {
        timestamp : true
    })


var subMedicine = new Schema({ 
            medid   : String,
            name    : String,
            qty     : String,
            cost : Number});


var billing = new Schema({

    month : String , 
    year : String ,    
    medicines : [ subMedicine ] , 
    date : Date , 
    category : String , 
    preparedBy : String ,
    totalCost : Number 
    },
    {
        timestamp : true
    }

);            

var schema = new Schema({
    url             : String,
    patientid       : String,
    registrationNumber : String,
    dob             : Date,
    dateOfAdmission : Date,    
    name            : String,
    gender          : String,
    payment         : [payment] ,     
    medicines       : [ subMedicine ],
    newmedicines    : [ subMedicine ],
    medtotalcost    : Number,
    bills           : [ billing ], 
    newmedtotalcost : Number
});

module.exports = mongoose.model('Med2patients', schema);

