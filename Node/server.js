const EXPRESS = require('express');
const APP = EXPRESS();
const MONGOOSE = require('mongoose');
const bodyParser = require('body-parser');
const ROUTER = EXPRESS.Router();
const API = require('./routes/api')(ROUTER);
MONGOOSE.Promise = global.Promise;
MONGOOSE.connect('mongodb://localhost/test', (err)=>{
  if (err) {
    console.log(err)
  } else {
    console.log('conectado')
  }
});
APP.use(bodyParser.urlencoded({ extended: false }))
APP.use(bodyParser.json())
APP.use('/api',API);
APP.listen(8080, () =>{
  console.log('server corriendo en puerto 8080')
});
