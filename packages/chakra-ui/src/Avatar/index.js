/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import useAvatarStyle, { avatarSizes } from "./styles";
import { useHasImageLoaded } from "../Image";
import { useTheme } from "../ThemeProvider";
import { useColorMode } from "../ColorModeProvider";
import Absolute from "../Absolute";
import Box from "../Box";

export const AvatarBadge = props => {
  const { colorMode } = useColorMode();
  const borderColor = { light: "white", dark: "gray.800" };

  return (
    <Absolute
      display="flex"
      alignItems="center"
      justifyContent="center"
      transform="translate(25%, 25%)"
      bottom="0"
      right="0"
      border="0.2em solid"
      borderColor={borderColor[colorMode]}
      rounded="full"
      {...props}
    />
  );
};

const getInitials = name => {
  let [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  } else {
    return firstName.charAt(0);
  }
};

const AvatarName = ({ name, ...props }) => {
  return (
    <Box
      textAlign="center"
      textTransform="uppercase"
      fontWeight="medium"
      {...props}
    >
      {name ? getInitials(name) : null}
    </Box>
  );
};

const DefaultAvatar = () => (
  <Box size="100%">
    <svg fill="#fff" viewBox="0 0 128 128" role="img">
      <g>
        <path d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z" />
        <path d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24" />
      </g>
    </svg>
  </Box>
);

const Avatar = ({
  size,
  showBorder,
  name,
  badge,
  src,
  borderColor,
  ...rest
}) => {
  const avatarStyleProps = useAvatarStyle({
    name,
    size,
    showBorder,
    borderColor,
  });
  const hasLoaded = useHasImageLoaded({ src });

  const theme = useTheme();
  const sizeKey = avatarSizes[size];
  const _size = theme.sizes[sizeKey];

  const renderChildren = () => {
    if (src && hasLoaded) {
      return (
        <Box
          as="img"
          size="100%"
          rounded="full"
          objectFit="cover"
          src={src}
          alt={name}
        />
      );
    }

    if (src && !hasLoaded) {
      if (name) {
        return <AvatarName size={_size} name={name} />;
      } else {
        return <DefaultAvatar />;
      }
    }

    if (!src && name) {
      return <AvatarName size={_size} name={name} />;
    }

    return <DefaultAvatar />;
  };

  return (
    <Box
      fontSize={`calc(${_size} / 2.5)`}
      lineHeight={_size}
      verticalAlign="bottom"
      {...avatarStyleProps}
      {...rest}
    >
      {renderChildren()}
      {badge}
    </Box>
  );
};

Avatar.defaultProps = {
  size: "md",
};

Avatar.propTypes = {
  size: propTypes.oneOf(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]),
  showBorder: propTypes.bool,
  name: propTypes.string,
  badge: propTypes.node,
  src: propTypes.string,
};

export default Avatar;
