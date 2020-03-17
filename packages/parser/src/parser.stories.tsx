/**@jsx jsx */
import { jsx } from "@emotion/core"
import { parser } from "."
import css from "./css"

export default {
  title: "Parser",
}

// const spaceConfig = {
//   padding: {
//     property: "padding",
//     scale: "space",
//   },
//   paddingX: {
//     properties: ["paddingLeft", "paddingRight"],
//     scale: "space",
//   },
//   paddingY: {
//     properties: ["paddingTop", "paddingBottom"],
//     scale: "space",
//   },
//   marginX: {
//     properties: ["marginLeft", "marginRight"],
//     scale: "space",
//   },
// }

// const parser = createParser(spaceConfig as any)

const theme = {
  breakpoints: { mobile: 400, tablet: 700, desktop: 1000 },
  space: [0, 4, 8, 16, 32],
  colors: {
    primary: "rebeccapurple",
    secondary: "tomato",
    green: {
      100: "baba",
      200: "mama",
    },
  },
  fontSizes: {
    sm: "14px",
    md: "18px",
  },
  styles: {
    h1: {
      paddingX: 3,
      fontSize: "sm",
    },
  },
}

const styles = parser({
  theme,
  marginX: [2, 4],
  color: "green.200",
  paddingY: { all: "12px", mobile: 4, desktop: "90px" },
})

console.log(styles)

const theme2 = {
  // breakpoints: { sm: 320, md: 600, lg: 960 },
  colors: {
    primary: "tomato",
    secondary: "cyan",
  },
  fontSizes: [12, 14, 16, 24, 36],
  fonts: {
    monospace: "Menlo, monospace",
  },
  lineHeights: {
    body: 1.5,
  },
  fontWeights: {
    bold: 600,
  },
  sizes: {
    small: 4,
    medium: 8,
    large: 16,
    sidebar: 320,
  },
  buttons: {
    primary: {
      p: 3,
      fontWeight: "bold",
      color: "white",
      bg: "primary",
      borderRadius: 2,
    },
  },
  text: {
    caps: {
      fontSize: [1, 2],
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    title: {
      fontSize: [3, 4],
      letterSpacing: ["-0.01em", "-0.02em"],
    },
  },
  borderWidths: {
    thin: 1,
  },
  borderStyles: {
    thick: "solid",
  },
  radii: {
    small: 5,
  },
}

export const Test = () => {
  const result = css({
    width: ["100%", null, "50%"],
    color: ["red", "green", "blue"],
  })(theme2)

  return <div css={styles}>Testing</div>
}
