import { ComponentTheme, mode, Props } from "@chakra-ui/theme-tools"

function checked(props: Props) {
  const { colorScheme: c } = props
  return {
    bg: mode(`${c}.500`, `${c}.200`)(props),
    borderColor: mode(`${c}.500`, `${c}.200`)(props),
    color: mode("white", "gray.900")(props),
    _hover: {
      bg: mode(`${c}.600`, `${c}.300`)(props),
      borderColor: mode(`${c}.600`, `${c}.300`)(props),
    },
    _disabled: {
      borderColor: mode("gray.200", "transparent")(props),
      bg: mode("gray.200", "whiteAlpha.300")(props),
      color: mode("gray.500", "whiteAlpha.500")(props),
    },
  }
}

const baseStyle = (props: Props) => {
  const { colorScheme: c } = props

  return {
    Control: {
      width: "100%",
      transition: "box-shadow 250ms",
      border: "2px solid",
      borderRadius: "sm",
      borderColor: "inherit",
      color: "white",
      _checked: checked(props),
      _indeterminate: {
        bg: mode(`${c}.500`, `${c}.200`)(props),
        borderColor: mode(`${c}.500`, `${c}.200`)(props),
        color: mode("white", "gray.900")(props),
      },
      _disabled: {
        bg: mode("gray.100", "whiteAlpha.100")(props),
        borderColor: mode("gray.100", "transparent")(props),
      },
      _focus: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: mode("red.500", "red.300")(props),
      },
    },
    Label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },
    Icon: {
      width: "0.625rem",
      height: "0.625rem",
      color: "currentColor",
      transition: "transform 240ms, opacity 240ms",
    },
  }
}

const sizes = {
  sm: {
    Control: { height: 3, width: 3 },
    Label: { fontSize: "sm" },
  },
  md: {
    Control: { width: 4, height: 4 },
    Label: { fontSize: "md" },
  },
  lg: {
    Control: { width: 5, height: 5 },
    Label: { fontSize: "lg" },
  },
}

const Checkbox: ComponentTheme = {
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
  baseStyle,
  sizes,
}

export const CheckboxSizes = {
  lg: "lg",
  sm: "sm",
  md: "md",
}

export default Checkbox
