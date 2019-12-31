import { ThemeContext } from "@emotion/core";
import { css, get } from "@styled-system/css";
import * as React from "react";
import { forwardRef } from "../forward-ref";
import { isPropValid, jsx } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";
import { replacePseudo } from "../system/jsx";

//TODO: Figure out the color mode API
function getComponentStyles(props: any, options: any) {
  const themableProps = ["variant", "variantSize", "variantColor"];
  let componentStyle: any = {};

  const themeKey = options?.themeKey;
  if (!themeKey) return null;

  const getCommonStyle = replacePseudo(get(props.theme, `${themeKey}.common`));

  if (getCommonStyle) {
    const commonStyle = css(getCommonStyle)(props.theme);
    componentStyle = commonStyle;
  }

  for (const prop of themableProps) {
    if (themableProps.includes(prop)) {
      const getFromTheme = get(
        props.theme,
        `${themeKey}.${prop}.${props[prop]}`,
      );

      if (!getFromTheme) continue;

      const systemObject =
        typeof getFromTheme === "function"
          ? replacePseudo(getFromTheme(props))
          : replacePseudo(getFromTheme);

      const style = css(systemObject)(props.theme);

      componentStyle = { ...componentStyle, ...style };
    }
  }
  return componentStyle;
}

export const styled = <T extends As, H = {}>(
  tag: T,
  options?: CreateChakraOptions<H>,
) => (...interpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, ...props }: any, ref: React.Ref<Element>) => {
      // check if we should forward props
      const shouldForwardProps =
        typeof tag !== "string" || (as && typeof as !== "string");
      const theme = React.useContext(ThemeContext);

      // component component style
      let styles = {};
      const propsWithTheme = { theme, ...props };

      interpolations.forEach(interpolation => {
        const style =
          typeof interpolation === "function"
            ? interpolation(propsWithTheme)
            : interpolation;
        styles = { ...styles, ...style };
      });

      const componentStyles = getComponentStyles(propsWithTheme, options);
      styles = { ...componentStyles, ...styles };

      // check if we should forward props
      let nextProps: Record<string, any> = shouldForwardProps
        ? { ...props }
        : {};

      // If hook was passed, invoke the hook
      if (options?.hook) {
        const hookProps = options.hook({ ref, ...props });
        nextProps = { ...nextProps, ...hookProps };
      }

      if (!shouldForwardProps) {
        for (const key in props) {
          if (!isPropValid(key)) continue;
          nextProps[key] = props[key];
        }
      }

      return jsx(as || tag, {
        ...nextProps,
        css: styles,
      });
    },
  );

  return Styled as CreateChakraComponent<T, H>;
};

export default styled;
