import theme from "@chakra-ui/theme"
import { mode } from "@chakra-ui/theme-tools"

const font = `Inter, -apple-system, sans-serif`

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: font,
    body: font,
  },
  styles: {
    global: (props) => ({
      ...theme.styles.global(props),
      color: mode("gray.700", "whiteAlpha.900")(props),
      ".deleted": {
        color: "#ff8383 !important",
        fontStyle: "normal !important",
      },
      ".inserted": {
        color: "#b5f4a5 !important",
        fontStyle: "normal !important",
      },
    }),
  },
  mdx: {
    h1: {
      mt: "3rem",
      mb: ".25rem",
      lineHeight: 1,
      fontWeight: "bold",
      fontSize: "1.875rem",
      letterSpacing: "-.025em",
      "& +p": {
        mt: "2rem",
      },
    },
    h2: {
      mt: "4rem",
      mb: "1rem",
      lineHeight: 1,
      fontWeight: "semibold",
      fontSize: "1.5rem",
      letterSpacing: "-.025em",
      "& + h3": {
        mt: "1.5rem",
      },
    },
    h3: {
      mt: "3rem",
      mb: "1rem",
      lineHeight: 1.25,
      fontWeight: "semibold",
      fontSize: "1.25rem",
      letterSpacing: "-.025em",
    },
    h4: {
      mt: "3rem",
      lineHeight: 1.375,
      fontWeight: "semibold",
      fontSize: "1.125rem",
    },
    a: {
      color: "teal.500",
      fontWeight: "semibold",
      transition: "color 0.15s",
      transitionTimingFunction: "ease-out",
      _hover: {
        color: "teal.600",
      },
    },
    p: {
      mt: "1.5rem",
      "blockquote &": {
        mt: 0,
      },
    },
    hr: {
      my: "4rem",
    },
    blockquote: {
      bg: "orange.100",
      borderWidth: "1px",
      borderColor: "orange.200",
      rounded: "lg",
      px: "1.25rem",
      py: "1rem",
      my: "1.5rem",
    },
    ul: {
      mt: "1.5rem",
      listStyleType: "none",
      li: {
        position: "relative",
        pl: "1.25rem",
        "&:before": {
          position: "absolute",
          left: 0,
          color: "#cbd5e0",
          display: "inline-block",
          mr: ".75rem",
          content: `"\\2022"`,
        },
      },
      "& > * + *": {
        mt: "1rem",
      },
    },
  },
}

export default customTheme
