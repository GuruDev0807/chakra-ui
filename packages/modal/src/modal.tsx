import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  PropsOf,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { SlideFadeMotion } from "@chakra-ui/transition"
import { FadeMotion, ScaleFadeMotion } from "@chakra-ui/transition"
import {
  callAllHandlers,
  createContext,
  cx,
  FocusableElement,
  __DEV__,
} from "@chakra-ui/utils"
import { AnimatePresence, usePresence } from "framer-motion"
import * as React from "react"
import { RemoveScroll } from "react-remove-scroll"
import { useModal, UseModalProps, UseModalReturn } from "./use-modal"

interface ModalOptions {
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨 Warning: We don't recommend doing this because it hurts the
   * accessbility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean
  /**
   * If `true`, the modal will autofocus the first enabled and interative
   * element within the `ModalContent`
   *
   * @default true
   */
  autoFocus?: boolean
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<FocusableElement>
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<FocusableElement>
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   * Defaults to `false`.
   */
  allowPinchZoom?: boolean
  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   */
  preserveScrollBarGap?: boolean
}
export interface ModalProps extends UseModalProps, ModalOptions, ThemingProps {
  children: React.ReactNode
  /**
   *  If `true`, the modal will be centered on screen.
   * @default false
   */
  isCentered?: boolean
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: "inside" | "outside"
  /**
   * Function that will be called to get the parent element
   * that the modal will be attached to.
   */
  getContainer?: PortalProps["getContainer"]
}

interface ModalContext extends ModalOptions, UseModalReturn {}

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: "ModalContext",
  errorMessage:
    "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`",
})

export { ModalContextProvider, useModalContext }

/**
 * Modal component provides context, theming, and accessibility properties
 * to its sub-components. It doesn't render any DOM node.
 */
export function Modal(props: ModalProps) {
  const {
    getContainer,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
  } = props

  const styles = useMultiStyleConfig("Modal", props)
  const modal = useModal(props)

  const context = {
    ...modal,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
  }

  return (
    <ModalContextProvider value={context}>
      <StylesProvider value={styles}>
        <AnimatePresence>
          {context.isOpen && (
            <Portal getContainer={getContainer}>{children}</Portal>
          )}
        </AnimatePresence>
      </StylesProvider>
    </ModalContextProvider>
  )
}

Modal.defaultProps = {
  returnFocusOnClose: true,
  scrollBehavior: "outside",
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
}

if (__DEV__) {
  Modal.displayName = "Modal"
}

export interface ModalContentProps extends PropsOf<typeof chakra.section> {}

const SlideFade = chakra(SlideFadeMotion)

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const ModalContent = forwardRef<ModalContentProps, "section">(
  function ModalContent(props, ref) {
    const { className, children, ...rest } = props

    const { getDialogProps, getDialogContainerProps } = useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps()

    const _className = cx("chakra-modal__content", className)

    const styles = useStyles()

    const dialogStyles: SystemStyleObject = {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog,
    }

    const dialogContainerStyles: SystemStyleObject = {
      display: "flex",
      width: "100vw",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    }

    return (
      <chakra.div
        {...containerProps}
        className="chakra-modal__content-container"
        __css={dialogContainerStyles}
      >
        <ModalScope>
          <SlideFade
            reverse
            offsetY={8}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </SlideFade>
        </ModalScope>
      </chakra.div>
    )
  },
)

if (__DEV__) {
  ModalContent.displayName = "ModalContent"
}

interface ModalScopeProps {
  children: React.ReactElement
}

export function ModalScope(props: ModalScopeProps) {
  const {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
  } = useModalContext()

  const [isPresent, safeToRemove] = usePresence()

  React.useEffect(() => {
    if (!isPresent && safeToRemove) {
      setTimeout(safeToRemove)
    }
  }, [isPresent])

  return (
    <FocusLock
      autoFocus={autoFocus}
      isDisabled={!trapFocus}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      restoreFocus={returnFocusOnClose}
      contentRef={dialogRef}
    >
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        enabled={blockScrollOnMount}
        forwardProps
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  )
}

const Fade = chakra(FadeMotion)

export interface ModalOverlayProps extends PropsOf<typeof Fade> {}

/**
 * ModalOverlay renders a backdrop behind the modal. It's
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalOverlay = forwardRef<ModalOverlayProps, "div">(
  function ModalOverlay(props, ref) {
    const { className, ...rest } = props
    const _className = cx("chakra-modal__overlay", className)

    const styles = useStyles()
    const overlayStyle: SystemStyleObject = {
      pos: "fixed",
      left: "0",
      top: "0",
      w: "100vw",
      h: "100vh",
      ...styles.overlay,
    }

    return (
      <Fade __css={overlayStyle} ref={ref} className={_className} {...rest} />
    )
  },
)

if (__DEV__) {
  ModalOverlay.displayName = "ModalOverlay"
}

export interface ModalHeaderProps extends PropsOf<typeof chakra.header> {}

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalHeader = forwardRef<ModalHeaderProps, "header">(
  function ModalHeader(props, ref) {
    const { className, ...rest } = props

    const { headerId, setHeaderMounted } = useModalContext()

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    React.useEffect(() => {
      setHeaderMounted(true)
      return () => setHeaderMounted(false)
    }, [setHeaderMounted])

    const _className = cx("chakra-modal__header", className)

    const styles = useStyles()
    const headerStyles: SystemStyleObject = {
      flex: 0,
      ...styles.header,
    }

    return (
      <chakra.header
        ref={ref}
        className={_className}
        id={headerId}
        {...rest}
        __css={headerStyles}
      />
    )
  },
)

if (__DEV__) {
  ModalHeader.displayName = "ModalHeader"
}

export interface ModalBodyProps extends PropsOf<typeof chakra.div> {}

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalBody = forwardRef<ModalBodyProps, "div">(function ModalBody(
  props,
  ref,
) {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  React.useEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [setBodyMounted])

  const _className = cx("chakra-modal__body", className)
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      className={_className}
      id={bodyId}
      {...rest}
      __css={styles.body}
    />
  )
})

if (__DEV__) {
  ModalBody.displayName = "ModalBody"
}

export interface ModalFooterProps extends PropsOf<typeof chakra.footer> {}

/**
 * ModalFooter houses the action buttons of the modal.
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalFooter = forwardRef<ModalFooterProps, "footer">(
  function ModalFooter(props, ref) {
    const { className, ...rest } = props
    const _className = cx("chakra-modal__footer", className)

    const styles = useStyles()
    const footerStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flex: 0,
      ...styles.footer,
    }

    return (
      <chakra.footer
        ref={ref}
        {...rest}
        __css={footerStyles}
        className={_className}
      />
    )
  },
)

if (__DEV__) {
  ModalFooter.displayName = "ModalFooter"
}

/**
 * ModalCloseButton is used closes the modal.
 *
 * You don't need to pass the `onClick` to it, it's reads the
 * `onClose` action from the modal context.
 */
export const ModalCloseButton = forwardRef<CloseButtonProps, "button">(
  function ModalCloseButton(props, ref) {
    const { onClick, className, ...rest } = props
    const { onClose } = useModalContext()

    const _className = cx("chakra-modal__close-btn", className)

    return (
      <CloseButton
        ref={ref}
        position="absolute"
        top="8px"
        right="12px"
        className={_className}
        onClick={callAllHandlers(onClick, (event) => {
          event.stopPropagation()
          onClose()
        })}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton"
}
