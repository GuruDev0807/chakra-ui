/** @jsx jsx */
import { useColorMode, useTheme } from "@chakra-ui/core";
import { css, jsx, keyframes } from "@emotion/core";
import Box from "../Box";

const skeletonGlow = (colorStart, colorEnd) => keyframes`
from {
  border-color: ${colorStart};
  background: ${colorStart};
}

to {
  border-color: ${colorEnd};
  background: ${colorEnd};
}
`;

const getStyle = ({ colorStart, colorEnd }) => css`
  border-color: ${colorStart} !important;
  box-shadow: none !important;

  // do not !important this for Firefox support
  background: ${colorStart};

  // Prevent background color from extending to the border and overlappping
  background-clip: padding-box !important;
  cursor: default;

  // Transparent text will occupy space but be invisible to the user
  color: transparent !important;
  animation: 1s linear infinite alternate ${skeletonGlow(colorStart, colorEnd)};
  pointer-events: none;
  user-select: none;

  // Make pseudo-elements (CSS icons) and children invisible
  &::before,
  &::after,
  * {
    visibility: hidden !important;
  }
`;

const Skeleton = props => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const defaultStart = { light: colors.gray[100], dark: colors.gray[800] };
  const defaultEnd = { light: colors.gray[400], dark: colors.gray[500] };
  const {
    colorStart = defaultStart[colorMode],
    colorEnd = defaultEnd[colorMode],
    ...rest
  } = props;
  return (
    <Box
      css={getStyle({ colorStart, colorEnd })}
      borderRadius="2px"
      {...rest}
    />
  );
};

export default Skeleton;
