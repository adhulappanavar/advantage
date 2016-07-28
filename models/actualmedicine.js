var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(   
    {
     url: String,
     name: String,  
     cost: Number
      },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Actualmedicines', schema);
