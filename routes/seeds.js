var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Actualpatients = require('../models/actualpatients');
var Med2patients = require('../models/med2patients');

//var fs = require('fs');
//var actualpatientslist = JSON.parse(fs.readFileSync('../dbseed/actualpatients/actualpatients_seed,json', 'utf8'));


router.post('/:id', function(req, res, next) {
    Actualpatients.findById(req.params.id, function(err, doc) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                title: 'No message found',
                error: {message: 'Message could not be found'}
            });
        }
        console.log("Mongo Record before update .... "+doc);
        console.log("Request Body from Browser .... "+req.body);

        doc.registrationNumber = req.body.registrationNumber;
        doc.name = req.body.name;
        doc.gender = req.body.gender;
        doc.dob = req.body.dob;
        doc.dateOfAdmission = req.body.dateOfAdmission;
        doc.Photourl = req.body.Photourl,
        doc.pcpContact = req.body.pcpContact,
        doc.initialPayment = req.body.initialPayment,
        doc.comments = req.body.comments
        
        doc.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});


router.get('/', function(req, res, next) {


var actualpatients = new Array();

//Mongo commands
 Actualpatients.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            actualpatients = docs;
            console.log(" List of patients ... ", actualpatients);

            if(actualpatients)
            for(var i=0;i<actualpatients.length;i++)
            {
                var med2patients = new Med2patients({
                    url : actualpatients[i].url,
                    patientid   : actualpatients[i]._id,
                    name : actualpatients[i].name,
                    registrationNumber : actualpatients[i].registrationNumber,
                    dob : actualpatients[i].dob,
                    dateOfAdmission : actualpatients[i].dateOfAdmission,
                    height : actualpatients[i].height,
                    gender : actualpatients[i].gender , 
                    weight : actualpatients[i].weight,
                    profession : actualpatients[i].profession,
                    medicines : [],
                    bills : [] , 
                    payments : [] , 
                    medtotalcost : 0,
                    newmedicines : [],
                    newmedtotalcost : 0
                });
                console.log ("med2patient record to be saved ...", med2patients);
                med2patients.save(function(err, result) {
                if (err)
                {
                    return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                     });
                }

                });
        }
        });



    Med2patients.findOne({"patientid" : "5789ee5c4b779cc738abf191"})
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log("Finding the patients", docs);
        });




           res.status(200).json({
                message: 'Success',
                obj: result
            });
 
});

module.exports = router;
