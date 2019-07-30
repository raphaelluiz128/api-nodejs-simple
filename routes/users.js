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


   router.post('/login',bodyParser, async function(req,res,next){
 
    const{ 
      name,
     } = req.body;
   
     try{
      const login = await model.sequelize.query (
        "SELECT * from Users where Users.name like "+name,{ type: model.sequelize.QueryTypes.SELECT }, 
        ) .then(user => {
          return res.send({
            user
          });
        });
      }catch(error){
        console.log(error.message);
      }
      });


   router.get('/Drivers',bodyParser,async function(req,res,next){
     
    const {lat,lng} = req.body;

try{
const locateDrivers = await model.sequelize.query (
  "SELECT *, (6371 * acos(cos(radians("+lat+")) * cos(radians(lat)) * cos(radians("+lng+") - radians(lng)) + sin(radians("+lat+")) * sin(radians(lat)) )) AS distance FROM Users HAVING distance <= 5; ",{ type: model.sequelize.QueryTypes.SELECT }, 
  ) .then(drivers => {
    return res.send({
      drivers
    });
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
