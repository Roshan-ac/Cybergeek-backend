const mongoose=require('mongoose')
const {Schema}=mongoose

const ImageSchema=new Schema({
name:{
    type:String,
    required:true
},
image:{
type:String,
required:true
},
email:{
    type:String,
    required:true
}
})

module.exports = mongoose.model('profile',ImageSchema)