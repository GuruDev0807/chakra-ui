import { AnyFunction, isFunction } from "@chakra-ui/utils";
import * as React from "react";

/**
 * Hook to initialize and return a constant value. Unlike `React.useMemo`, this is guaranteed to
 * always return the same value (and if the initializer is a function, only call it once).
 * This is similar to setting a private member in a class constructor.
 *
 * If the value should ever change based on dependencies, use `React.useMemo` instead.
 *
 * If the value itself is a function, consider using `useConstCallback` instead.
 *
 * @param initialValue - Initial value, or function to get the initial value. Similar to `useState`,
 * only the value/function passed in the first time this is called is respected.
 * @returns The value. The identity of this value will always be the same.
 */
export function useConst<T>(initialValue: T | (() => T)): T {
  const ref = React.useRef<T>();

  if (!ref.current) {
    ref.current = isFunction(initialValue) ? initialValue() : initialValue;
  }

  return ref.current;
}

/**
 * Hook to ensure a callback function always has the same identity.
 * Unlike `React.useCallback`, this is guaranteed to always return the same value.
 *
 * If the callback should ever change based on dependencies, use `React.useCallback` instead.
 *
 * @param callback - The callback. Only the first value passed is respected.
 * @returns The callback. The identity of this callback will always be the same.
 */
export function useConstCallback<T extends AnyFunction>(callback: T): T {
  const ref = React.useRef<T>();

  if (!ref.current) {
    ref.current = callback;
  }

  return ref.current;
}
