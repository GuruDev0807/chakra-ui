import { canUseDOM } from "exenv";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  calculatePrecision,
  preventNonNumberKey,
  roundToPrecision,
} from "./utils";

function useLongPress(callback = () => {}, speed = 200) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    let timerId;
    if (isPressed) {
      timerId = setTimeout(callback, speed);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isPressed, callback, speed]);

  const start = useCallback(() => {
    callback();
    setIsPressed(true);
  }, [callback]);

  const stop = useCallback(() => {
    setIsPressed(false);
  }, []);

  const clickEvent =
    canUseDOM && !!document.documentElement.ontouchstart
      ? "onTouchStart"
      : "onMouseDown";

  return {
    [clickEvent]: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
  };
}

function useNumberInput({
  value: valueProp,
  onChange,
  defaultValue,
  focusInputOnChange = true,
  clampValueOnBlur = true,
  keepWithinRange = true,
  min = -Infinity,
  max = Infinity,
  step: stepProp = 1,
  precision: precisionProp,
  getAriaValueText,
  isReadOnly,
  isInvalid,
  isDisabled,
}) {
  const { current: isControlled } = useRef(valueProp !== undefined);

  const defaultPrecision = Math.max(calculatePrecision(stepProp), 0);
  const precision = precisionProp || defaultPrecision;

  const [value, setValue] = useState(() => {
    if (defaultValue != null) {
      let nextValue = defaultValue;
      if (keepWithinRange) {
        nextValue = Math.max(Math.min(nextValue, max), min);
      }
      nextValue = roundToPrecision(nextValue, precision);
      return nextValue;
    }
    return 0;
  });

  const [isFocused, setIsFocused] = useState(false);

  const _value = isControlled ? valueProp : value;
  const isInteractive = !(isReadOnly || isDisabled);
  const inputRef = useRef();

  const updateValue = value => {
    !isControlled && setValue(value);
    onChange && onChange(value);
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        inputRef.current.focus();
      });
    }
  };

  const incrementStepperProps = useLongPress(handleIncrement);
  const decrementStepperProps = useLongPress(handleDecrement);

  const handleChange = event => {
    updateValue(event.target.value);
  };

  const handleKeyDown = event => {
    preventNonNumberKey(event);
    if (!isInteractive) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleIncrement(ratio * stepProp);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleDecrement(ratio * stepProp);
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (min != null) {
        updateValue(max);
      }
    }

    if (event.key === "End") {
      event.preventDefault();
      if (max != null) {
        updateValue(min);
      }
    }
  };

  const getIncrementFactor = event => {
    let ratio = 1;
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1;
    }
    if (event.shiftKey) {
      ratio = 10;
    }
    return ratio;
  };

  const validateAndClamp = () => {
    const maxExists = max != null;
    const minExists = min != null;

    if (maxExists && _value > max) {
      updateValue(max);
    }

    if (minExists && _value < min) {
      updateValue(min);
    }
  };

  const isOutOfRange = _value > max || _value < min;
  const ariaValueText = getAriaValueText ? getAriaValueText(_value) : null;

  return {
    value: _value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementStepper: incrementStepperProps,
    decrementStepper: decrementStepperProps,
    incrementButton: {
      onClick: () => handleIncrement(),
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: _value === max,
        "aria-disabled": _value === max,
      }),
    },
    decrementButton: {
      onClick: () => handleDecrement(),
      "aria-label": "subtract",
      ...(keepWithinRange && {
        disabled: _value === min,
        "aria-disabled": _value === min,
      }),
    },
    input: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ref: inputRef,
      value: _value != null ? _value : undefined,
      role: "spinbutton",
      type: "text",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": _value != null ? _value : undefined,
      "aria-invalid": isInvalid || isOutOfRange,
      ...(getAriaValueText && { "aria-valuetext": ariaValueText }),
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: "off",
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: () => {
        setIsFocused(false);
        if (clampValueOnBlur) {
          validateAndClamp();
        }
      },
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: getAriaValueText ? ariaValueText : _value,
      style: {
        position: "absolute",
        clip: "rect(0px, 0px, 0px, 0px)",
        height: 1,
        width: 1,
        margin: -1,
        whiteSpace: "nowrap",
        border: 0,
        overflow: "hidden",
        padding: 0,
      },
    },
  };
}

export default useNumberInput;
