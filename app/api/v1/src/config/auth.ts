// src/config/auth.ts
const auth = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback', // Use the complete callback URL
    enabled: true, // Set to true if Google authentication is enabled
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID || 'your-facebook-client-id',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'your-facebook-client-secret',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback', // Use the complete callback URL
    profileFields: ['id', 'displayName', 'email'], // Customize as needed
    enabled: true, // Set to true if Facebook authentication is enabled
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'your-twitter-consumer-key',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'your-twitter-consumer-secret',
    callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback', // Use the complete callback URL
    includeEmail: true, // Set to true if you need to access user email
    enabled: true, // Set to true if Twitter authentication is enabled
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'your-github-client-id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your-github-client-secret',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback', // Use the complete callback URL
    enabled: true, // Set to true if GitHub authentication is enabled
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'your-jwt-secret', // Replace with your actual JWT secret
    enabled: true, // Set to true if JWT authentication is enabled
  },
  local: {
    usernameField: 'email', // Customize as needed
    passwordField: 'password', // Customize as needed
    passReqToCallback: false, // Set to true if you want to pass the request object to the verify callback
    session: false, // Since we are using tokens, disable sessions
    enabled: true, // Set to true if local authentication is enabled
  },
};

export default auth;