import { ComponentTheme } from "./utils"

const Divider: ComponentTheme = {
  defaultProps: {
    variant: "horizontal",
  },
  variants: {
    vertical: {
      borderLeft: "1px",
      height: "100%",
    },
    horizontal: {
      borderBottom: "1px",
      width: "100%",
    },
  },
}

export default Divider
