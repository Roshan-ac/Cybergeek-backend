var jwt = require('jsonwebtoken');
const JWT_Secret="nepali$boy"

const fetchUser=(req,res,next)=>{
        const token=req.header('auth-token')
        if(!token){
            return res.status(401).send("authentication failed")
        }
        try{
  const data=jwt.verify(token,JWT_Secret)
req.User=data.User
next()
        }catch{
            return res.status(401).send("authentication failed")
        }
    }


module.exports=fetchUser