// src/core/hooks/hooks.ts

import { Hook } from '../../common/interfaces/hook.interface';

/**
 * @class Hooks
 * @description A class to manage an array of functions or class instances stored in a hashmap. This class provides methods to bind,
 * remove, and apply hooks, as well as to execute actions associated with these hooks. Each function can be registered with a priority.
 */
export class Hooks {
 /**
  * @property {Map<string, Hook[]>} hooks - A hashmap to store arrays of hooks associated with a specific key.
  * @description This property holds a Map where each key corresponds to an array of hooks (function and priority) that can be executed.
  */
 private hooks: Map<string, Hook[]> = new Map();

 /**
  * @method bind
  * @description Register a function or class instance under a specific key with a priority.
  * @param {string} key - The key under which the hook should be registered.
  * @param {Hook} hook - The hook instance to register.
  * @description This method registers a function or class instance under the specified key with a given priority.
  * If the key already exists, the function is added to the array in the correct position based on its priority.
  */
 public bind(key: string, hook: Hook): void {
  /**
   * Check if the key already exists in the hooks map.
   * If the key does not exist, create a new entry with an empty array.
   */
  if (!this.hooks.has(key)) {
   this.hooks.set(key, []);
  }

  /**
   * Add the hook to the array associated with the key.
   * Sort the hooks array based on priority in ascending order.
   */
  this.hooks.get(key)!.push(hook);
  this.hooks.get(key)!.sort((a, b) => a.priority - b.priority);
 }

 /**
  * @method remove
  * @description Remove a function or class instance from a specific key.
  * @param {string} key - The key from which the hook should be removed.
  * @param {Hook} hook - The hook instance to remove.
  * @description This method removes a function or class instance from the array associated with the specified key.
  */
 public remove(key: string, hook: Hook): void {
  /**
   * Check if the key exists in the hooks map.
   * If the key does not exist, return early.
   */
  if (!this.hooks.has(key)) return;

  /**
   * Get the array of hooks associated with the key.
   * Find the index of the hook in the hooks array.
   * If the hook is found, remove it from the array.
   */
  const hooksArray = this.hooks.get(key)!;
  const index = hooksArray.findIndex((h) => h === hook);
  if (index !== -1) {
   hooksArray.splice(index, 1);
  }

  /**
   * If the hooks array is empty after removal, delete the key from the hooks map.
   */
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
  * The result of each function call is passed to the next function in the chain.
  */
 public async apply(key: string, ...args: any[]): Promise<any> {
  /**
   * Check if the key exists in the hooks map.
   * If the key does not exist, return early.
   */
  if (!this.hooks.has(key)) return;

  /**
   * Get the array of hooks associated with the key.
   * Initialize a variable to store the result of each function call.
   */
  const hooksArray = this.hooks.get(key)!;
  let result: any;

  /**
   * Iterate over the hooks array and call each function's invoke method.
   * Pass the result of the previous function call and the provided arguments to the current function.
   * Store the result of the current function call to be passed to the next function.
   */
  for (const hook of hooksArray) {
   result = await hook.invoke(result, ...args);
  }

  /**
   * Return the result of the final function call.
   */
  return result;
 }

 /**
  * @method call
  * @description Execute an action by applying all hooks registered under the specified key.
  * @param {string} key - The key whose associated hooks should be executed.
  * @param {...any[]} args - The arguments to pass to each hook when executing.
  * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
  * @description This method acts as a wrapper around the apply method, providing a more intuitive method name for executing actions.
  */
 public async call(key: string, ...args: any[]): Promise<any> {
  /**
   * Call the apply method with the provided key and arguments, and return the result.
   */
  return await this.apply(key, ...args);
 }
}
