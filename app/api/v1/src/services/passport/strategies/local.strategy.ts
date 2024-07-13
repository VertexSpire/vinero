import { Strategy as LocalStrategy, StrategyOptions } from 'passport-local';
import { PassportStatic } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class LocalStrategy
 * @implements PassportStrategy
 * @description Local passport strategy for authenticating users. This strategy handles user authentication using traditional username and password credentials.
 */
export class LocalStrategy implements PassportStrategy {
 /**
  * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
  */
 private readonly userService: UserService;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the local strategy.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the LocalStrategy class. It initializes the strategy with instances of UserService and ConfigService.
  *
  * @param {UserService} userService - The UserService instance. This parameter provides the service for user-related operations.
  * @param {ConfigService} configService - The ConfigService instance. This parameter provides the service for accessing configuration settings.
  */
 constructor(userService: UserService, configService: ConfigService) {
  /**
   * Assign the user service instance to the class property.
   * This ensures that the user service can be used to manage user operations during authentication.
   */
  this.userService = userService;

  /**
   * Assign the configuration service instance to the class property.
   * This ensures that the configuration service can be used to access settings for the local strategy.
   */
  this.configService = configService;
 }

 /**
  * @method configureStrategy
  * @description Configure the Local passport strategy. This method sets up the strategy with the Passport instance
  * using the provided strategy options and callback handler.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  */
 public configureStrategy(passport: PassportStatic): void {
  /**
   * Use the Local strategy with the Passport instance.
   * The strategy is configured with options and a callback handler.
   */
  passport.use(new LocalStrategy(this.getLocalStrategyOptions(), this.handleLocalCallback.bind(this)));
 }

 /**
  * @method getLocalStrategyOptions
  * @description Get the options for the Local passport strategy. This method retrieves the necessary configuration
  * settings from the configuration service and returns them as strategy options.
  *
  * @returns {StrategyOptions} - Strategy options. These options include the fields for the username and password.
  */
 private getLocalStrategyOptions(): StrategyOptions {
  /**
   * Get the username field from the configuration service.
   * This field specifies which form field to use for the username.
   */
  const usernameField = this.configService.getValue<string>('localAuth.usernameField');

  /**
   * Get the password field from the configuration service.
   * This field specifies which form field to use for the password.
   */
  const passwordField = this.configService.getValue<string>('localAuth.passwordField');

  /**
   * Validate that the necessary configuration settings are present.
   * If any required setting is missing, throw an error.
   */
  if (!usernameField || !passwordField) {
   throw new Error('Incomplete Local auth config');
  }

  /**
   * Return the strategy options for the Local strategy.
   * These options include the fields for the username and password.
   */
  return {
   usernameField,
   passwordField,
  };
 }

 /**
  * @method handleLocalCallback
  * @description Handle the Local passport strategy callback. This method processes the username and password, validates them,
  * and authenticates the user.
  *
  * @param {string} username - User's username or email. This parameter provides the username or email entered by the user.
  * @param {string} password - User's password. This parameter provides the password entered by the user.
  * @param {function} done - Passport done function. This function is called to complete the authentication process.
  */
 private async handleLocalCallback(
  username: string,
  password: string,
  done: (error: any, user?: any, info?: any) => void,
 ): Promise<void> {
  try {
   /**
    * Validate the username and password and retrieve the user.
    * The user service validates the credentials and retrieves the user if valid.
    */
   const user: User | null = await this.validateAndRetrieveUser(username, password);

   /**
    * If the user is not found, call the done function with an error message.
    * This indicates that the authentication failed due to invalid credentials.
    */
   if (!user) {
    return done(null, false, { message: 'Invalid username or password' });
   }

   /**
    * Call the done function to complete the authentication process.
    * Pass the authenticated user to the done function.
    */
   return done(null, user);
  } catch (error) {
   /**
    * Call the done function with an error to indicate authentication failure.
    * Pass the error to the done function.
    */
   return done(error, false);
  }
 }

 /**
  * @method validateAndRetrieveUser
  * @description Validate and retrieve a user based on the Local authentication. This function validates the username and password
  * and retrieves the user if the credentials are valid.
  *
  * @param {string} username - User's username or email. This parameter provides the username or email entered by the user.
  * @param {string} password - User's password. This parameter provides the password entered by the user.
  * @returns {Promise<User | null>} - The authenticated user if found; otherwise, returns null.
  */
 private async validateAndRetrieveUser(username: string, password: string): Promise<User | null> {
  /**
   * Find the user by username or email.
   * The user service retrieves the user from the database based on the username or email.
   */
  const user: User | null = await this.userService.findUserByUsername(username);

  /**
   * If the user is not found, return null to indicate invalid credentials.
   * This means the authentication failed because the user does not exist.
   */
  if (!user) {
   return null;
  }

  /**
   * Validate the user's password.
   * The user service checks if the provided password matches the stored password.
   */
  const isPasswordValid = await this.userService.validatePassword(user, password);

  /**
   * If the password is not valid, return null to indicate invalid credentials.
   * This means the authentication failed because the password is incorrect.
   */
  if (!isPasswordValid) {
   return null;
  }

  /**
   * Return the authenticated user if the credentials are valid.
   * This means the user has been successfully authenticated.
   */
  return user;
 }
}
