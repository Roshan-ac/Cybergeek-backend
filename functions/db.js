const mongoose = require('mongoose');
// const mongouri="mongodb+srv://kali:kali@cyber-geek.vlnmz.mongodb.net/?retryWrites=true&w=majority";
const mongouri='mongodb://localhost:27017/cybergeek'
const MongoConnect=()=>{
    mongoose.connect(mongouri,()=>{
        console.log('mongodb is connected successfully')
    })
}

module.exports=MongoConnect;
