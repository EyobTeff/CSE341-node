// Middleware to check if user is authenticated via OAuth
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required. Please login with Google.' });
};

module.exports = ensureAuthenticated;
