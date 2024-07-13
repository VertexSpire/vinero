// src/services/passport/passport.service.factory.ts

import { PassportService } from './passport.service';
import { StrategyFactory } from './strategy.factory';
import passport from 'passport';

/**
 * @class PassportServiceFactory
 * @description Factory class for creating instances of the PassportService. This factory provides a method to
 * instantiate new PassportService objects, managing a singleton instance and ensuring that the same instance
 * is used throughout the application.
 */
export class PassportServiceFactory {
 /**
  * @property {PassportService} passportService - The singleton instance of PassportService. This property ensures that only one
  * instance of PassportService is created and shared throughout the application.
  */
 private static passportService: PassportService;

 /**
  * @method createPassportService
  * @description Creates and returns a new instance of PassportService with the specified StrategyFactory. This method
  * abstracts the instantiation process, allowing for easy creation of PassportService objects without needing to directly
  * call the constructor.
  *
  * @param {StrategyFactory} strategyFactory - The StrategyFactory instance. This parameter provides the strategy factory
  * used to create authentication strategies for Passport.
  * @returns {PassportService} - A new instance of PassportService. This instance can be used to handle authentication using
  * Passport and the specified strategies.
  */
 public static createPassportService(strategyFactory: StrategyFactory): PassportService {
  if (!PassportServiceFactory.passportService) {
   PassportServiceFactory.passportService = new PassportService(passport, strategyFactory);
  }
  return PassportServiceFactory.passportService;
 }
}
