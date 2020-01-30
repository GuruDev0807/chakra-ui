import * as React from "react";
import { useIsomorphicEffect } from "@chakra-ui/hooks";

export type Descendant<T, P> = P & {
  element: (T extends HTMLElement ? T : HTMLElement) | null;
  index?: number;
  disabled?: boolean;
  focusable?: boolean;
};

export interface DescendantContext<T = Element, P = {}> {
  descendants: Descendant<T, P>[];
  register: (descendant: Descendant<T, P>) => void;
  unregister: (
    element: (T extends HTMLElement ? T : HTMLElement) | null,
  ) => void;
}

export function createDescendantsContext<T, P>() {
  const DescandantsContext = React.createContext<DescendantContext<T, P>>({
    descendants: [],
    register: () => {},
    unregister: () => {},
  });
  const useDescendantsContext = () => React.useContext(DescandantsContext);
  return [DescandantsContext.Provider, useDescendantsContext] as const;
}

export type DescendantProps<T, P> = {
  context: DescendantContext<T, P>;
} & Descendant<T, P>;

export function useDescendant<T, P>(props: DescendantProps<T, P>) {
  const {
    context,
    element,
    index: indexProp,
    disabled,
    focusable,
    ...rest
  } = props;

  const [, forceUpdate] = React.useState();

  const { register, unregister, descendants } = context;

  /**
   * Ideally, we'll run this effect to use `useLayoutEffect` but to
   * support SSR, we'll use `useEffect` on the server. Hence, the use of
   * `useIsomorphicEffect`
   */
  useIsomorphicEffect(() => {
    if (!element) forceUpdate({});

    // Don't register this descendant if it's disabled and not focusable
    if (disabled && !focusable) return;

    // else, register the descendant
    //@ts-ignore
    register({ element, ...rest });

    // when it unmounts, unregister the descendant
    return () => {
      unregister(element);
    };
    //eslint-disable-next-line
  }, [element, ...Object.values(rest)]);

  const index =
    indexProp ??
    descendants.findIndex(descendant => descendant.element === element);

  return { index, descendants };
}

export function useDescendants<T, P>() {
  const [descendants, setDescendants] = React.useState<Descendant<T, P>[]>([]);

  const register = React.useCallback(
    ({ element, ...rest }: Descendant<T, P>) => {
      if (!element) return;

      //@ts-ignore
      setDescendants(prevDescendants => {
        if (prevDescendants.find(item => item.element === element) == null) {
          const index = prevDescendants.findIndex(item => {
            if (!item.element || !element) return false;

            return Boolean(
              item.element.compareDocumentPosition(element) &
                Node.DOCUMENT_POSITION_PRECEDING,
            );
          });

          const newItem = { element, ...rest };

          if (index === -1) {
            return [...prevDescendants, newItem];
          }
          return [
            ...prevDescendants.slice(0, index),
            newItem,
            ...prevDescendants.slice(index),
          ];
        }
        return prevDescendants;
      });
    },
    [],
  );

  const unregister = React.useCallback((element: T) => {
    if (!element) return;
    setDescendants(descendants =>
      descendants.filter(descendant => element !== descendant.element),
    );
  }, []);

  // memoize the context to improve performance
  const context = React.useMemo(() => {
    return { descendants, register, unregister };
  }, [descendants, register, unregister]);

  return context;
}
