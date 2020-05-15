import { chakra, PropsOf } from "@chakra-ui/system"
import {
  Transition,
  TransitionProps,
  TransitionStyles,
} from "@chakra-ui/transition"
import { ariaAttr, cx, mergeRefs, __DEV__ } from "@chakra-ui/utils"
import { useRect } from "@reach/rect"
import * as React from "react"
import {
  cloneElement,
  forwardRef,
  useState,
  Children,
  useRef,
  Ref,
} from "react"

export type CollapseProps = PropsOf<typeof chakra.div> & {
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean
  /**
   * The height you want the content in it's collapsed state.
   * @default 0
   */
  startingHeight?: number
  /**
   * Custom styles for the Transition component's appear, entered and exiting states
   */
  config?: TransitionProps["styles"]
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean
  /**
   * The CSS `transition-duration` (in ms) to apply for the collapse animation
   *
   * @default
   * 150
   */
  timeout?: number
  /**
   * The CSS `transition-timing-function` to apply for the collapse animation
   *
   * @default
   * "ease"
   */
  easing?: string
}

export const Collapse = forwardRef(
  (props: CollapseProps, forwardedRef: React.Ref<any>) => {
    const {
      isOpen,
      children,
      config,
      startingHeight = 0,
      animateOpacity = true,
      className,
      style: htmlStyle,
      timeout = 150,
      easing = "ease",
      ...rest
    } = props

    const getStr = (property: string) => `${property} ${timeout}ms ${easing}`

    const transition = `${getStr("height")}, ${getStr("opacity")}, ${getStr(
      "transform",
    )}`

    const [hidden, setHidden] = useState(true)

    type ChildElement = React.ReactElement<{ ref: Ref<any> }>

    let child = children

    if (typeof children === "string") {
      child = <div>{children}</div>
    }

    const _child = Children.only(child) as ChildElement

    const ref = useRef<HTMLDivElement>(null)

    const rect = useRect(ref, true)
    const height = rect?.height ?? 0

    const styles: TransitionStyles = {
      init: {
        height: startingHeight,
        opacity: startingHeight ? 1 : 0,
      },
      entered: {
        height,
        opacity: 1,
        transform: "translateY(0)",
      },
      exiting: {
        height: startingHeight,
        opacity: startingHeight ? 1 : 0,
        transform: startingHeight > 0 ? "translateY(0)" : "translateY(-0.5rem)",
      },
    }

    return (
      <Transition
        in={isOpen}
        styles={config || styles}
        onEntered={() => setHidden(false)}
        onExited={() => setHidden(true)}
        timeout={{ enter: 0, exit: timeout }}
        transition={transition}
        unmountOnExit={false}
      >
        {styles => (
          <chakra.div
            ref={forwardedRef}
            className={cx("chakra-collapse", className)}
            aria-hidden={ariaAttr(hidden)}
            {...rest}
            style={{
              ...styles,
              overflow: "hidden",
              opacity: animateOpacity ? styles.opacity : 1,
              willChange: "height, opacity, transform",
              ...htmlStyle,
            }}
          >
            {cloneElement(_child, {
              ref: mergeRefs(ref, _child.props.ref),
            })}
          </chakra.div>
        )}
      </Transition>
    )
  },
)

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
