const USER = require('../models/user')
const jwt = require('jsonwebtoken');

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
      let likes = [];
      user.email = req.body.email;
      user.password = req.body.password;
      user.name.firstName = req.body.firstName;
      user.name.lastName = req.body.lastName;
      user.likes = req.body.likes;
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

  router.post('/login', (req,res)=>{
    if (!req.body.email) {
      res.json({
        exito: false,
        mensaje: 'no hay email'
      })
    } else if(!req.body.password) {
      res.json({
        exito: false,
        mensaje: 'no hay contraseña'
      })
    } else{
      USER.findOne({email: req.body.email}, (err,user)=>{
        if (err) {
          res.json({exito: false, mensaje: err})
        } else {
          if (!user) {
            res.json({exito: false, mensaje: 'Usuario no encontrado'})
          } else {
            let contraseñaValida = user.comparePassword(req.body.password)
            if (!contraseñaValida) {
              res.json({exito: false, mensaje: 'Contraseña incorrecta'})
            } else {
              let token = jwt.sign({email: user.email},'algosecreto',{expiresIn:'24h'})
              res.json({exito: true, mensaje: 'Exito!', token: token})
            }
          }
        }
      })
    }
  })
  return router;
};
