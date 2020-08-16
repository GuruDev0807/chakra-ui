import checkbox from "./checkbox"

const parts = {
  control: "the radio input container",
  label: "the radio label",
}

function baseStyleControl(props: Record<string, any>) {
  const { control } = checkbox.baseStyle(props)

  return {
    ...control,
    borderRadius: "full",
    _checked: {
      ...control["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor",
      },
    },
  }
}

const baseStyle = function (props: Record<string, any>) {
  return {
    label: checkbox.baseStyle(props).label,
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

const radio = {
  parts,
  baseStyle,
  sizes,
  defaultProps,
}

export default radio
