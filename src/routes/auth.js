import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';

const googleStrategy = Strategy;
const router = express.Router();
const { user } = db;
const temp = [];
dotenv.config();

const { CLIENTID, CLIENTSECRET, CALLBACKURL, FRONTENDURL } = process.env;
/* eslint-disable */
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});
/* eslint-disable */
passport.deserializeUser(async (id, done) => {
  console.log('Deserializing user with ID:', id);
  try {
    const currentUser = await user.findOne({ where: { id } });
    done(null, currentUser);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new googleStrategy(
    {
      // options for google authentifications
      callbackURL:
        `${CALLBACKURL}/api/auth/google/redirect`,
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
              temp.push(profile.email)
              temp.push(profile.displayName)
              done(null, false);
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
  (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const  emailRedirect=temp[0]
        const nameRedirect=temp[1]

        const redirectUrl = `${FRONTENDURL}/signup?email=${encodeURIComponent(emailRedirect)}&name=${encodeURIComponent(nameRedirect)}`;

        return res.redirect(redirectUrl);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign(
          { id: user.email, roleId: user.roleId },
          process.env.USER_SECRET,
          { expiresIn: '1h' }
        );

        const redirectUrl = `${FRONTENDURL}?token=${token}`;

        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  }
);
export default router;
