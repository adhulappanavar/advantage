var mongoose = require('mongoose');
var Schema = mongoose.Schema;
            
var contact = new Schema({
    name : String , 
    contactNo : String , 
    adress : String 
});

var initialPayment = new Schema({
    registrationFee : Number,
    cautionDeposit : Number,
    advancePayment : Number,
    establishmentCharges : Number,
    monthlyCharges : Number,
    phyisiotherapyCharges: Number,
    privateNurseCharges : Number
    
});

var schema = new Schema({    
    patientid  : String ,
    amountpaid : Number , 
	amountToPay : Number 
     
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('Actualpatients', schema);
