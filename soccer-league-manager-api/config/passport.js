const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connectDB = require('../data/database');

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectDB();
    const { ObjectId } = require('mongodb');
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await connectDB();
        
        // Check if user already exists
        let user = await db.collection('users').findOne({ googleId: profile.id });
        
        if (user) {
          // User exists, return user
          return done(null, user);
        }
        
        // Create new user
        const newUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile.photos[0]?.value,
          createdAt: new Date()
        };
        
        const result = await db.collection('users').insertOne(newUser);
        newUser._id = result.insertedId;
        
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
