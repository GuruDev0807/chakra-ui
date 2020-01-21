/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  getProgressProps,
  stripe,
  ProgressPropsOptions,
} from "./Progress.utils";
import { chakra, PropsOf } from "@chakra-ui/system";
import { generateStripe } from "@chakra-ui/color";
import { Omit, isArray, isObject, Dict } from "@chakra-ui/utils";

const stripeAnimation = css`
  animation: ${stripe} 1s linear infinite;
`;

export const ProgressLabel = (props: any) => (
  <chakra.div textAlign="center" width="100%" {...props} />
);

type ProgressIndicatorProps = ProgressPropsOptions;

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const { min, max, value, ...rest } = props;
  const progress = getProgressProps({ value, min, max });

  return (
    <chakra.div
      height="100%"
      transition="all 0.3s"
      width={`${progress.percent}%`}
      {...progress.bind}
      {...rest}
    />
  );
};

const progressbarSizes = {
  lg: "1rem",
  md: "0.75rem",
  sm: "0.5rem",
};

type ProgressTrackProps = Omit<PropsOf<typeof chakra.div>, "size"> & {
  size: keyof typeof progressbarSizes;
};

function resolveProp(prop: any, fn: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map(val => fn(val));
  }

  if (isObject(prop)) {
    const result: Record<string, string> = {};
    for (const key in prop) {
      result[key] = fn(prop[key]);
    }
    return result;
  }

  if (prop != null) {
    return fn(prop);
  }

  return null;
}

function ProgressTrack({ size, ...props }: ProgressTrackProps) {
  return (
    <chakra.div
      position="relative"
      height={progressbarSizes[size]}
      overflow="hidden"
      {...props}
    />
  );
}

interface ProgressProps {
  color?: string;
  value?: number;
  min?: number;
  max?: number;
  variantSize?: "lg" | "md" | "sm";
  hasStripe?: boolean;
  isAnimated?: boolean;
}

function getBaseStyle(props: any) {
  return {};
}

const Progress = ({
  color = "blue",
  value = 63,
  min = 0,
  max = 100,
  variantSize = "md",
  hasStripe,
  isAnimated,
  children,
  ...rest
}: ProgressProps) => {
  const _borderRadius = rounded || borderRadius;
  const { colorMode } = useColorMode();

  const trackColor = { light: "gray.100", dark: "whiteAlpha.300" };
  const indicatorColor = { light: `${color}.500`, dark: `${color}.200` };

  const stripeStyle = {
    light: generateStripe({}),
    dark: generateStripe({
      color: "rgba(0,0,0,0.1)",
    }),
  };

  return (
    <ProgressTrack
      size={size}
      bg={trackColor[colorMode]}
      borderRadius={_borderRadius}
      {...rest}
    >
      <ProgressIndicator
        min={min}
        max={max}
        value={value}
        bg={indicatorColor[colorMode]}
        borderRadius={_borderRadius}
        {...(isIndeterminate && {
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          willChange: "left, right",
        })}
        css={[
          hasStripe && stripeStyle[colorMode],
          hasStripe && isAnimated && stripeAnimation,
        ]}
      />
    </ProgressTrack>
  );
};

export default Progress;
