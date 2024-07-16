// src/core/hooks/hooks.factory.ts

import { Hooks } from './hooks';
import { LoggerService } from '../../services/logger/logger.service';
import { LoggerServiceFactory } from '../../services/logger/logger.service.factory';

/**
 * @class HooksFactory
 * @description Factory for creating instances of the Hooks class and injecting necessary services such as the LoggerService.
 * The factory pattern is used to encapsulate the creation logic of the Hooks class and its dependencies, providing a clean and
 * maintainable way to manage object creation.
 */
export class HooksFactory {
 /**
  * @method createLoggerService
  * @description Create and return an instance of LoggerService.
  * This method abstracts the creation of the LoggerService instance, allowing for easy modifications and dependency management.
  * @returns {LoggerService} - An instance of LoggerService.
  * The returned LoggerService instance is created using the LoggerServiceFactory, ensuring consistent and centralized management
  * of the logger service creation.
  */
 public static createLoggerService(): LoggerService {
  return LoggerServiceFactory.createLoggerService();
 }

 /**
  * @method createHooks
  * @description Create and return an instance of the Hooks class with an injected LoggerService.
  * This method abstracts the creation of the Hooks instance, ensuring that it is always created with the necessary dependencies.
  * @returns {Hooks} - An instance of the Hooks class.
  * The returned Hooks instance is created with a LoggerService instance injected into it, allowing the Hooks class to log actions
  * and events effectively.
  */
 public static createHooks(): Hooks {
  const loggerService = HooksFactory.createLoggerService();
  return new Hooks(loggerService);
 }
}
