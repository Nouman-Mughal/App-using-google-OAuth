
// export const router=express.Router()
import express from 'express';
import passport from 'passport'
export const router=express.Router()
router.get('/login',(req,res)=>{
    //will be handles by passport later
    res.render('login', {user:req.user})
})
router.get('/logout',(req,res)=>{
    
    res.redirect('/')
})
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))
//we will get profile info in code written after redirect.
router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
    res.send('you are logged in as :'+req.user.username)
})
//now passport take this code check it's in database or not, stuff userid with cookie serialize it after
//then deserialize it show the res body in code.