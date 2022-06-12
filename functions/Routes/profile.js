const express=require('express');
const profile = express.Router();
const Profile=require('../../models/Profile')

profile.get('/img', async(req, res) => {
    const token=req.header('auth-token')
    if(!token){
        res.status(400).send('authentication failed')
    }else{
        let img =await Profile.findOne({token:token}).exec()
        if(img){
            return res.status(400).json({ errors: "authentication is already reserved"});
        }
        img = await Profile.create({
            profileimg: req.body.profileimg,
            token:token           
        })
    }

   

})



profile.get('/getimg',
async(req,res)=>{
const authtoken=req.header('auth-token')
const img= await Profile.findOne({token:authtoken}).select("-token").exec()
if(!img){
    return res.status(400).json({ errors: "auth cannot found"});
}
res.json(img)
// res.send("hello world")
})
module.exports=profile