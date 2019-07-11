import React, { forwardRef, useState } from "react";
import styled from "@emotion/styled";
import Input from "./Input";
import { Flex, Box } from "./Layout";
import Icon from "./Icon";
import { themeGet } from "@styled-system/theme-get";

let disabledSelector = "&[aria-disabled=true]",
  activeSelector = "&:not([aria-disabled=true]):active",
  firstChildSelector = "&:first-of-type",
  lastChildSelector = "&:last-of-type";

const getThemedProps = props => ({
  light: {
    [activeSelector]: {
      backgroundColor: themeGet(`colors.gray.200`)(props)
    },
    [lastChildSelector]: {
      borderBottomRightRadius: 3,
      marginTop: -1,
      borderTopWidth: 1
    }
  },
  dark: {
    color: themeGet(`colors.alpha.800`)(props),
    borderColor: themeGet(`colors.alpha.300`)(props),
    [lastChildSelector]: {
      borderBottomRightRadius: 3,
      marginTop: -1,
      borderTopWidth: 1
    },
    [activeSelector]: {
      backgroundColor: themeGet(`colors.alpha.300`)(props)
    }
  }
});

const Segment = styled(Box)(props => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "1 1 0",
  backfaceVisibility: "hidden",
  cursor: "pointer",
  transition: "all 0.3s",
  borderLeftWidth: 1,
  ...getThemedProps(props)[props.mode],
  [firstChildSelector]: {
    borderTopRightRadius: 1
  },
  [disabledSelector]: {
    opacity: 0.5,
    cursor: "not-allowed"
  }
}));

const NumberInput = forwardRef(
  (
    {
      defaultValue,
      size,
      currency,
      onChange,
      min,
      max,
      step,
      value,
      isDisabled,
      mode = "light",
      ...rest
    },
    ref
  ) => {
    const [val, setVal] = useState(defaultValue || 0);
    const isControlled = Boolean(value);
    const iconSize = size === "sm" ? "11px" : "15px";

    const handleIncrement = () => {
      const func = () => {
        onChange && onChange(Number(value) + 1);
        !isControlled && setVal(val + 1);
      };

      if (max) {
        isControlled ? value < max && func() : val < max && func();
      } else {
        func();
      }
    };

    const handleDecrement = () => {
      const func = () => {
        onChange && onChange(Number(value) - 1);
        !isControlled && setVal(val - 1);
      };

      if (min) {
        isControlled ? value > min && func() : val > min && func();
      } else {
        func();
      }
    };

    const handleChange = event => {
      let value = Number(event.currentTarget.value);
      setVal(value);
      onChange && onChange(value);
    };

    return (
      <Flex alignItems="stretch" position="relative">
        <Input
          size={size}
          type="number"
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={isControlled ? value : val}
          ref={ref}
          onChange={handleChange}
          value={isControlled ? value : val}
          min={min}
          max={max}
          mode={mode}
          isDisabled={isDisabled}
          {...rest}
        />
        <Flex
          flexDirection="column"
          aria-hidden="true"
          width="24px"
          m="1px"
          position="absolute"
          right="0px"
          height="calc(100% - 2px)"
        >
          <Segment
            role="button"
            onClick={isDisabled ? undefined : handleIncrement}
            tabindex="-1"
            mode={mode}
            aria-disabled={isDisabled}
          >
            <Icon name="chevronUp" size={iconSize} color="currentColor" />
          </Segment>
          <Segment
            onClick={isDisabled ? undefined : handleDecrement}
            role="button"
            tabindex="-1"
            mode={mode}
            aria-disabled={isDisabled}
          >
            <Icon name="chevronDown" size={iconSize} color="currentColor" />
          </Segment>
        </Flex>
      </Flex>
    );
  }
);

export default NumberInput;
