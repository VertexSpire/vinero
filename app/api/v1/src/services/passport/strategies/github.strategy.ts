// src/services/passport/strategies/github.strategy.ts
import { Strategy as GitHubStrategy, StrategyOptions } from 'passport-github';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * GitHub passport strategy for authenticating users.
 */
export class GitHubStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the GitHubStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the GitHub passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(
      new GitHubStrategy(
        this.getGitHubStrategyOptions(),
        this.handleGitHubCallback.bind(this)
      )
    );
  }

  /**
   * Get the options for the GitHub passport strategy.
   * @returns Strategy options.
   */
  private getGitHubStrategyOptions(): StrategyOptions {
    const clientID = this.configService.getValue<string>('githubAuth.clientID');
    const clientSecret = this.configService.getValue<string>('githubAuth.clientSecret');
    const callbackURL = this.configService.getValue<string>('githubAuth.callbackURL');
    const scope = this.configService.getValue<string[]>('githubAuth.scope');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Incomplete GitHub auth config');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      scope,
    };
  }

  /**
   * Handle the GitHub passport strategy callback.
   * @param req - Express request object.
   * @param accessToken - GitHub API access token.
   * @param refreshToken - GitHub API refresh token.
   * @param profile - User profile from GitHub.
   * @param done - Passport done function.
   */
  private async handleGitHubCallback(
    req: any, // Adjust type based on your Express request object
    accessToken: string,
    refreshToken: string,
    profile: any, // Adjust type based on the GitHub profile structure
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
   * Validate and retrieve a user based on the GitHub profile.
   * @param profile - User profile from GitHub.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(profile: any): Promise<User> {
    // Your logic to find or create user based on GitHub profile
  }
}
