// src/common/interfaces/hook.interface.ts

/**
 * @interface Hook
 * @description Interface representing a hook, which includes a priority and an invoke method.
 */
export interface Hook {
 /**
  * @property {number} priority - The priority of the hook. Lower numbers indicate higher priority.
  * @description This property holds the priority of the hook, which determines the order in which hooks are executed.
  */
 priority: number;

 /**
  * @method invoke
  * @description Method to invoke the hook function with the provided arguments.
  * @param {...any[]} args - Arguments to pass to the hook function.
  * @returns {Promise<any>} - The result of the hook function.
  */
 invoke(...args: any[]): Promise<any>;
}

/**
 * @interface HookFactory
 * @description Interface for creating Hook instances.
 */
export interface HookFactory {
 /**
  * @method createHook
  * @description Create a new Hook instance.
  * @returns {Hook} - An instance of Hook.
  */
 createHook(): Hook;
}
