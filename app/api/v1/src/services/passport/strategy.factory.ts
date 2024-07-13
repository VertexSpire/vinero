// src/services/passport/strategy.factory.ts

import { PassportStrategy } from './passport.strategy';
import { LocalStrategyFactory } from './strategies/local.strategy.factory';
import { GoogleStrategyFactory } from './strategies/google.strategy.factory';
import { JwtStrategyFactory } from './strategies/jwt.strategy.factory';
import { FacebookStrategyFactory } from './strategies/facebook.strategy.factory';
import { TwitterStrategyFactory } from './strategies/twitter.strategy.factory';
import { GitHubStrategyFactory } from './strategies/github.strategy.factory';

/**
 * @class StrategyFactory
 * @description Factory for creating authentication strategy instances. This factory provides methods to create
 * instances of different Passport authentication strategies such as local, Google, JWT, Facebook, Twitter, and GitHub.
 */
export class StrategyFactory {
  /**
   * @method createLocalStrategy
   * @description Create a LocalStrategy instance. This method uses the LocalStrategyFactory to create an instance of
   * LocalStrategy, which handles traditional username/password authentication.
   *
   * @returns {PassportStrategy} - An instance of LocalStrategy. This instance is used to handle local authentication with Passport.
   */
  public static createLocalStrategy(): PassportStrategy {
    return LocalStrategyFactory.createLocalStrategy();
  }

  /**
   * @method createGoogleStrategy
   * @description Create a GoogleStrategy instance. This method uses the GoogleStrategyFactory to create an instance of
   * GoogleStrategy, which handles authentication via Google OAuth.
   *
   * @returns {PassportStrategy} - An instance of GoogleStrategy. This instance is used to handle Google authentication with Passport.
   */
  public static createGoogleStrategy(): PassportStrategy {
    return GoogleStrategyFactory.createGoogleStrategy();
  }

  /**
   * @method createJwtStrategy
   * @description Create a JwtStrategy instance. This method uses the JwtStrategyFactory to create an instance of
   * JwtStrategy, which handles token-based authentication.
   *
   * @returns {PassportStrategy} - An instance of JwtStrategy. This instance is used to handle JWT authentication with Passport.
   */
  public static createJwtStrategy(): PassportStrategy {
    return JwtStrategyFactory.createJwtStrategy();
  }

  /**
   * @method createFacebookStrategy
   * @description Create a FacebookStrategy instance. This method uses the FacebookStrategyFactory to create an instance of
   * FacebookStrategy, which handles authentication via Facebook OAuth.
   *
   * @returns {PassportStrategy} - An instance of FacebookStrategy. This instance is used to handle Facebook authentication with Passport.
   */
  public static createFacebookStrategy(): PassportStrategy {
    return FacebookStrategyFactory.createFacebookStrategy();
  }

  /**
   * @method createTwitterStrategy
   * @description Create a TwitterStrategy instance. This method uses the TwitterStrategyFactory to create an instance of
   * TwitterStrategy, which handles authentication via Twitter OAuth.
   *
   * @returns {PassportStrategy} - An instance of TwitterStrategy. This instance is used to handle Twitter authentication with Passport.
   */
  public static createTwitterStrategy(): PassportStrategy {
    return TwitterStrategyFactory.createTwitterStrategy();
  }

  /**
   * @method createGitHubStrategy
   * @description Create a GitHubStrategy instance. This method uses the GitHubStrategyFactory to create an instance of
   * GitHubStrategy, which handles authentication via GitHub OAuth.
   *
   * @returns {PassportStrategy} - An instance of GitHubStrategy. This instance is used to handle GitHub authentication with Passport.
   */
  public static createGitHubStrategy(): PassportStrategy {
    return GitHubStrategyFactory.createGitHubStrategy();
  }
}
