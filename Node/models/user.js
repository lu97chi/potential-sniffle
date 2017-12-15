const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const titlize = require('mongoose-title-case');
const bcrypt = require('bcrypt-nodejs');



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

userSchema.plugin(titlize, {
  paths: ['name.firstName','name.lastName']
});


userSchema.pre('save', function(next){
  if (!this.isModified('password')) {
    return next();
  }
  else{
    bcrypt.hash(this.password, null, null,(err, hash)=>{
      if (err) return next(err);
      else{
        this.password = hash;
        next();
      }
    })
  }
});

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',userSchema)
