import { useTheme, useUIMode } from "../ThemeProvider";

export const useMenuListStyle = () => {
  const { mode } = useUIMode();
  const elevation = {
    light: {
      bg: "#fff",
      boxShadow: "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)"
    },
    dark: {
      bg: "gray.800",
      boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`
    }
  };

  return {
    color: "inherit",
    ...elevation[mode]
  };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

const baseProps = {
  width: "full",
  flex: " 0 0 auto",
  userSelect: "none",
  transition: "background-color 220ms, color 220ms"
};

const interactionProps = ({ mode }) => {
  const _focusColor = { light: "gray.100", dark: "alpha.100" };
  const _activeColor = { light: "gray.200", dark: "alpha.200" };

  return {
    _active: {
      bg: _activeColor[mode]
    },
    _focus: {
      bg: _focusColor[mode]
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  };
};

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const { mode } = useUIMode();
  const props = { theme, mode };

  return {
    ...baseProps,
    ...interactionProps(props)
  };
};
