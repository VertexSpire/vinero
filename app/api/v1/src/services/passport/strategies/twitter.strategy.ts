// src/services/passport/strategies/twitter.strategy.ts
import { Strategy as TwitterStrategy, StrategyOptions } from 'passport-twitter';
import { PassportStatic } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * Twitter passport strategy for authenticating users.
 */
export class TwitterStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the TwitterStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the Twitter passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(
      new TwitterStrategy(
        this.getTwitterStrategyOptions(),
        this.handleTwitterCallback.bind(this)
      )
    );
  }

  /**
   * Get the options for the Twitter passport strategy.
   * @returns Strategy options.
   */
  private getTwitterStrategyOptions(): StrategyOptions {
    const consumerKey = this.configService.getValue<string>('twitterAuth.consumerKey');
    const consumerSecret = this.configService.getValue<string>('twitterAuth.consumerSecret');
    const callbackURL = this.configService.getValue<string>('twitterAuth.callbackURL');
    
    if (!consumerKey || !consumerSecret || !callbackURL) {
      throw new Error('Incomplete Twitter auth config');
    }

    return {
      consumerKey,
      consumerSecret,
      callbackURL,
      includeEmail: true,
    };
  }

   /**
   * Handle the Twitter passport strategy callback.
   * @param token - Twitter API token.
   * @param tokenSecret - Twitter API token secret.
   * @param profile - User profile from Twitter.
   * @param done - Passport done function.
   */
   private async handleTwitterCallback(
    token: string,
    tokenSecret: string,
    profile: any, // Adjust type based on the Twitter profile structure
    done: VerifyFunction
  ): Promise<void> {
    try {
      const user: User = await this.validateAndRetrieveUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  /**
   * Validate and retrieve a user based on the Twitter profile.
   * @param profile - User profile from Twitter.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(profile: any): Promise<User> {
    // Your logic to find or create user based on Twitter profile
  }
}
