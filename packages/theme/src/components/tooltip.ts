import { mode } from "@chakra-ui/theme-tools"

const baseStyle = function (props: Record<string, any>) {
  return {
    px: "8px",
    py: "2px",
    bg: mode("gray.700", "gray.300")(props),
    color: mode("whiteAlpha.900", "gray.900")(props),
    borderRadius: "sm",
    fontWeight: "medium",
    pointerEvents: "none",
    fontSize: "sm",
    boxShadow: "md",
    maxW: "320px",
  }
}

export const Tooltip = {
  baseStyle,
}
