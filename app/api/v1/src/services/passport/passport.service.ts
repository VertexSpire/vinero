// src/services/passport/passport.service.ts
import { PassportStatic } from 'passport';
import { LocalStrategyFactory } from './strategies/local.strategy.factory';
import { GoogleStrategyFactory } from './strategies/google.strategy.factory';
import { JwtStrategyFactory } from './strategies/jwt.strategy.factory';
import { AuthStrategies } from '../../common/enums/auth.enum';

/**
 * Service for managing Passport authentication strategies.
 */
export class PassportService {
  
    /**
   * The strategy factory used to create authentication strategy instances.
   */
  private readonly strategyFactory: StrategyFactory;

  /**
   * The Passport instance.
   */
  private readonly passport: PassportStatic;

  /**
   * Constructor for the PassportService class.
   * @param passport - The Passport instance.
   * @param strategyFactory - The StrategyFactory instance.
   */
  constructor(
    passport: PassportStatic,
    strategyFactory: StrategyFactory
    ) {
    this.strategyFactory = strategyFactory;
    this.passport = passport;
    // Initialize and configure authentication strategies
    this.initializeAuthStrategies(passport);
  }

   /**
   * Initialize and configure authentication strategies.
  
   */
   private initializeAuthStrategies(): void {
    const localStrategy = this.strategyFactory.createLocalStrategy();
    const googleStrategy = this.strategyFactory.createGoogleStrategy();
    const jwtStrategy = this.strategyFactory.createJwtStrategy();
    const facebookStrategy = this.strategyFactory.createFacebookStrategy();
    const twitterStrategy = this.strategyFactory.createTwitterStrategy();
    const githubStrategy = this.strategyFactory.createGitHubStrategy();

    this.configureStrategy(localStrategy);
    this.configureStrategy(googleStrategy);
    this.configureStrategy(jwtStrategy);
    this.configureStrategy(facebookStrategy);
    this.configureStrategy(twitterStrategy);
    this.configureStrategy(githubStrategy);
  }

  /**
   * Configure a specific authentication strategy.
   * @param strategy - The authentication strategy to configure.
   */
  private configureStrategy(strategy: PassportStrategy): void {
    strategy.configureStrategy(this.passport);
  }

  /**
   * Get the authenticate function based on the specified strategy.
   * @param strategy - The authentication strategy.
   * @returns The authenticate function for the specified strategy.
   */
  public getAuthenticateFunction(strategy: AuthStrategies): Function {
    switch (strategy) {
      case AuthStrategies.Local:
        return this.passport.authenticate(strategy, { session: false });

      // Add cases for other strategies
      case AuthStrategies.Google:
        return this.passport.authenticate(strategy, { session: false });

      case AuthStrategies.Jwt:
        return this.passport.authenticate(strategy, { session: false });

      case AuthStrategies.Facebook:
        return this.passport.authenticate(strategy, { session: false });

      case AuthStrategies.Twitter:
        return this.passport.authenticate(strategy, { session: false });

      case AuthStrategies.GitHub:
        return this.passport.authenticate(strategy, { session: false });

      default:
        throw new Error('Invalid authentication strategy');
    }
  }

  public serializeUser(): void {
    this.passport.serializeUser((user: User, done) => {
      done(null, user.id);
    });

    this.passport.deserializeUser(async (id: string, done) => {
      // Fetch user from the database using id
      const user = await ServiceFactory.createUserRepository().findById(id);

      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'));
      }
    });
  }
}
