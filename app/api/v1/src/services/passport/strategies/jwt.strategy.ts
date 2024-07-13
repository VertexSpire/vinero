// src/services/passport/strategies/jwt.strategy.ts

import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * @class JwtStrategy
 * @implements PassportStrategy
 * @description JWT passport strategy for authenticating users. This strategy handles user authentication using JSON Web Tokens (JWT).
 */
export class JwtStrategy implements PassportStrategy {
  /**
   * @property {UserService} userService - The UserService instance. This service is used to perform user-related operations during authentication.
   */
  private readonly userService: UserService;

  /**
   * @property {ConfigService} configService - The ConfigService instance. This service is used to access configuration settings for the JWT strategy.
   */
  private readonly configService: ConfigService;

  /**
   * @constructor
   * @description Constructor for the JwtStrategy class. It initializes the strategy with instances of UserService and ConfigService.
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
     * This ensures that the configuration service can be used to access settings for the JWT strategy.
     */
    this.configService = configService;
  }

  /**
   * @method configureStrategy
   * @description Configure the JWT passport strategy. This method sets up the strategy with the Passport instance
   * using the provided strategy options and callback handler.
   *
   * @param {PassportStatic} passport - The Passport instance. This parameter provides the Passport instance used to configure strategies.
   */
  public configureStrategy(passport: PassportStatic): void {
    /**
     * Use the JWT strategy with the Passport instance.
     * The strategy is configured with options and a callback handler.
     */
    passport.use(new JwtStrategy(this.getJwtStrategyOptions(), this.handleJwtCallback.bind(this)));
  }

  /**
   * @method getJwtStrategyOptions
   * @description Get the options for the JWT passport strategy. This method retrieves the necessary configuration
   * settings from the configuration service and returns them as strategy options.
   *
   * @returns {StrategyOptions} - Strategy options. These options include the secret key and the method to extract the JWT from the request.
   */
  private getJwtStrategyOptions(): StrategyOptions {
    /**
     * Get the JWT secret key from the configuration service.
     * This key is used to sign and verify JWTs.
     */
    const jwtSecretKey = this.configService.getValue<string>('jwtAuth.secretKey');

    /**
     * Validate that the necessary configuration setting is present.
     * If the required setting is missing, throw an error.
     */
    if (!jwtSecretKey) {
      throw new Error('Incomplete JWT auth config');
    }

    /**
     * Return the strategy options for the JWT strategy.
     * These options include the method to extract the JWT from the request and the secret key.
     */
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    };
  }

  /**
   * @method handleJwtCallback
   * @description Handle the JWT passport strategy callback. This method processes the JWT, validates the payload,
   * and authenticates the user.
   *
   * @param {any} payload - Decoded JWT payload. This parameter provides the payload data extracted from the JWT.
   * @param {VerifyFunction} done - Passport done function. This function is called to complete the authentication process.
   */
  private async handleJwtCallback(
    payload: any, // Adjust type based on the decoded JWT payload structure
    done: VerifyFunction,
  ): Promise<void> {
    try {
      /**
       * Validate the JWT payload and retrieve the user.
       * The user service retrieves the user based on the payload information.
       */
      const user: User = await this.validateAndRetrieveUser(payload);

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
   * @description Validate and retrieve a user based on the JWT payload. This function validates the JWT payload
   * and retrieves the user if it exists.
   *
   * @param {any} payload - Decoded JWT payload. This parameter provides the payload data extracted from the JWT.
   * @returns {Promise<User | null>} - The authenticated user if found; otherwise, returns null.
   */
  private async validateAndRetrieveUser(payload: any): Promise<User | null> {
    /**
     * Extract the user ID from the JWT payload.
     * This ID is used to identify the user in the database.
     */
    const userId = payload.sub;

    /**
     * Check if the user exists based on the user ID.
     * The user service retrieves the user from the database.
     */
    const existingUser = await this.userService.findUserById(userId);

    /**
     * Return the existing user if found.
     * Otherwise, return null to indicate that the user does not exist.
     */
    return existingUser;
  }
}
