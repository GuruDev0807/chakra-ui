import { Dict, runIfFn } from "@chakra-ui/utils"
import { jsx as emotion } from "@emotion/core"
import { SystemStyleObject, css } from "@chakra-ui/css"

function getCSS(props: { sx?: any; css?: any }) {
  if (!props.sx && !props.css) return undefined
  // leverage emotion's css function interpolation to access the theme
  return (theme: Dict) => {
    // process the theme-aware sx prop
    const sxStyles = css(props.sx)(theme)
    // process the css prop
    // (NB: This is not theme-aware, and you can't use shorthand style props)
    const cssStyles = runIfFn(props.css, theme)
    /**
     * return an array value and allow emotion do the rest.
     * By default, emotion can handle array style values
     */
    return [sxStyles, cssStyles]
  }
}

function parse(props: Dict | undefined) {
  if (!props) return null

  const computedProps: Dict = {}

  for (const prop in props) {
    if (prop === "sx") continue
    computedProps[prop] = props[prop]
  }

  const css = getCSS(props)

  if (css) computedProps.css = css

  return computedProps
}

export const jsx = (
  type: React.ElementType,
  props: Dict,
  ...children: React.ReactNode[]
) => emotion.apply(undefined, [type, parse(props), ...children])

/**
 * Merge `sx` into the react module declaration,
 * so it can be accessible anywhere jsx is imported
 */
declare module "react" {
  interface Attributes {
    sx?: SystemStyleObject
  }
}

declare global {
  // eslint-disable-next-line
  namespace JSX {
    interface IntrinsicAttributes {
      /**
       * The sx prop lets you style elements inline, using values from your
       * theme. To use the sx prop, add the custom pragma as a comment to the
       * top of your module and import the jsx function.
       */
      sx?: SystemStyleObject
    }
  }
}

export default jsx
