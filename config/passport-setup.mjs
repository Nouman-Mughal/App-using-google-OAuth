import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';;
import {keys} from './keys.mjs';
import {User} from '../model/user-model.mjs';

passport.serializeUser((user,done)=>{
   done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findByid(id).then((user)=>{done(null,user)})
})
//remember that User is collection while user is single user only.



export const passportSetup =() =>{
    passport.use(
        new GoogleStrategy({
            //options for strategy//now google strategy is allowed to use googleAPI for authentication.
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: 'http://localhost:3005/auth/google/redirect'
            
        },
            (accessToken,refreshToken,profile,done) => {
                User.findOne({googleID:profile.id}).then((currentUser)=>{
                    
                    if(currentUser){
                        console.log('currentUser is : ' +currentUser)
                        done(null,currentUser)
    
                    }else{
    
                        new User({
                            username:profile.displayName,
                            googleID:profile.id,
                            
                        }).save().then((newUser)=>{
                            console.log("new user has been create: " + newUser)
                            done(null.newUser)
                        })
                    }
                })

            })
    );
}
