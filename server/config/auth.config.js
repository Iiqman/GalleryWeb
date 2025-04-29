module.exports = {
  secret: process.env.JWT_SECRET || 'your-secret-key',  // JWT secret key
  jwtExpiration: 3600  // Token expiration time (1 hour)
};
