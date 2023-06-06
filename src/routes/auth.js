import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';

const googleStrategy = Strategy;
const router = express.Router();

const { user } = db;
dotenv.config();
const { CLIENTID, CLIENTSECRET, GOOGLEDEFAULTPASSWORD } = process.env;
/* eslint-disable */
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});
/* eslint-disable */
passport.deserializeUser(async (id, done) => {
  await user.findOne({ where: { id } }).then((user) => {
    done(null, user);
  });
});
passport.use(
  new googleStrategy(
    {
      // options for google authentifications
      callbackURL:
        'https://e-comm-team-techsmith-bn-staging-fmp3.onrender.com/api/auth/google/redirect',
      clientID: CLIENTID,
      clientSecret: CLIENTSECRET,
    },
    /* eslint-disable */
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists in our own db
        const currentUser = await user.findOne({
          where: { email: profile.email },
        });
        if (currentUser) {
          // already have this user
          if (currentUser.googleId === null) {
            await user.update(
              { googleId: profile.id },
              { where: { email: profile.email } }
            );
            done(null, currentUser);
          } else {
            done(null, currentUser);
          }
        } else {
          // if not, create user in our db
          const newUser = await user.create({
            name: profile.displayName,
            email: profile.email,
            password: GOOGLEDEFAULTPASSWORD,
            googleId: profile.id,
            roleId: 2,
            isActive: true,
            gender: 'unknwon',
            birthDate: new Date(),
            preferredLanguage: 'rw',
            preferredCurrency: 'RWF',
            physicalAddress: 'Rwanda',
          });
          done(null, newUser);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/api/users/login',
  }),
  (req, res) => {
    res.cookie(
      'Authorised',
      jwt.sign({ id: req.user.id }, process.env.USER_SECRET, {
        expiresIn: '1h',
      })
    );
    res.redirect('https://e-comm-team-techsmith-fn.vercel.app/')
  }
);

export default router;
