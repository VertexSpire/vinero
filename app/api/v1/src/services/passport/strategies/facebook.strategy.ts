// src/services/passport/strategies/facebook.strategy.ts
import { Strategy as FacebookStrategy, StrategyOptions } from 'passport-facebook';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * Facebook passport strategy for authenticating users.
 */
export class FacebookStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the FacebookStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the Facebook passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(new FacebookStrategy(this.getFacebookStrategyOptions(), this.handleFacebookCallback.bind(this)));
  }

  /**
   * Get the options for the Facebook passport strategy.
   * @returns Strategy options.
   */
  private getFacebookStrategyOptions(): StrategyOptions {
    const clientID = this.configService.getValue<string>('facebookAuth.clientID');
    const clientSecret = this.configService.getValue<string>('facebookAuth.clientSecret');
    const callbackURL = this.configService.getValue<string>('facebookAuth.callbackURL');
    const profileFields = this.configService.getValue<string[]>('facebookAuth.profileFields');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Incomplete Facebook auth config');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      profileFields,
    };
  }

  /**
   * Handle the Facebook passport strategy callback.
   * @param req - Express request object.
   * @param accessToken - Facebook API access token.
   * @param refreshToken - Facebook API refresh token.
   * @param profile - User profile from Facebook.
   * @param done - Passport done function.
   */
  private async handleFacebookCallback(
    req: any, // Adjust type based on your Express request object
    accessToken: string,
    refreshToken: string,
    profile: any, // Adjust type based on the Facebook profile structure
    done: VerifyFunction,
  ): Promise<void> {
    try {
      const user: User = await this.validateAndRetrieveUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  /**
   * Validate and retrieve a user based on the Facebook profile.
   * @param profile - User profile from Facebook.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(profile: any): Promise<User> {
    // Your logic to find or create user based on Facebook profile
  }
}
