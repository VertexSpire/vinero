// src/services/passport/strategies/jwt.strategy.ts
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStatic, VerifyFunction } from 'passport';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { PassportStrategy } from '../passport.strategy';
import { ConfigService } from '../../services/config/config.service';

/**
 * JWT passport strategy for authenticating users.
 */
export class JwtStrategy implements PassportStrategy {
  private readonly userService: UserService;
  private readonly configService: ConfigService;

  /**
   * Constructor for the JwtStrategy class.
   * @param userService - The UserService instance.
   * @param configService - The ConfigService instance.
   */
  constructor(userService: UserService, configService: ConfigService) {
    this.userService = userService;
    this.configService = configService;
  }

  /**
   * Configure the JWT passport strategy.
   * @param passport - The Passport instance.
   */
  public configureStrategy(passport: PassportStatic): void {
    passport.use(new JwtStrategy(this.getJwtStrategyOptions(), this.handleJwtCallback.bind(this)));
  }

  /**
   * Get the options for the JWT passport strategy.
   * @returns Strategy options.
   */
  private getJwtStrategyOptions(): StrategyOptions {
    const jwtSecretKey = this.configService.getValue<string>('jwtAuth.secretKey');

    if (!jwtSecretKey) {
      throw new Error('Incomplete JWT auth config');
    }

    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    };
  }

  /**
   * Handle the JWT passport strategy callback.
   * @param payload - Decoded JWT payload.
   * @param done - Passport done function.
   */
  private async handleJwtCallback(
    payload: any, // Adjust type based on the decoded JWT payload structure
    done: VerifyFunction,
  ): Promise<void> {
    try {
      const user: User = await this.validateAndRetrieveUser(payload);

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }

  /**
   * Validate and retrieve a user based on the JWT payload.
   *
   * This function validates the JWT payload and retrieves the user if it exists.
   *
   * @param payload - Decoded JWT payload.
   * @returns The authenticated user if found; otherwise, returns null.
   */
  private async validateAndRetrieveUser(payload: any): Promise<User | null> {
    // Extract user ID from the JWT payload
    const userId = payload.sub;

    // Check if the user exists based on the user ID
    const existingUser = await this.userService.findUserById(userId);

    return existingUser;
  }
}
