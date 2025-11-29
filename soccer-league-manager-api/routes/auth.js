const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport'); // Initialize passport config

// Google OAuth login route
// #swagger.tags = ['Authentication']
// #swagger.description = 'Redirect to Google for OAuth authentication'
router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback route
// #swagger.tags = ['Authentication']
// #swagger.description = 'Google OAuth callback - redirects after authentication'
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),
  (req, res) => {
    // Successful authentication, redirect to success page
    res.redirect('/auth/login/success');
  }
);

// Login success route - returns user data
// #swagger.tags = ['Authentication']
// #swagger.description = 'Returns authenticated user data'
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Successfully logged in',
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        photo: req.user.photo
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

// Login failed route
// #swagger.tags = ['Authentication']
// #swagger.description = 'Returns login failure message'
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failed'
  });
});

// Logout route
// #swagger.tags = ['Authentication']
// #swagger.description = 'Logs out the current user'
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Successfully logged out' });
  });
});

// Get current user - protected route
// #swagger.tags = ['Authentication']
// #swagger.description = 'Returns current authenticated user'
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      photo: req.user.photo
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
