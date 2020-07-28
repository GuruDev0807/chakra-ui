import {
  isDark,
  mode,
  randomColor,
  multiStyleConfig,
} from "@chakra-ui/theme-tools"
import themeSizes from "../foundations/sizes"

function getSize(size: string) {
  const themeSize = themeSizes[size]
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: `calc(${themeSize ?? size} / 2.5)`,
      lineHeight: size !== "100%" ? themeSize ?? size : undefined,
    },
  }
}

const parts = {
  container: "the avatar wrapper",
  excessLabel: "for avatar group, the excess avatar label",
  badge: "the top or bottom left badge",
  label: "the avatar's name initials text",
}

const baseStyleBadge = function (props: Record<string, any>) {
  return {
    transform: "translate(25%, 25%)",
    borderRadius: "full",
    border: "0.2em solid",
    borderColor: mode("white", "gray.800")(props),
  }
}

const baseStyleExcessLabel = function (props: Record<string, any>) {
  return {
    bg: mode("gray.200", "whiteAlpha.400")(props),
  }
}

const baseStyleContainer = function (props: Record<string, any>) {
  const { name, theme } = props
  const bg = name ? randomColor({ string: name }) : "gray.400"
  const color = name ? (isDark(bg)(theme) ? "white" : "gray.800") : "white"
  const borderColor = mode("white", "gray.800")(props)

  return {
    bg,
    color,
    borderColor,
    verticalAlign: "top",
  }
}

const baseStyle = (props: Record<string, any>) => ({
  badge: baseStyleBadge(props),
  excessLabel: baseStyleExcessLabel(props),
  container: baseStyleContainer(props),
})

const sizes = {
  "2xs": getSize("4"),
  xs: getSize("6"),
  sm: getSize("8"),
  md: getSize("12"),
  lg: getSize("16"),
  xl: getSize("24"),
  "2xl": getSize("32"),
  full: getSize("100%"),
}

const defaultProps = {
  size: "md",
}

const avatar = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  // @ts-ignore
  defaultProps,
})

export const avatarStyles = {
  parts,
  baseStyleBadge,
  baseStyleExcessLabel,
  baseStyleContainer,
  sizes,
  defaultProps,
}

export default avatar
