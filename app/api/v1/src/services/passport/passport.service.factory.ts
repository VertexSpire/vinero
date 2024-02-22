// src/services/passport/passport.service.factory.ts
import { PassportService } from './passport.service';
import { StrategyFactory } from './strategy.factory';
import passport from 'passport';

/**
 * Factory for creating PassportService instances.
 */
export class PassportServiceFactory {
  /**
   * Create a new instance of PassportService with the specified StrategyFactory.
   * @param strategyFactory - The StrategyFactory instance.
   * @returns An instance of PassportService.
   */
  public static createPassportService(strategyFactory: StrategyFactory): PassportService {
    return new PassportService(passport, strategyFactory);
  }
}
