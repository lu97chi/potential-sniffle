const USER = require('../models/user')
module.exports = (router) => {
//get,post,put,delete
  router.post('/register', (req, res)=>{
    if(!req.body.email){
      res.json({
        exito:false,
        mensaje: 'no hay email'
      })
    }else if(!req.body.password){
      res.json({
        exito:false,
        mensaje: 'no hay password'
      })
    }else{
      let user = new USER();
      user.email = req.body.email;
      user.password = req.body.password;
      user.name.firstName = req.body.firstName;
      user.name.lastName = req.body.lastName;
      user.sex = req.body.sex;
      user.save((err)=>{
        if (err) {
          res.json({exito:false, mensaje: err})
        } else {
          res.json({exito:true, mensaje: 'Usuario guardado'})
        }
      })
      // user.likes =req.body.email
    }
  })
  return router;
};
