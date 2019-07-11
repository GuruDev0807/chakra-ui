/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import propTypes from "prop-types";
import Icon from "./Icon";
import { Flex } from "./Layout";
import VisuallyHidden from "./VisuallyHidden";

const baseStyle = css({
  transition: "all 0.2s",
  opacity: 0.7,
  flex: "0 0 auto",
  "&:not([aria-disabled=true]):hover": { opacity: 1 },
  "&[aria-disabled=true]": {
    cursor: "not-allowed",
    opacity: 0.6
  }
});

const CloseButton = ({
  size,
  mode,
  isDisabled,
  color,
  icon = "close",
  "aria-label": ariaLabel = "Close",
  onClick,
  ...rest
}) => {
  return (
    <Flex
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={onClick}
      tabindex="0"
      borderRadius="round"
      as="button"
      css={baseStyle}
      {...rest}
    >
      <Icon
        color={color}
        name={icon}
        aria-hidden
        size={`closeButton.${size}`}
      />
      <VisuallyHidden>{ariaLabel}</VisuallyHidden>
    </Flex>
  );
};

CloseButton.defaultProps = {
  size: "md"
};

CloseButton.propTypes = {
  size: propTypes.oneOf(["sm", "md", "lg", "xl", "2xl"])
};

export default CloseButton;
