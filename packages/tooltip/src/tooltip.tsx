import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { isString, omit, pick, __DEV__, mergeRefs } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"
import { useTooltip, UseTooltipProps } from "./use-tooltip"
import { HiddenTransition, useTransitionConfig } from "@chakra-ui/transition"

export type TooltipProps = PropsOf<typeof chakra.div> &
  ThemingProps &
  UseTooltipProps & {
    /**
     * The react component to use as the
     * trigger for the tooltip
     */
    children?: React.ReactNode
    /**
     * The label of the tooltip
     */
    label?: string
    /**
     * The accessible, human friendly label to use for
     * screen readers.
     *
     * If passed, tooltip will show the content `label`
     * but expose only `aria-label` to assistive technologies
     */
    "aria-label"?: string
    /**
     * If `true`, the tooltip will wrap it's children
     * in a `<span/>` with `tabIndex=0`
     */
    shouldWrapChildren?: boolean
    /**
     * If `true`, the tooltip will show an arrow tip
     */
    hasArrow?: boolean
  }

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/components/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */
export const Tooltip = React.forwardRef(function Tooltip(
  props: TooltipProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("Tooltip", props)
  const transitions = useTransitionConfig("Tooltip", props, {
    container: "chakra-tooltip",
  })

  const realProps = omitThemingProps(props)
  const {
    children,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    ...rest
  } = realProps

  const {
    isOpen,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
  } = useTooltip(realProps)

  const shouldWrap = isString(children) || shouldWrapChildren

  let trigger: React.ReactElement

  if (shouldWrap) {
    trigger = (
      <chakra.span tabIndex={0} {...getTriggerProps()}>
        {children}
      </chakra.span>
    )
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    const child = React.Children.only(children) as React.ReactElement
    trigger = React.cloneElement(child, getTriggerProps(child.props))
  }

  const hasAriaLabel = !!ariaLabel

  const _tooltipProps = getTooltipProps({ ...rest, ref })

  const tooltipProps = hasAriaLabel
    ? omit(_tooltipProps, ["role", "id"])
    : _tooltipProps

  const hiddenProps = pick(_tooltipProps, ["role", "id"])

  const cssRef = React.useRef<any>()
  tooltipProps.ref = mergeRefs(tooltipProps.ref, cssRef)

  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */
  if (!label) {
    return <>{children}</>
  }

  return (
    <>
      {trigger}
      <HiddenTransition
        classNames={transitions.container.className}
        timeout={transitions.container.timeout}
        appear
        unmountOnExit
        in={isOpen}
        nodeRef={cssRef}
      >
        <Portal>
          <chakra.div
            className={transitions.container.className}
            {...tooltipProps}
            __css={{
              ...styles.container,
              ...transitions.container.styles,
            }}
          >
            {label}
            {hasAriaLabel && (
              <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
            )}
            {hasArrow && (
              <chakra.div
                className="chakra-tooltip__arrow"
                {...getArrowProps()}
                __css={{
                  bg: "inherit",
                  ...styles.arrow,
                }}
              />
            )}
          </chakra.div>
        </Portal>
      </HiddenTransition>
    </>
  )
})

if (__DEV__) {
  Tooltip.displayName = "Tooltip"
}
