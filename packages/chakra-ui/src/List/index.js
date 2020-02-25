/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef } from "react";
import Box from "../Box";
import Icon from "../Icon";
import PseudoBox from "../PseudoBox";
import { cleanChildren } from "../utils";

const List = forwardRef(
  (
    { styleType = "none", stylePos = "inside", spacing, children, ...props },
    ref,
  ) => {
    const validChildren = cleanChildren(children);
    return (
      <Box
        ref={ref}
        as="ul"
        listStyleType={styleType}
        listStylePosition={stylePos}
        {...props}
      >
        {validChildren.map((child, index) => {
          const isLast = index + 1 === Children.count(children);
          if (isLast) {
            return child;
          }

          return cloneElement(child, { spacing });
        })}
      </Box>
    );
  },
);

List.displayName = "List";

export const ListItem = forwardRef(({ spacing, ...props }, ref) => (
  <PseudoBox ref={ref} as="li" mb={spacing} {...props} />
));

ListItem.diplayName = "ListItem";

export const ListIcon = ({ icon, ...props }) => {
  if (typeof icon === "string") {
    return <Icon name={icon} mr={2} {...props} />;
  }

  return (
    <Box
      as={icon}
      d="inline"
      focusable="false"
      size="1em"
      color="currentColor"
      mr={2}
      {...props}
    />
  );
};

export default List;
