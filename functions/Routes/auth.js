const express=require('express');
const router=express.Router();
const user=require('../../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require('../../Middleware/fetchUser');
const JWT_Secret="nepali$boy"



// testing endpoints
router.get('/test',(req,res)=>{
    res.json({
        "sucess":"HI i'm test page"
    })
})


// Signup page endpoint -- input validation,input secured,send jsonwebtoken to authenticate a valid users 
router.post('/signup',[
    body('firstname','firstname must be at least 3 characters').isLength({ min: 3 }),
    body('lastname','lastname must be atleast 3 character').isLength({ min: 3 }),
    body('email','Please enter a valid email address').isEmail(),
    body('password','Password must be minimum 6 character long').isLength({min:6})
],
async(req,res)=>{
   // Input Validation start
   let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{

        let User=await user.findOne({email:req.body.email}).exec()
        if(User){
            return res.status(400).json({ errors: "User from this email already exist"});
        }

        //converting userpassword into hashes key with mixer of salt random strings
        const salt= await bcrypt.genSalt(10)
        secPass=await bcrypt.hash(req.body.password,salt)
        User = await user.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email:req.body.email,
            password:secPass
        })

        //declared data object to store value of user.id into id
       const data={
        User:{
id:User.id
        }
    }

    //signing userdata with jsonwebtoken
    const tokendata=jwt.sign(data,JWT_Secret)
success=true
        res.json({authtoken:tokendata,success})
    } catch(errors){
        console.log(errors.message);
        res.status(500).send("Some error occured")
    }
    
})


// END here




// Login page endpoint -- check users value to determine wethere usersinput match with database user data ,aslo authenticate using existing authtoken
router.post('/login',[
    body('email','Please enter a valid email address').isEmail(),
    body('password','Please enter a valid password').isLength({min:6})
],
async(req,res)=>{
    let success=false;
   // Input Validation start
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
const {email,password}=req.body
    try{

        let User=await user.findOne({email:email}).exec()
        if(!User){
            return res.status(400).json({ login_failed: "Please enter a valid email"});
        }
        const comparepass=await bcrypt.compare(password,User.password)
        if(!comparepass){
            return res.status(400).json({ login_failed: "Please enter a valid password"});
        }
          //declared data object to store value of user.id into id
       const data={
        User:{
id:User.id
        }
    }

    //signing userdata with jsonwebtoken
    const tokendata=jwt.sign(data,JWT_Secret)
    success=true;
        res.json({authtoken:tokendata,success:success})
    } catch(errors){
        res.status(500).send("Some error occured")
    }
    
})


// Getuser endpoint - 
router.get('/getuser',fetchUser,
async(req,res)=>{
    const userId=req.User.id
const User=await user.findById(userId).select("-password")
res.json(User)




})

module.exports=router