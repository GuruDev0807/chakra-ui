import { StyleFunctionProps, getModeColor as get } from "./utils"
import { getColor } from "@chakra-ui/color"

type InputOptions = StyleFunctionProps & {
  focusBorderColor: string
  errorBorderColor: string
  isFullWidth?: boolean
}

function getOutlinedStyle(props: InputOptions) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props
  return {
    border: "1px solid",
    borderColor: get(props, "inherit", "whiteAlpha.50"),
    bg: get(props, "white", "whiteAlpha.100"),
    _hover: {
      borderColor: get(props, "gray.300", "whiteAlpha.200"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
      boxShadow: `0 0 0 1px ${getColor(t, fc)}`,
    },
    _invalid: {
      borderColor: getColor(t, ec),
      boxShadow: `0 0 0 1px ${getColor(t, ec)}`,
    },
  }
}

function getFilledStyle(props: InputOptions) {
  const { theme: t, focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    border: "2px solid",
    borderColor: "transparent",
    bg: get(props, "gray.100", "whiteAlpha.50"),
    _hover: {
      bg: get(props, "gray.200", "whiteAlpha.100"),
    },
    _disabled: {
      opacity: "0.4",
      cursor: "not-allowed",
    },
    _focus: {
      zIndex: 1,
      bg: "transparent",
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

function getFlushedStyle(props: InputOptions) {
  const { focusBorderColor: fc, errorBorderColor: ec, theme: t } = props

  return {
    borderBottom: "2px solid",
    borderColor: "inherit",
    borderRadius: 0,
    paddingX: 0,
    bg: "transparent",
    _focus: {
      zIndex: 1,
      borderColor: getColor(t, fc),
    },
    _invalid: {
      borderColor: getColor(t, ec),
    },
  }
}

const unstyled = {
  bg: "transparent",
  paddingX: 0,
  height: "auto",
}

const variantSize = {
  __default: "md",
  lg: {
    fontSize: "lg",
    paddingX: 4,
    height: 12,
    borderRadius: "md",
  },
  md: {
    fontSize: "md",
    paddingX: 4,
    height: 10,
    borderRadius: "md",
  },
  sm: {
    fontSize: "sm",
    paddingX: 3,
    height: 8,
    borderRadius: "sm",
  },
}

export default {
  baseStyle: (props: InputOptions) => ({
    width: props.isFullWidth ? "100%" : "auto",
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "all 0.2s",
    outline: "none",
  }),
  variantSize,
  variant: {
    __default: "outline",
    outline: getOutlinedStyle,
    filled: getFilledStyle,
    flushed: getFlushedStyle,
    unstyled,
  },
}
