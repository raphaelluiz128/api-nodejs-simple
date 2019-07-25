var express = require('express');
var router = express.Router();
var model = require('../models/index');
var bodyParser = require('body-parser').json();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
model.User.findAll({}).then(users => res.json({
  error:false,data:users})).catch(error=> res.json({
    error:true,
    data:[],
    error:error }));
});

router.post('/',bodyParser,function(req,res,next){
 
 const{ 
   name,
   cpf,
   date_of_birth
  } = req.body;

 model.User.create({
   name: name,
   cpf: cpf,
   date_of_birth: date_of_birth
  })
 .then(user => res.status(201).json({
   error:false,
   data: user,
   message:'New user add'
  }))
   .catch(error => res.json({
     error:true,
     data:[],
     error:error
    }));
console.log('re'+req.body.name);
   });



   router.get('/Drivers',bodyParser,async function(req,res,next){
       
 try{
  const drivers = await model.User.findOne({
    
    where:{
      driver:"1",
    }});
  
  return res.send({
    drivers,
  });

}catch(error){
  console.log(error.message);
}
      });


router.put('/:id', function(req, res, next) {
  const user_id = req.params.id;
  const {name,cpf,date_of_birth} = req.body;
  model.User.update({
    name: name, cpf:cpf, date_of_birth:date_of_birth},
    {where: {
      id:user_id
    }
  }).
  then(user => res.status(201).json({
    error:false,
    message:"user updated"
  }))
  .catch(error => res.json({
    error:true,
    error:error
  }));
});
    

router.delete('/:id', function(req, res, next) {
  const user_id = req.params.id;
  const {name,cpf,date_of_birth} = req.body;
  model.User.destroy({where: {
      id:user_id
    }
  }).
  then(user => res.status(201).json({
    error:false,
    message:"user has deleted"
  }))
  .catch(error => res.json({
    error:true,
    error:error
  }));
});
    


router.put('/isPassenger/:id', function(req, res, next) {
  const user_id = req.params.id;
  const {passenger,lng,lat} = req.body;
  model.User.update({
    passenger: passenger,lng:lng,lat:lat, driver:"0"},
    {where: {
      id:user_id
    }
  }).
  then(user => res.status(201).json({
    error:false,
    message:"user is passenger"
  }))
  .catch(error => res.json({
    error:true,
    error:error
  }));
});



router.put('/isDriver/:id', function(req, res, next) {
  const user_id = req.params.id;
  const {driver,lng,lat} = req.body;
  model.User.update({
    driver: driver,lng:lng,lat:lat,passenger:"0"},
    {where: {
      id:user_id
    }
  }).
  then(user => res.status(201).json({
    error:false,
    message:"user is driver"
  }))
  .catch(error => res.json({
    error:true,
    error:error
  }));
});


module.exports = router;
