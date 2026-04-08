import { config } from "dotenv";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

config();
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to google oauth");
});

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.get("/auth/google",
  passport.authenticate("google", {scope: ["profile", "email"]})
)

app.get("/auth/google/callback",
  passport.authenticate('google',{failureRedirect: '/'}),
  (req,res)=>{
    console.log(req.user)
    res.send("Google authentication successful")
  }
)

export default app;
