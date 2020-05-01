import { useColorMode } from "@chakra-ui/color-mode"
import { css, StyleObjectOrFn } from "@chakra-ui/css"
import { ThemeContext } from "@emotion/core"
import * as React from "react"
import { getComponentDefaults, getComponentStyles } from "./component"
import { Dict } from "@chakra-ui/utils"

export function useChakra<T extends Dict = Dict>() {
  const [colorMode, setColorMode] = useColorMode()
  const theme = React.useContext(ThemeContext) as T
  return { colorMode, setColorMode, theme }
}

interface ComponentStyleHookProps {
  size?: string
  variant?: string
  colorScheme?: string
  themeKey: string
}

export function useComponentStyle(props: ComponentStyleHookProps) {
  const { size, variant, colorScheme, themeKey } = props
  const theme = React.useContext(ThemeContext)
  const [colorMode] = useColorMode()
  return getComponentStyles(
    { variant, size, theme, colorScheme, colorMode },
    { themeKey },
  )
}

export function useThemeDefaultProps(themeKey: string) {
  const theme = React.useContext(ThemeContext)
  return getComponentDefaults(theme, themeKey)
}

export function useCss(styles: StyleObjectOrFn) {
  const theme = React.useContext(ThemeContext)
  return css(styles)(theme)
}
