// src/services/passport/passport.service.ts

import { PassportStatic } from 'passport';
import { LocalStrategyFactory } from './strategies/local.strategy.factory';
import { GoogleStrategyFactory } from './strategies/google.strategy.factory';
import { JwtStrategyFactory } from './strategies/jwt.strategy.factory';
import { AuthStrategies } from '../../common/enums/auth.enum';
import { StrategyFactory } from './strategy.factory'; // Ensure StrategyFactory is imported

/**
 * @class PassportService
 * @description Service for managing Passport authentication strategies. This service provides methods to initialize,
 * configure, and use various authentication strategies with Passport.
 */
export class PassportService {
 /**
  * @property {StrategyFactory} strategyFactory - The strategy factory used to create authentication strategy instances.
  */
 private readonly strategyFactory: StrategyFactory;

 /**
  * @property {PassportStatic} passport - The Passport instance. This instance is used to manage and configure authentication strategies.
  */
 private readonly passport: PassportStatic;

 /**
  * @constructor
  * @description Constructor for the PassportService class. It initializes the service with a Passport instance and a strategy factory,
  * and then initializes the authentication strategies.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  * @param {StrategyFactory} strategyFactory - The StrategyFactory instance. This parameter provides the factory used to create strategy instances.
  */
 constructor(passport: PassportStatic, strategyFactory: StrategyFactory) {
  /**
   * Assign the strategy factory instance to the class property.
   * This ensures that the factory can be used to create strategy instances throughout the class.
   */
  this.strategyFactory = strategyFactory;

  /**
   * Assign the Passport instance to the class property.
   * This ensures that the Passport instance is available for configuring strategies.
   */
  this.passport = passport;

  /**
   * Initialize and configure authentication strategies.
   * This method call sets up the various strategies for Passport.
   */
  this.initializeAuthStrategies();
 }

 /**
  * @method initializeAuthStrategies
  * @description Initialize and configure authentication strategies. This method creates instances of various strategies
  * using the strategy factory and configures them with the Passport instance.
  */
 private initializeAuthStrategies(): void {
  /**
   * Create an instance of the local strategy using the strategy factory.
   * The local strategy handles traditional username/password authentication.
   */
  const localStrategy = this.strategyFactory.createLocalStrategy();

  /**
   * Create an instance of the Google strategy using the strategy factory.
   * The Google strategy handles authentication via Google OAuth.
   */
  const googleStrategy = this.strategyFactory.createGoogleStrategy();

  /**
   * Create an instance of the JWT strategy using the strategy factory.
   * The JWT strategy handles token-based authentication.
   */
  const jwtStrategy = this.strategyFactory.createJwtStrategy();

  /**
   * Create an instance of the Facebook strategy using the strategy factory.
   * The Facebook strategy handles authentication via Facebook OAuth.
   */
  const facebookStrategy = this.strategyFactory.createFacebookStrategy();

  /**
   * Create an instance of the Twitter strategy using the strategy factory.
   * The Twitter strategy handles authentication via Twitter OAuth.
   */
  const twitterStrategy = this.strategyFactory.createTwitterStrategy();

  /**
   * Create an instance of the GitHub strategy using the strategy factory.
   * The GitHub strategy handles authentication via GitHub OAuth.
   */
  const githubStrategy = this.strategyFactory.createGitHubStrategy();

  /**
   * Configure the local strategy with the Passport instance.
   * This ensures that the local strategy is properly set up in Passport.
   */
  this.configureStrategy(localStrategy);

  /**
   * Configure the Google strategy with the Passport instance.
   * This ensures that the Google strategy is properly set up in Passport.
   */
  this.configureStrategy(googleStrategy);

  /**
   * Configure the JWT strategy with the Passport instance.
   * This ensures that the JWT strategy is properly set up in Passport.
   */
  this.configureStrategy(jwtStrategy);

  /**
   * Configure the Facebook strategy with the Passport instance.
   * This ensures that the Facebook strategy is properly set up in Passport.
   */
  this.configureStrategy(facebookStrategy);

  /**
   * Configure the Twitter strategy with the Passport instance.
   * This ensures that the Twitter strategy is properly set up in Passport.
   */
  this.configureStrategy(twitterStrategy);

  /**
   * Configure the GitHub strategy with the Passport instance.
   * This ensures that the GitHub strategy is properly set up in Passport.
   */
  this.configureStrategy(githubStrategy);
 }

