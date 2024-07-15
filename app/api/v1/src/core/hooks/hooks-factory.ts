// src/core/hooks/hooks-factory.ts

import { Hooks } from './hooks';
import { ConcreteHookFactory } from '../concrete-hook-factory';
import { Hook } from '../../common/interfaces/hook.interface';

/**
 * @class HooksFactory
 * @description Factory class for creating instances of Hooks and managing hook registration and invocation.
 */
export class HooksFactory {
 /**
  * @property {Hooks} hooksInstance - The Hooks instance managed by this factory.
  * @description This property holds the Hooks instance managed by this factory.
  */
 private static hooksInstance: Hooks = new Hooks();

 /**
  * @method bind
  * @description Bind a function or class instance under a specific key with a priority using the Hooks instance.
  * @param {string} key - The key under which the hook should be registered.
  * @param {Function} fn - The function or class instance to register.
  * @param {number} [priority] - The priority of the hook. Lower numbers indicate higher priority.
  * @description This method registers a function or class instance under the specified key with a given priority.
  */
 public static bind(key: string, fn: Function, priority?: number): void {
  /**
   * Create an instance of Hook using the ConcreteHookFactory.
   * Bind the hook instance to the specified key using the Hooks instance.
   */
  const hook: Hook = new ConcreteHookFactory().createHook(fn, priority);
  HooksFactory.hooksInstance.bind(key, hook);
 }

 /**
  * @method remove
  * @description Remove a function or class instance from a specific key using the Hooks instance.
  * @param {string} key - The key from which the hook should be removed.
  * @param {Function} fn - The function or class instance to remove.
  * @description This method removes a function or class instance from the array associated with the specified key.
  */
 public static remove(key: string, fn: Function): void {
  /**
   * Create an instance of Hook using the ConcreteHookFactory.
   * Remove the hook instance from the specified key using the Hooks instance.
   */
  const hook: Hook = new ConcreteHookFactory().createHook(fn);
  HooksFactory.hooksInstance.remove(key, hook);
 }

 /**
  * @method apply
  * @description Apply all hooks registered under the specified key.
  * @param {string} key - The key whose associated hooks should be applied.
  * @param {...any[]} args - The arguments to pass to each hook when applying.
  * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
  * @description This method executes all hooks registered under the specified key, passing the provided arguments to each hook.
  * The result of each hook call is passed to the next hook in the chain.
  */
 public static async apply(key: string, ...args: any[]): Promise<any> {
  /**
   * Apply all hooks associated with the provided key using the Hooks instance, and return the result.
   */
  return await HooksFactory.hooksInstance.apply(key, ...args);
 }

 /**
  * @method call
  * @description Execute an action by applying all hooks registered under the specified key.
  * @param {string} key - The key whose associated hooks should be executed.
  * @param {...any[]} args - The arguments to pass to each hook when executing.
  * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
  * @description This method acts as a wrapper around the apply method, providing a more intuitive method name for executing actions.
  */
 public static async call(key: string, ...args: any[]): Promise<any> {
  /**
   * Call the apply method with the provided key and arguments, and return the result.
   */
  return await HooksFactory.apply(key, ...args);
 }
}
