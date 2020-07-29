import { multiStyleConfig } from "@chakra-ui/theme-tools"
import checkbox, { checkboxStyles } from "./checkbox"

const parts = {
  control: "the radio input container",
  label: "the radio label",
}

const { baseStyleLabel } = checkboxStyles

// @ts-ignore
const baseStyleControl = function (props) {
  const control = checkboxStyles.baseStyleControl(props) ?? {}

  return {
    ...control,
    borderRadius: "full",

    _checked: {
      ...control?.["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        position: "relative",
        width: "50%",
        height: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }
}

// @ts-ignore
const baseStyle = function (props) {
  return {
    label: baseStyleLabel,
    control: baseStyleControl(props),
  }
}

const sizes = {
  md: {
    control: { w: 4, h: 4 },
    label: { fontSize: "md" },
  },
  lg: {
    control: { w: 5, h: 5 },
    label: { fontSize: "lg" },
  },
  sm: {
    control: { width: 3, height: 3 },
    label: { fontSize: "sm" },
  },
}

const defaultProps = {
  size: "md",
  colorScheme: "blue",
}

const radio = multiStyleConfig({
  parts,
  baseStyle,
  sizes,
  // @ts-ignore
  defaultProps,
})

export const radioStyles = {
  parts,
  baseStyleLabel,
  baseStyleControl,
  sizes,
  defaultProps,
}

export default radio
