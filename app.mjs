import express from 'express';
import {router as authRoutes} from './routes/auth-routes.mjs';
import mongoose from 'mongoose';
import {keys} from './config/keys.mjs';
import cookieSession from 'cookie-session'; 
import passport from 'passport';
import {passportSetup as dps} from './config/passport-setup.mjs';

const app=express();
//connect with mongodb using ORM
mongoose.connect(keys.mongodb.dbURL,()=>{
    console.log('connected to mongodb')
})
//use to encrypt and decrypt the session cookie usong the key.
app.use(cookieSession({
    maxAge: 24 * 60 *60* 1000,
    keys:[keys.session.cookieKey]
}))
//gonna initialize passport and session cookie():
app.use(passport.initialize())
app.use(passport.session())

// import passport from 'passport';

dps();

app.set('view engine', 'ejs')
app.use('/auth',authRoutes)


app.get('/',(req,res)=>{
    res.render('home')
})


// app.set('/',path.join(__dirname,'views'))
app.listen(3005, ()=>{
    console.log('app is listening at port 3005')
})