 /**
  * @method configureStrategy
  * @description Configure a specific authentication strategy. This method configures a given strategy with the Passport instance.
  *
  * @param {PassportStrategy} strategy - The authentication strategy to configure. This parameter specifies the strategy to be configured with Passport.
  */
 private configureStrategy(strategy: PassportStrategy): void {
  /**
   * Configure the provided strategy with the Passport instance.
   * This sets up the strategy within Passport so it can be used for authentication.
   */
  strategy.configureStrategy(this.passport);
 }

 /**
  * @method getAuthenticateFunction
  * @description Get the authenticate function based on the specified strategy. This method returns the Passport authenticate function
  * for the specified strategy.
  *
  * @param {AuthStrategies} strategy - The authentication strategy. This parameter specifies the strategy for which to get the authenticate function.
  * @returns {Function} - The authenticate function for the specified strategy. This function is used to authenticate requests using Passport.
  */
 public getAuthenticateFunction(strategy: AuthStrategies): Function {
  /**
   * Determine the appropriate authentication function based on the specified strategy.
   * The switch statement handles each possible strategy and returns the corresponding authenticate function.
   */
  switch (strategy) {
   case AuthStrategies.Local:
    /**
     * Return the authenticate function for the local strategy.
     * This function will be used to authenticate requests using local (username/password) authentication.
     */
    return this.passport.authenticate(strategy, { session: false });

   case AuthStrategies.Google:
    /**
     * Return the authenticate function for the Google strategy.
     * This function will be used to authenticate requests using Google OAuth.
     */
    return this.passport.authenticate(strategy, { session: false });

   case AuthStrategies.Jwt:
    /**
     * Return the authenticate function for the JWT strategy.
     * This function will be used to authenticate requests using JWT tokens.
     */
    return this.passport.authenticate(strategy, { session: false });

   case AuthStrategies.Facebook:
    /**
     * Return the authenticate function for the Facebook strategy.
     * This function will be used to authenticate requests using Facebook OAuth.
     */
    return this.passport.authenticate(strategy, { session: false });

   case AuthStrategies.Twitter:
    /**
     * Return the authenticate function for the Twitter strategy.
     * This function will be used to authenticate requests using Twitter OAuth.
     */
    return this.passport.authenticate(strategy, { session: false });

   case AuthStrategies.GitHub:
    /**
     * Return the authenticate function for the GitHub strategy.
     * This function will be used to authenticate requests using GitHub OAuth.
     */
    return this.passport.authenticate(strategy, { session: false });

   default:
    /**
     * Throw an error if the specified strategy is invalid.
     * This ensures that only valid strategies are used for authentication.
     */
    throw new Error('Invalid authentication strategy');
  }
 }

 /**
  * @method serializeUser
  * @description Serialize user information to store in session. This method defines how user data is serialized to the session.
  */
 public serializeUser(): void {
  /**
   * Define how the user information is serialized to the session.
   * This involves specifying what part of the user data should be stored in the session.
   */
  this.passport.serializeUser((user: User, done) => {
   /**
    * Serialize the user ID to the session.
    * This means that only the user ID is stored in the session, not the entire user object.
    */
   done(null, user.id);
  });

  /**
   * Define how the user information is deserialized from the session.
   * This involves specifying how to retrieve the full user data from the session data.
   */
  this.passport.deserializeUser(async (id: string, done) => {
   /**
    * Fetch user from the database using the ID.
    * This query retrieves the full user object based on the stored user ID.
    */
   const user = await ServiceFactory.createUserRepository().findById(id);

   if (user) {
    /**
     * If the user is found, complete the deserialization.
     * This means the user data is successfully retrieved and can be used in the application.
     */
    done(null, user);
   } else {
    /**
     * If the user is not found, return an error.
     * This handles the case where the user ID does not correspond to a valid user.
     */
    done(new Error('User not found'));
   }
  });
 }
}
