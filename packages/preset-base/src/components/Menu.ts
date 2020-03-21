import { Props, getModeValue, getModeColor } from "./utils"

function getMenuListStyle(props: Props) {
  const longShadow = `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
  return {
    bg: getModeColor(props, `#fff`, `gray.700`),
    shadow: getModeValue(props, `sm`, longShadow),
    color: "inherit",
    outline: 0,
  }
}

function getMenuItemStyle(props: Props) {
  return {
    width: "100%",
    flex: "0 0 auto",
    userSelect: "none",
    textAlign: "left",
    transition: "background-color 220ms, color 220ms",
    outline: 0,
    _active: {
      bg: getModeValue(props, `gray.200`, `whiteAlpha.200`),
    },
    _focus: {
      bg: getModeValue(props, `gray.100`, `whiteAlpha.100`),
    },
    _expanded: {
      bg: getModeValue(props, `gray.100`, `whiteAlpha.100`),
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  }
}

function getbaseStyle(props: Props) {
  return {
    MenuList: getMenuListStyle(props),
    MenuItem: getMenuItemStyle(props),
  }
}

export default {
  baseStyle: getbaseStyle,
}
