// src/services/passport/strategy.factory.ts

import { PassportStrategy } from './passport.strategy';
import { LocalStrategyFactory } from './strategies/local.strategy.factory';
import { GoogleStrategyFactory } from './strategies/google.strategy.factory';
import { JwtStrategyFactory } from './strategies/jwt.strategy.factory';
import { FacebookStrategyFactory } from './strategies/facebook.strategy.factory';
import { TwitterStrategyFactory } from './strategies/twitter.strategy.factory';
import { GitHubStrategyFactory } from './strategies/github.strategy.factory';

/**
 * Factory for creating authentication strategy instances.
 *
 * @remarks
 * This factory provides methods to create instances of different Passport
 * authentication strategies such as local, Google, JWT, Facebook, Twitter, and GitHub.
 */
export class StrategyFactory {
  /**
   * Create a LocalStrategy instance.
   *
   * @returns An instance of LocalStrategy.
   */
  public static createLocalStrategy(): PassportStrategy {
    return LocalStrategyFactory.createLocalStrategy();
  }

  /**
   * Create a GoogleStrategy instance.
   *
   * @returns An instance of GoogleStrategy.
   */
  public static createGoogleStrategy(): PassportStrategy {
    return GoogleStrategyFactory.createGoogleStrategy();
  }

  /**
   * Create a JwtStrategy instance.
   *
   * @returns An instance of JwtStrategy.
   */
  public static createJwtStrategy(): PassportStrategy {
    return JwtStrategyFactory.createJwtStrategy();
  }

  /**
   * Create a FacebookStrategy instance.
   *
   * @returns An instance of FacebookStrategy.
   */
  public static createFacebookStrategy(): PassportStrategy {
    return FacebookStrategyFactory.createFacebookStrategy();
  }

  /**
   * Create a TwitterStrategy instance.
   *
   * @returns An instance of TwitterStrategy.
   */
  public static createTwitterStrategy(): PassportStrategy {
    return TwitterStrategyFactory.createTwitterStrategy();
  }

  /**
   * Create a GitHubStrategy instance.
   *
   * @returns An instance of GitHubStrategy.
   */
  public static createGitHubStrategy(): PassportStrategy {
    return GitHubStrategyFactory.createGitHubStrategy();
  }
}