const mongoose=require('mongoose')
const { Schema } = mongoose;

const profileSchema = new Schema({
 profileimg:{
     type:String,
     required:true
 },
 token:{
    type:String
 }
 
  
});
const Profile=mongoose.model('profile',profileSchema);

module.exports=Profile;