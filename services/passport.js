const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

passport.serializeUser(( user, done )=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// New Instance of Google Auth 
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done)=> {
        
        User.findOne({ googleId: profile.id}).then((existingUser) => {
                if(existingUser){
                    // User already registered
                    done(null, existingUser);
                }else{
                    // Create the user
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
        
    })
);

