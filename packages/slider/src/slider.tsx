import {
  chakra,
  GetProps,
  ThemingProps,
  useMultiStyleConfig,
  omitThemingProps,
  StylesProvider,
  useStyles,
  forwardRef,
} from "@chakra-ui/system"
import { createContext, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"

interface SliderContext
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: "SliderContext",
  errorMessage:
    "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />",
})

export { SliderProvider, useSliderContext }

export interface SliderProps
  extends UseSliderProps,
    ThemingProps,
    Omit<GetProps<typeof chakra.div>, "size" | "defaultValue"> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/components/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export const Slider = forwardRef<SliderProps, "div">(function Slider(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Slider", props)
  const realProps = omitThemingProps(props)

  const { getInputProps, getRootProps, ...context } = useSlider(realProps)

  const rootProps = getRootProps()
  const inputProps = getInputProps({}, ref)

  const rootStyles = {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    ...styles.container,
  }

  return (
    <SliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div {...rootProps} className="chakra-slider" __css={rootStyles}>
          {props.children}
          <input {...inputProps} />
        </chakra.div>
      </StylesProvider>
    </SliderProvider>
  )
})

Slider.defaultProps = {
  orientation: "horizontal",
}

if (__DEV__) {
  Slider.displayName = "Slider"
}

///////////////////////////////////////////////////////////////////////////

export interface SliderThumbProps extends GetProps<typeof chakra.div> {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">(
  function SliderThumb(props, ref) {
    const { getThumbProps } = useSliderContext()

    const styles = useStyles()
    const thumbStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0,
      ...styles.thumb,
    }

    const thumbProps = getThumbProps(props)

    return (
      <chakra.div
        {...thumbProps}
        className={cx("chakra-slider__thumb", props.className)}
        __css={thumbStyles}
      />
    )
  },
)

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb"
}

///////////////////////////////////////////////////////////////////////////

export interface SliderTrackProps extends GetProps<typeof chakra.div> {}

export const SliderTrack = forwardRef<SliderTrackProps, "div">(
  function SliderTrack(props, ref) {
    const { getTrackProps } = useSliderContext()

    const styles = useStyles()
    const trackStyles = {
      overflow: "hidden",
      ...styles.track,
    }

    const trackProps = getTrackProps(props)

    return (
      <chakra.div
        {...trackProps}
        className={cx("chakra-slider__track", props.className)}
        __css={trackStyles}
      />
    )
  },
)

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack"
}

///////////////////////////////////////////////////////////////////////////

export type SliderInnerTrackProps = GetProps<typeof chakra.div>

export const SliderFilledTrack: React.FC<SliderInnerTrackProps> = (props) => {
  const { getInnerTrackProps } = useSliderContext()

  const styles = useStyles()
  const trackStyles = {
    width: "inherit",
    height: "inherit",
    ...styles.filledTrack,
  }

  const trackProps = getInnerTrackProps(props)

  return (
    <chakra.div
      {...trackProps}
      className="chakra-slider__filled-track"
      __css={trackStyles}
    />
  )
}

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack"
}

///////////////////////////////////////////////////////////////////////////

export interface SliderMarkProps extends GetProps<typeof chakra.div> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/components/slider
 */
export const SliderMark: React.FC<SliderMarkProps> = (props) => {
  const { getMarkerProps } = useSliderContext()
  const markProps = getMarkerProps(props)
  return (
    <chakra.div
      {...markProps}
      className={cx("chakra-slider__marker", props.className)}
    />
  )
}

if (__DEV__) {
  SliderMark.displayName = "SliderMark"
}
