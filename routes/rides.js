var express = require('express');
var router = express.Router();
var model = require('../models/index');
var bodyParser = require('body-parser').json();
/* GET rides listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
model.Ride.findAll({}).then(rides => res.json({
  error:false,data:rides})).catch(error=> res.json({
    error:true,
    data:[],
    error:error }));
});

router.post('/',bodyParser,function(req,res,next){
 
 const{ 
   id_passenger,
   id_driver,
  } = req.body;

 model.Ride.create({
   id_passenger:id_passenger,
   id_driver: id_driver,
   createAt: Date.now()
  })
 .then(Ride => res.status(201).json({
   error:false,
   data: Ride,
   message:'New Ride add'
  }))
   .catch(error => res.json({
     error:true,
     data:[],
     error:error
    }));
   });


router.put('/endRide/:id', function(req, res, next) {
  const ride_id = req.params.id;
  const {end} = req.body;
  model.User.update({
    end: end},
    {where: {
      id:ride_id
    }
  }).
  then(user => res.status(201).json({
    error:false,
    message:"driver finished ride"
  }))
  .catch(error => res.json({
    error:true,
    error:error
  }));
});
    

module.exports = router;
