import * as React from "react";

function useRapidKeydown() {
  /**
   * When focus is on the select control or the select menu is open,
   * Typing some characters, either rapidly or at intervals, should highlight
   * the option that matches the character(s).
   *
   * So we need to keep some refs
   */
  const [keys, setKeys] = React.useState<string[]>([]);
  // We'll clear the keys after specific timeout
  const keysTimeoutRef = React.useRef<any>();

  const handleKeyDown = (
    event: KeyboardEvent,
    action: (str: string) => void,
  ) => {
    const keyCode = event.keyCode || event.which;
    const isBackspace = keyCode === 8;
    const { key } = event;

    if (isBackspace) {
      let _keys = [...keys];
      _keys.pop();
      setKeys(_keys);
    } else {
      const isLetter = keyCode >= 65 && keyCode <= 90;
      const isNumber = keyCode >= 48 && keyCode <= 57;
      const isValid = isLetter || isNumber;

      if (isValid) {
        let _keys = keys.concat(key);
        action(_keys.join(""));
        setKeys(_keys);
        clearKeysAfterDelay();
      }
    }
  };

  const clearKeysAfterDelay = () => {
    if (keysTimeoutRef.current) {
      clearTimeout(keysTimeoutRef.current);
      keysTimeoutRef.current = null;
    }
    keysTimeoutRef.current = setTimeout(() => {
      setKeys([]);
      keysTimeoutRef.current = null;
    }, 300);
  };

  return [keys.join(""), handleKeyDown] as const;
}

export default useRapidKeydown;
