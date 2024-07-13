// src/services/passport/strategies/github.strategy.ts

import { Strategy as GitHubStrategy, StrategyOptions } from 'passport-github';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class GitHubStrategy
 * @implements PassportStrategy
 * @description GitHub passport strategy for authenticating users. This class configures the GitHub OAuth strategy
 * for Passport, allowing users to authenticate using their GitHub accounts.
 */
export class GitHubStrategy implements PassportStrategy {
 /**
  * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
  */
 private readonly userService: UserService;

 /**
  * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the GitHub strategy.
  */
 private readonly configService: ConfigService;

 /**
  * @constructor
  * @description Constructor for the GitHubStrategy class. It initializes the strategy with instances of UserService and ConfigService.
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
   * This ensures that the configuration service can be used to access settings for the GitHub strategy.
   */
  this.configService = configService;
 }

 /**
  * @method configureStrategy
  * @description Configure the GitHub passport strategy. This method sets up the strategy with the Passport instance
  * using the provided strategy options and callback handler.
  *
  * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
  */
 public configureStrategy(passport: PassportStatic): void {
  /**
   * Use the GitHub strategy with the Passport instance.
   * The strategy is configured with options and a callback handler.
   */
  passport.use(new GitHubStrategy(this.getGitHubStrategyOptions(), this.handleGitHubCallback.bind(this)));
 }

 /**
  * @method getGitHubStrategyOptions
  * @description Get the options for the GitHub passport strategy. This method retrieves the necessary configuration
  * settings from the configuration service and returns them as strategy options.
  *
  * @returns {StrategyOptions} - Strategy options. These options include the client ID, client secret, callback URL, and scope.
  */
 private getGitHubStrategyOptions(): StrategyOptions {
  /**
   * Get the GitHub client ID from the configuration service.
   * This ID is used to identify the application to GitHub.
   */
  const clientID = this.configService.getValue<string>('githubAuth.clientID');

  /**
   * Get the GitHub client secret from the configuration service.
   * This secret is used to authenticate the application to GitHub.
   */
  const clientSecret = this.configService.getValue<string>('githubAuth.clientSecret');

  /**
   * Get the GitHub callback URL from the configuration service.
   * This URL is used by GitHub to redirect users after authentication.
   */
  const callbackURL = this.configService.getValue<string>('githubAuth.callbackURL');

  /**
   * Get the GitHub scope from the configuration service.
   * This scope specifies the permissions requested from GitHub.
   */
  const scope = this.configService.getValue<string[]>('githubAuth.scope');

  /**
   * Validate that all necessary configuration settings are present.
   * If any required setting is missing, throw an error.
   */
  if (!clientID || !clientSecret || !callbackURL) {
   throw new Error('Incomplete GitHub auth config');
  }

  /**
   * Return the strategy options for the GitHub strategy.
   * These options include the client ID, client secret, callback URL, and scope.
   */
  return {
   clientID,
   clientSecret,
   callbackURL,
   scope,
  };
 }

 /**
  * @method handleGitHubCallback
  * @description Handle the GitHub passport strategy callback. This method processes the callback from GitHub,
  * retrieves user information, and authenticates the user.
  *
  * @param {any} req - Express request object. This parameter provides the request data sent by GitHub during the callback.
  * @param {string} accessToken - GitHub API access token. This token is used to access GitHub APIs on behalf of the user.
  * @param {string} refreshToken - GitHub API refresh token. This token is used to refresh the access token when it expires.
  * @param {any} profile - User profile from GitHub. This parameter provides the user's profile information retrieved from GitHub.
  * @param {VerifyFunction} done - Passport done function. This function is called to complete the authentication process.
  */
 private async handleGitHubCallback(
  req: any, // Adjust type based on your Express request object
  accessToken: string,
  refreshToken: string,
  profile: any, // Adjust type based on the GitHub profile structure
  done: VerifyFunction,
 ): Promise<void> {
  try {
   /**
    * Authenticate the user using the user service.
    * The user service retrieves or creates the user based on the GitHub profile information.
    */
   const user: User = await this.userService.authenticateUserByGitHub('githubUserId', profile);

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
}
