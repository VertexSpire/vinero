// src/config/auth.ts

/**
 * @constant auth
 * @description Configuration object for various authentication strategies. This object holds configuration settings
 * for Google, Facebook, Twitter, GitHub, JWT, and local authentication methods. Each strategy has its own set of
 * configuration options that include client/consumer IDs, secrets, callback URLs, and other relevant settings.
 *
 * The configuration values are typically loaded from environment variables to ensure security and flexibility. Default
 * values are provided as fallbacks for development purposes. Each authentication strategy can be enabled or disabled
 * through the `enabled` property.
 */
const auth = {
 google: {
  /**
   * @property {string} clientID - The Google OAuth client ID, loaded from environment variables or set to a default value.
   * This ID is used to identify the application to Google.
   */
  clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',

  /**
   * @property {string} clientSecret - The Google OAuth client secret, loaded from environment variables or set to a default value.
   * This secret is used to authenticate the application to Google.
   */
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',

  /**
   * @property {string} callbackURL - The callback URL for Google OAuth, loaded from environment variables or set to a default value.
   * This URL is the endpoint to which Google redirects users after they have authenticated.
   */
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback', // Use the complete callback URL

  /**
   * @property {boolean} enabled - Flag indicating if Google authentication is enabled. When set to true, the application
   * will support authentication via Google.
   */
  enabled: true, // Set to true if Google authentication is enabled
 },
 facebook: {
  /**
   * @property {string} clientID - The Facebook OAuth client ID, loaded from environment variables or set to a default value.
   * This ID is used to identify the application to Facebook.
   */
  clientID: process.env.FACEBOOK_CLIENT_ID || 'your-facebook-client-id',

  /**
   * @property {string} clientSecret - The Facebook OAuth client secret, loaded from environment variables or set to a default value.
   * This secret is used to authenticate the application to Facebook.
   */
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'your-facebook-client-secret',

  /**
   * @property {string} callbackURL - The callback URL for Facebook OAuth, loaded from environment variables or set to a default value.
   * This URL is the endpoint to which Facebook redirects users after they have authenticated.
   */
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback', // Use the complete callback URL

  /**
   * @property {string[]} profileFields - Array of fields to be requested from Facebook. This can be customized to include
   * additional user information as needed.
   */
  profileFields: ['id', 'displayName', 'email'], // Customize as needed

  /**
   * @property {boolean} enabled - Flag indicating if Facebook authentication is enabled. When set to true, the application
   * will support authentication via Facebook.
   */
  enabled: true, // Set to true if Facebook authentication is enabled
 },
 twitter: {
  /**
   * @property {string} consumerKey - The Twitter OAuth consumer key, loaded from environment variables or set to a default value.
   * This key is used to identify the application to Twitter.
   */
  consumerKey: process.env.TWITTER_CONSUMER_KEY || 'your-twitter-consumer-key',

  /**
   * @property {string} consumerSecret - The Twitter OAuth consumer secret, loaded from environment variables or set to a default value.
   * This secret is used to authenticate the application to Twitter.
   */
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'your-twitter-consumer-secret',

  /**
   * @property {string} callbackURL - The callback URL for Twitter OAuth, loaded from environment variables or set to a default value.
   * This URL is the endpoint to which Twitter redirects users after they have authenticated.
   */
  callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback', // Use the complete callback URL

  /**
   * @property {boolean} includeEmail - Flag indicating if email access should be requested from Twitter. When set to true,
   * the application will request the user's email address from Twitter.
   */
  includeEmail: true, // Set to true if you need to access user email

  /**
   * @property {boolean} enabled - Flag indicating if Twitter authentication is enabled. When set to true, the application
   * will support authentication via Twitter.
   */
  enabled: true, // Set to true if Twitter authentication is enabled
 },
 github: {
  /**
   * @property {string} clientID - The GitHub OAuth client ID, loaded from environment variables or set to a default value.
   * This ID is used to identify the application to GitHub.
   */
  clientID: process.env.GITHUB_CLIENT_ID || 'your-github-client-id',

  /**
   * @property {string} clientSecret - The GitHub OAuth client secret, loaded from environment variables or set to a default value.
   * This secret is used to authenticate the application to GitHub.
   */
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your-github-client-secret',

  /**
   * @property {string} callbackURL - The callback URL for GitHub OAuth, loaded from environment variables or set to a default value.
   * This URL is the endpoint to which GitHub redirects users after they have authenticated.
   */
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback', // Use the complete callback URL

  /**
   * @property {boolean} enabled - Flag indicating if GitHub authentication is enabled. When set to true, the application
   * will support authentication via GitHub.
   */
  enabled: true, // Set to true if GitHub authentication is enabled
 },
 jwt: {
  /**
   * @property {string} secretKey - The secret key for JWT authentication, loaded from environment variables or set to a default value.
   * This key is used to sign and verify JWT tokens.
   */
  secretKey: process.env.JWT_SECRET_KEY || 'your-jwt-secret', // Replace with your actual JWT secret

  /**
   * @property {boolean} enabled - Flag indicating if JWT authentication is enabled. When set to true, the application
   * will support authentication via JWT tokens.
   */
  enabled: true, // Set to true if JWT authentication is enabled
 },
 local: {
  /**
   * @property {string} usernameField - Field name for the username in local authentication. This specifies which field
   * in the request body should be used as the username.
   */
  usernameField: 'email', // Customize as needed

  /**
   * @property {string} passwordField - Field name for the password in local authentication. This specifies which field
   * in the request body should be used as the password.
   */
  passwordField: 'password', // Customize as needed

  /**
   * @property {boolean} passReqToCallback - Flag indicating if the request object should be passed to the verify callback.
   * When set to true, the verify callback will receive the request object as its first parameter.
   */
  passReqToCallback: false, // Set to true if you want to pass the request object to the verify callback

  /**
   * @property {boolean} session - Flag indicating if sessions should be used. Typically set to false when using tokens
   * for authentication, as tokens provide a stateless authentication mechanism.
   */
  session: false, // Since we are using tokens, disable sessions

  /**
   * @property {boolean} enabled - Flag indicating if local authentication is enabled. When set to true, the application
   * will support authentication via a local username and password.
   */
  enabled: true, // Set to true if local authentication is enabled
 },
};

export default auth;
