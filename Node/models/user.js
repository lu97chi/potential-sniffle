const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const titlize = require('mongoose-title-case');


const userSchema = new Schema({
  email:  {type:String, unique: true, required: true},
  name: {
    firstName: {type: String},
    lastName: String
  },
  password:   {type: String, required:true},
  sex: {type: String},
  likes: [{type: String}]
});

module.exports = mongoose.model('User',userSchema)
