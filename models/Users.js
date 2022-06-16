const mongoose=require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
 fullname:{
     type:String,
     required:true
 },
 email:{
     type:String,
     required:true,
     unique:true
 },
 password:{
     type:String,
     required:true
 },
 profile:{
    type:String
 }
  
});
const User=mongoose.model('user',userSchema);

module.exports=User;