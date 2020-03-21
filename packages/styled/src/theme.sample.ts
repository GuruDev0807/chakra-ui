import defaultTheme from "@chakra-ui/preset-base"

const theme = {
  ...defaultTheme,
  components: {
    Badge: {
      baseStyle: {
        padding: "5px",
        textTransform: "uppercase",
      },
    },
    Code: {
      baseStyle: {
        apply: "components.Badge.baseStyle",
      },
    },
    Button: {
      variants: {
        solid: {
          bg: "green.400",
          color: "white",
          _active: {
            bg: "green.500",
          },
        },
      },
      sizes: {
        lg: {
          padding: 20,
          fontSize: 17,
        },
        sm: {
          padding: 10,
          fontSize: "sm",
        },
      },
    },
  },
}

export default theme
