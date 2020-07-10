import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks"
import { Placement, usePopper, UsePopperProps } from "@chakra-ui/popper"
import { callAllHandlers, mergeRefs, Dict } from "@chakra-ui/utils"
import * as React from "react"

export interface UseTooltipProps {
  /**
   * Delay (in ms) before showing the tooltip
   * @default 0ms
   */
  openDelay?: number
  /**
   * Delay (in ms) before hiding the tooltip
   * @default 0ms
   */
  closeDelay?: number
  /**
   * If `true`, the tooltip will hide on click
   */
  closeOnClick?: boolean
  /**
   * If `true`, the tooltip will hide while the mouse
   * is down
   */
  closeOnMouseDown?: boolean
  /**
   * Callback to run when the tooltip shows
   */
  onOpen?(): void
  /**
   * Callback to run when the tooltip hides
   */
  onClose?(): void
  /**
   * The Popper.js placement of the tooltip
   */
  placement?: Placement
  /**
   * Custom `id` to use in place of `uuid`
   */
  id?: string
  /**
   * If `true`, the tooltip will be shown (in controlled mode)
   */
  isOpen?: boolean
  /**
   * If `true`, the tooltip will be initially shown
   */
  defaultIsOpen?: boolean
  /**
   * The size of the arrow in css units (numeric)
   * @default 10 ( = 10px )
   */
  arrowSize?: UsePopperProps["arrowSize"]
  /**
   * The Popper.js modifiers to use
   */
  modifiers?: UsePopperProps["modifiers"]
  /**
   * If `true`, the tooltip will not be shown on any trigger
   */
  isDisabled?: boolean
}

export function useTooltip(props: UseTooltipProps = {}) {
  const {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    onOpen,
    onClose,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    modifiers,
    isDisabled,
  } = props

  const { isOpen, onOpen: onOpenProp, onClose: onCloseProp } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen,
    onClose,
  })

  const popper = usePopper({
    forceUpdate: isOpen,
    placement,
    arrowSize,
    modifiers,
  })

  const tooltipId = useId(id, "tooltip")

  const ref = React.useRef<any>(null)
  const triggerRef = mergeRefs(ref, popper.reference.ref)

  const enterTimeoutRef = React.useRef<NodeJS.Timeout>()
  const exitTimeoutRef = React.useRef<NodeJS.Timeout>()

  const openWithDelay = () => {
    if (!isDisabled) {
      enterTimeoutRef.current = setTimeout(onOpenProp, openDelay)
    }
  }

  const closeWithDelay = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current)
    }
    exitTimeoutRef.current = setTimeout(onCloseProp, closeDelay)
  }

  const onClick = () => {
    if (closeOnClick) {
      closeWithDelay()
    }
  }

  const onMouseDown = () => {
    if (closeOnMouseDown) {
      closeWithDelay()
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (isOpen && event.key === "Escape") {
      closeWithDelay()
    }
  }

  useEventListener("keydown", onKeyDown)

  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    placement: popper.placement,
    getTriggerProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, triggerRef),
      onMouseLeave: callAllHandlers(props.onMouseLeave, closeWithDelay),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined,
    }),
    getTooltipProps: (props: Dict = {}) => ({
      ...props,
      id: tooltipId,
      role: "tooltip",
      ref: mergeRefs(props.ref, popper.popper.ref),
      style: { ...props.style, ...popper.popper.style },
    }),
    getArrowProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, popper.arrow.ref),
      style: { ...props.style, ...popper.arrow.style },
    }),
  }
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
