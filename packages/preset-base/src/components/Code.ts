import Badge from "./Badge"
import { ComponentTheme } from "./utils"

const Code: ComponentTheme = {
  defaultProps: Badge.defaultProps,
  baseStyle: {
    display: "inline-block",
    fontFamily: "mono",
    fontSize: "sm",
    paddingX: "0.2em",
    borderRadius: "sm",
  },
  variants: Badge.variants,
}

export default Code
