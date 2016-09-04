var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Med2patients = require('../models/med2patients');


router.get('/static', function(req, res, next) {
        res.json( [
             {
      "name": "Luke Skywalker",
      "height": "172",
      "weight": "77",
      "url": "http://swapi.co/api/med2patients/1/"
    },
    {
      "name": "C-3PO",
      "height": "167",
      "weight": "75",
      "url": "http://swapi.co/api/med2patients/2/"
    },
    {
      "name": "R2-D2",
      "height": "96",
      "weight": "32",
      "url": "http://swapi.co/api/med2patients/3/"
    }
     ])
 
});

router.delete('/:id' , function(req, res, next) { console.log("test");
  console.log('del profile');
  console.log(req.params.id);
  console.log("param id");
   Med2patients.findByIdAndRemove(req.params.id, function(err, doc) {
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
   });

   
});    


router.get('/', function(req, res, next) {
    Med2patients.find()
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});


router.get('/:id', function(req, res, next) {
    Med2patients.findById(req.params.id)
        .exec(function(err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: docs
            });
        });
});

router.post('/', function(req, res, next) {

        var med2patients = new Med2patients({
            url         : req.body.url,
            patientid   : req.body.patientid,
            name        : req.body.name,
            registrationNumber : req.body.registrationNumber,
            dob         : req.body.dob,
            gender      : req.body.gender , 
            bills       : req.body.bills ,
            payemnt     : req.body.payment ,  
            dateOfAdmission : req.body.dateOfAdmission,            
            medicines : req.body.medicines,
            newmedicines : req.body.medicines,
            medtotalcost : req.body.medtotalcost,
            newmedtotalcost : req.body.newmedtotalcost
           });
        med2patients.save(function(err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
});



router.post('/:id', function(req, res, next) {
    Med2patients.findById(req.params.id, function(err, doc) {
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
        doc.url = req.body.url;
        doc.patientid = req.body.patientid;
        doc.registrationNumber = req.body.registrationNumber;
        doc.dob = req.body.dob;
        doc.gender = req.body.gender;
        doc.bills = req.body.bills;
        doc.dateOfAdmission = req.body.dateOfAdmission;
        doc.name = req.body.name;        
        doc.payment = req.body.payment;
        doc.medicines = req.body.medicines;
        doc.newmedicines = req.body.newmedicines;
        var tempcost = 0; 
        if(req.body.medicines)
        {
                if(req.body.medicines)               
               for (var index = 0; index < req.body.medicines.length; index++) {
                       tempcost = req.body.medicines[index].cost + tempcost;
                }
                doc.medtotalcost = tempcost;               
            }
            
            if(req.body.newmedicines) {
                    tempcost = 0;     
                    if(req.body.newmedicines)                         
                    for (var index = 0; index < req.body.newmedicines.length; index++) {
                        tempcost = req.body.newmedicines[index].cost + tempcost;
                    }
                   doc.newmedtotalcost = tempcost;
            }

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

function calcuateTotalcost (medlist){
    var tempcost = 0;
    if(medlist)
    for (var index = 0; index < medlist.length; index++) {
         tempcost += medlist[index].totalcost;
     }

     return tempcost;
};

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Authentication failed',
                error: err
            });
        }
        next();
    });
});



module.exports = router;