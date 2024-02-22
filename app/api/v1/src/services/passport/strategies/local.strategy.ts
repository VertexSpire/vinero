import { Strategy as LocalStrategy, StrategyOptions } from 'passport-local';
import { PassportStatic } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * Local passport strategy for authenticating users.
 */
export class LocalStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the LocalStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the Local passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(new LocalStrategy(this.getLocalStrategyOptions(), this.handleLocalCallback.bind(this)));
  }

  /**
   * Get the options for the Local passport strategy.
   * @returns Strategy options.
   */
  private getLocalStrategyOptions(): StrategyOptions {
    const usernameField = this.configService.getValue<string>('localAuth.usernameField');
    const passwordField = this.configService.getValue<string>('localAuth.passwordField');

    if (!usernameField || !passwordField) {
      throw new Error('Incomplete Local auth config');
    }

    return {
      usernameField,
      passwordField,
    };
  }

  /**
   * Handle the Local passport strategy callback.
   * @param username - User's username or email.
   * @param password - User's password.
   * @param done - Passport done function.
   */
  private async handleLocalCallback(
    username: string,
    password: string,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    try {
      const user: User | null = await this.validateAndRetrieveUser(username, password);

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  /**
   * Validate and retrieve a user based on the Local authentication.
   * @param username - User's username or email.
   * @param password - User's password.
   * @returns The authenticated user.
   */
  private async validateAndRetrieveUser(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.userService.findUserByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
