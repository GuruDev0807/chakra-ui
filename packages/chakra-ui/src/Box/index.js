/** @jsx jsx */
import styled from "@emotion/styled";
import {
  createShouldForwardProp,
  props,
} from "@styled-system/should-forward-prop";
import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  compose,
} from "styled-system";
import extraConfig from "./config";

export const truncate = props => {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
};

export const systemProps = compose(
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  extraConfig,
);

const shouldForwardProp = createShouldForwardProp([
  ...props,
  "d",
  "textDecoration",
  "pointerEvents",
  "visibility",
  "transform",
  "cursor",
  "fill",
  "stroke",
]);

const Box = styled("div", {
  shouldForwardProp,
})(truncate, systemProps);

export default Box;
