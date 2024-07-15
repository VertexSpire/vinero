// src/facade/hook.ts

import { HooksFactory } from '../core/hooks/hooks-factory';

/**
 * @function Bind
 * @description Bind a function or class instance under a specific key with a priority using the HooksFactory.
 * @param {string} key - The key under which the hook should be registered.
 * @param {Function} fn - The function or class instance to register.
 * @param {number} [priority] - The priority of the hook. Lower numbers indicate higher priority.
 * @description This function is a facade for the HooksFactory's bind method, providing a simpler interface for registering hooks.
 */
export function Bind(key: string, fn: Function, priority?: number): void {
 HooksFactory.bind(key, fn, priority);
}

/**
 * @function Remove
 * @description Remove a function or class instance from a specific key using the HooksFactory.
 * @param {string} key - The key from which the hook should be removed.
 * @param {Function} fn - The function or class instance to remove.
 * @description This function is a facade for the HooksFactory's remove method, providing a simpler interface for removing hooks.
 */
export function Remove(key: string, fn: Function): void {
 HooksFactory.remove(key, fn);
}

/**
 * @function Apply
 * @description Apply all hooks registered under the specified key.
 * @param {string} key - The key whose associated hooks should be applied.
 * @param {...any[]} args - The arguments to pass to each hook when applying.
 * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
 * @description This function is a facade for the HooksFactory's apply method, providing a simpler interface for applying hooks.
 */
export async function Apply(key: string, ...args: any[]): Promise<any> {
 return await HooksFactory.apply(key, ...args);
}

/**
 * @function Call
 * @description Execute an action by applying all hooks registered under the specified key.
 * @param {string} key - The key whose associated hooks should be executed.
 * @param {...any[]} args - The arguments to pass to each hook when executing.
 * @returns {Promise<any>} - A promise that resolves with the result of the final function call.
 * @description This function is a facade for the HooksFactory's call method, providing a simpler interface for executing actions.
 */
export async function Call(key: string, ...args: any[]): Promise<any> {
 return await HooksFactory.call(key, ...args);
}
