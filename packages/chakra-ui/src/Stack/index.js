/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, isValidElement } from "react";
import Flex from "../Flex";
import Box from "../Box";

const Stack = ({
  direction,
  isInline = false,
  children,
  align,
  justify,
  spacing = 2,
  shouldWrapChildren,
  ...rest
}) => {
  let flexDirection;

  if (isInline != null) {
    flexDirection = isInline ? "row" : "column";
  }

  if (direction != null) {
    flexDirection = direction;
  }

  return (
    <Flex align={align} justify={justify} direction={flexDirection} {...rest}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return;
        let isLastChild = children.length === index + 1;
        let spacingProps =
          isInline || direction === "horizontal"
            ? { mr: isLastChild ? null : spacing }
            : { mb: isLastChild ? null : spacing };

        if (shouldWrapChildren) {
          return (
            <Box d="inline-block" {...spacingProps}>
              {child}
            </Box>
          );
        }
        return cloneElement(child, spacingProps);
      })}
    </Flex>
  );
};

export default Stack;
