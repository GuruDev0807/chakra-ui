import { css } from "@emotion/core";

const getPopperArrowStyle = ({
  arrowSize = "1rem",
  arrowShadowColor = "rgba(0, 0, 0, 0.1)",
  hasArrow = true,
}) => {
  const popoverMargin = hasArrow ? `calc(${arrowSize} / 2)` : null;
  const arrowPos = `calc(${arrowSize} / 2 * -1)`;

  return css`
    [x-arrow] {
      width: ${arrowSize};
      height: ${arrowSize};
      position: absolute;
      transform: rotate(45deg);

      &::before {
        content: "";
        width: ${arrowSize};
        height: ${arrowSize};
        position: absolute;
        z-index: -1;
      }
    }

    &[x-placement^="top"] {
      margin-bottom: ${popoverMargin};
      transform-origin: bottom center;
    }

    &[x-placement^="top"] [x-arrow] {
      bottom: ${arrowPos};

      &::before {
        box-shadow: 2px 2px 2px 0 ${arrowShadowColor};
      }
    }

    &[x-placement^="bottom"] {
      margin-top: ${popoverMargin};
      transform-origin: top center;
    }

    &[x-placement^="bottom"] [x-arrow] {
      top: ${arrowPos};

      &::before {
        box-shadow: -1px -1px 1px 0 ${arrowShadowColor};
      }
    }

    &[x-placement^="right"] {
      margin-left: ${popoverMargin};
      transform-origin: left center;
    }

    &[x-placement^="right"] [x-arrow] {
      left: ${arrowPos};

      &::before {
        box-shadow: -1px 1px 1px 0 ${arrowShadowColor};
      }
    }

    &[x-placement^="left"] {
      margin-right: ${popoverMargin};
      transform-origin: right center;
    }

    &[x-placement^="left"] [x-arrow] {
      right: ${arrowPos};
      &::before {
        box-shadow: 1px -1px 1px 0 ${arrowShadowColor};
      }
    }
  `;
};

export default getPopperArrowStyle;
