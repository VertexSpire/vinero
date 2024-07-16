// src/core/hooks/hooks.ts

import { Hook } from '../../common/interfaces/hook.interface';
import { LoggerService } from '../../services/logger/logger.service';

/**
 * @class Hooks
 * @description A class to manage an array of functions or class instances stored in a hashmap. This class provides methods to bind,
 * remove, and apply hooks, as well as to execute actions associated with these hooks. Each function can be registered with a priority.
 * Hooks are used to modify or extend the behavior of a system by injecting custom code at predefined points.
 * The hooks are stored in a Map, where each key corresponds to a specific event or action, and the value is an array of hooks associated
 * with that event or action. The hooks can be executed in a specific order based on their priority.
 */
export class Hooks {
 /**
  * @property {Map<string, Hook[]>} hooks - A hashmap to store arrays of hooks associated with a specific key.
  * @description This property holds a Map where each key corresponds to an array of hooks (function and priority) that can be executed.
  * The hooks are stored as an array of objects, each containing a function and a priority. The priority determines the order in which
  * the hooks are executed.
  */
 private hooks: Map<string, Hook[]> = new Map();

 /**
  * @property {LoggerService} logger - The LoggerService instance.
  * @description This property holds an instance of LoggerService, which is used to log actions within the Hooks class.
  * The LoggerService provides methods to log informational messages, errors, and other types of messages.
  */
 private readonly logger: LoggerService;

 /**
  * @constructor
  * @description Constructor for the Hooks class. It initializes the logger service using dependency injection.
  * @param {LoggerService} logger - The LoggerService instance to be injected.
  * The constructor initializes the hooks property as an empty Map and sets the logger property using the provided LoggerService instance.
  * It also logs an informational message indicating that the Hooks instance has been created.
  */
 constructor(logger: LoggerService) {
  /**
   * Initialize the logger service using dependency injection.
   * This helps in logging various actions performed by the Hooks class.
   */
  this.logger = logger;
  this.logger.info('Hooks instance created.');
 }

 /**
  * @method bind
  * @description Register a function or class instance under a specific key with a priority.
  * @param {string} key - The key under which the hook should be registered.
  * @param {Hook} hook - The hook instance to register.
  * @description This method registers a function or class instance under the specified key with a given priority.
  * If the key already exists, the function is added to the array in the correct position based on its priority.
  * If the key does not exist, a new entry is created in the Map with the key and an array containing the hook.
  */
 public bind(key: string, hook: Hook): void {
  this.logger.info(`Binding hook under key: ${key} with priority: ${hook.priority}`);
  if (!this.hooks.has(key)) {
   this.hooks.set(key, []);
  }
  this.hooks.get(key)!.push(hook);
  this.hooks.get(key)!.sort((a, b) => a.priority - b.priority);
 }

 /**
  * @method remove
  * @description Remove a function or class instance from a specific key.
  * @param {string} key - The key from which the hook should be removed.
  * @param {Hook} hook - The hook instance to remove.
  * @description This method removes a function or class instance from the array associated with the specified key.
  * It first checks if the key exists in the Map. If it does, it finds the index of the hook in the array and removes it.
  * If the array becomes empty after the removal, the key is deleted from the Map.
  */
 public remove(key: string, hook: Hook): void {
  this.logger.info(`Removing hook from key: ${key}`);
  if (!this.hooks.has(key)) return;
  const hooksArray = this.hooks.get(key)!;
  const index = hooksArray.findIndex((h) => h === hook);
  if (index !== -1) {
   hooksArray.splice(index, 1);
  }
  if (hooksArray.length === 0) {
   this.hooks.delete(key);
  }
 }

 /**
  * @method apply
  * @description Apply all functions or class instances registered under a specific key, passing the result of the previous function to the next.
  * @param {string} key - The key whose associated hooks should be applied.
  * @param {...any[]} args - The arguments to pass to each function when applying.
  * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
  * @description This method executes all functions or class instances registered under the specified key, passing the provided arguments to each function.
  * The result of each function call is passed to the next function in the chain. If there are no hooks associated with the key,
  * the method returns undefined.
  */
 public async apply(key: string, ...args: any[]): Promise<any> {
  this.logger.info(`Applying hooks for key: ${key}`);
  if (!this.hooks.has(key)) return;
  const hooksArray = this.hooks.get(key)!;
  let result: any;
  for (const hook of hooksArray) {
   result = await hook.invoke(result, ...args);
  }
  return result;
 }

 /**
  * @method call
  * @description Execute an action by applying all hooks registered under the specified key.
  * @param {string} key - The key whose associated hooks should be executed.
  * @param {...any[]} args - The arguments to pass to each hook when executing.
  * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
  * @description This method acts as a wrapper around the apply method, providing a more intuitive method name for executing actions.
  * It simply calls the apply method with the same arguments and returns its result.
  */
 public async call(key: string, ...args: any[]): Promise<any> {
  this.logger.info(`Calling hooks for key: ${key}`);
  return await this.apply(key, ...args);
 }
}
