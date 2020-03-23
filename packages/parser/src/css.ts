import {
  deepmerge,
  get,
  getWithDefault,
  isArray,
  isObject,
  runIfFn,
} from "@chakra-ui/utils"
import assignArrayValue from "./assign-array-value"
import { parsePseudo } from "./configs/pseudo"
import { CSSObject, StyleObject, Theme } from "./css.types"
import { getMediaQuery } from "./media-query"
import { parser } from "./parser"

const hasTheme = (props: any): props is { theme: Theme } => {
  return Boolean(isObject(props) && props.theme)
}

type PropsOrTheme = Theme | { theme: Theme }

export const css = (styleProps: StyleObject) => (props: PropsOrTheme) => {
  const theme = hasTheme(props) ? props.theme : props

  let result: CSSObject = {}

  const styleObject = runIfFn(styleProps, theme)
  const styles = parsePseudo(styleObject as any)

  const queries = getMediaQuery(theme.breakpoints)

  function compute(val: any, config: any) {
    if (!config) return val
    const scale = get(theme, config.scale, config.fallbackScale)

    if (config.transform) {
      return config.transform(val, scale)
    }

    return getWithDefault(val, scale)
  }

  function assignArray(prop: any, values: any, config: any) {
    return assignArrayValue({
      mediaQueries: queries.asArray,
      prop,
      values,
      transform: val => compute(val, config),
    })
  }

  for (const prop in styles) {
    const styleValue = styles[prop]
    const val = runIfFn(styleValue, theme)
    const config = parser.config[prop] as any

    if (prop === "apply") {
      const extendStyles = css(get(theme, val))(theme)
      result = deepmerge(result, extendStyles)
      continue
    }

    if (isObject(val)) {
      const computedStyles = compute(val, config)
      result[prop] = css(computedStyles)(theme)
      continue
    }

    if (isArray(val)) {
      if (config?.properties) {
        config.properties.forEach((prop: any) => {
          const computedStyles = assignArray(prop, val, config)
          result = deepmerge(result, computedStyles)
        })
        continue
      }

      if (config?.property) {
        const computedStyles = assignArray(config.property, val, config)
        result = deepmerge(result, computedStyles)
        continue
      }

      const computedStyles = assignArray(prop, val, config)
      result = deepmerge(result, computedStyles)
      continue
    }

    if (config?.properties) {
      config.properties.forEach((prop: any) => {
        result[prop] = compute(val, config)
      })
      continue
    }

    if (config?.property) {
      const computedStyles = compute(val, config)
      result[config.property] = computedStyles
      continue
    }

    result[prop] = compute(val, config)
  }

  return result
}
