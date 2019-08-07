/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box } from "../Layout";
import { Children, cloneElement, useState, useRef } from "react";
import { genId } from "../utils";

const RadioButtonGroup = ({
  id,
  name,
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  spacing = "12px",
  inline,
  ...rest
}) => {
  const isControlled = controlledValue != null;
  const [value, setValue] = useState(defaultValue || null);
  const _value = isControlled ? controlledValue : value;

  const allNodes = useRef([]);

  const focusableValues = Children.map(children, child =>
    child.props.isDisabled === true ? null : child.props.value
  ).filter(val => val != null);

  const allValues = Children.map(children, child => child.props.value);

  const updateIndex = index => {
    const childValue = focusableValues[index];
    const _index = allValues.indexOf(childValue);
    allNodes.current[_index].focus();

    !isControlled && setValue(childValue);
    onChange && onChange(childValue);
  };

  const handleKeyDown = event => {
    const count = focusableValues.length;
    let enabledCheckedIndex = focusableValues.indexOf(_value);

    if (enabledCheckedIndex === -1) {
      enabledCheckedIndex = 0;
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        const nextIndex = (enabledCheckedIndex + 1) % count;
        updateIndex(nextIndex);
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        const nextIndex = (enabledCheckedIndex - 1 + count) % count;
        updateIndex(nextIndex);
        break;
      }
      default:
        break;
    }
  };

  const clones = Children.map(children, (child, index) => {
    const isLastChild = children.length === index + 1;
    const isFirstChild = index === 0;

    const spacingProps = inline
      ? { marginRight: spacing }
      : { marginBottom: spacing };

    const isChecked = child.props.value === _value;

    const handleClick = () => {
      setValue(child.props.value);
    };

    const getTabIndex = () => {
      // If a RadioGroup has no radio selected the first enabled radio should be focusable
      if (_value == null) {
        return isFirstChild ? 0 : -1;
      } else {
        return isChecked ? 0 : -1;
      }
    };

    return cloneElement(child, {
      ref: node => (allNodes.current[index] = node),
      name: name || genId("radio"),
      onClick: handleClick,
      tabIndex: getTabIndex(),
      isChecked,
      ...(inline && !isLastChild && { css: spacingProps })
    });
  });

  return (
    <Box
      role="radiogroup"
      onKeyDown={handleKeyDown}
      aria-labelledby={id}
      {...rest}
    >
      {clones}
    </Box>
  );
};

export default RadioButtonGroup;
