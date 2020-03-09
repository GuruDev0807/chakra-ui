import { FocusLock } from "@chakra-ui/focus-lock"
import { useIsomorphicEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import { chakra, createChakra, PropsOf } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import * as React from "react"
import { DialogHookProps, DialogHookReturn, useDialog } from "./Dialog.hook"

const [DialogContextProvider, useDialogContext] = createContext<
  DialogHookReturn
>()

export interface DialogProps extends DialogHookProps {
  children?: React.ReactNode
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<any>
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<any>
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   */
  returnFocusOnClose?: boolean
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside"
}

export function Dialog(props: DialogProps) {
  const {
    children,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    isOpen = true,
  } = props
  const context = useDialog(props)

  if (!isOpen) return null

  return (
    <DialogContextProvider value={context}>
      <Portal>
        <FocusLock
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={returnFocusOnClose}
        >
          {children}
        </FocusLock>
      </Portal>
    </DialogContextProvider>
  )
}

export type DialogContentProps = PropsOf<typeof chakra.div>

export const DialogContent = (props: DialogContentProps) => {
  const { getDialogContentProps } = useDialogContext()
  return (
    <StyledContent
      data-chakra-dialog-content=""
      scrollBehavior="inside"
      {...getDialogContentProps(props)}
    />
  )
}

const StyledContent = createChakra("div", {
  themeKey: "Dialog.Content",
  baseStyle: (props: any) => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    maxHeight:
      props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
    overflow: props.scrollBehavior === "inside" ? "hidden auto" : undefined,
    _focus: {
      outline: 0,
    },
  }),
})

export type DialogOverlayProps = PropsOf<typeof StyledOverlay>

export const DialogOverlay = (props: DialogOverlayProps) => {
  const { getDialogOverlayProps } = useDialogContext()
  return (
    <StyledOverlay
      data-chakra-dialog-overlay=""
      scrollBehavior="inside"
      isCentered={true}
      {...getDialogOverlayProps(props as any)}
    />
  )
}

const StyledOverlay = createChakra("div", {
  themeKey: "Dialog.Overlay",
  baseStyle: (props: any) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: props.isCentered ? "center" : undefined,
    paddingY: "7.5rem",
    position: "fixed",
    overflow: props.scrollBehavior === "inside" ? "hidden" : undefined,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
  }),
  shouldForwardProp(prop) {
    return !["scrollBehavior", "isCentered"].includes(prop)
  },
})

export type DialogHeaderProps = PropsOf<typeof StyledHeader>

export const DialogHeader = (props: DialogHeaderProps) => {
  const { headerId, setHeaderMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [])

  return <StyledHeader data-chakra-dialog-header="" id={headerId} {...props} />
}

const StyledHeader = createChakra("header", {
  themeKey: "Dialog.Header",
})

export type DialogBodyProps = PropsOf<"div">

export const DialogBody = (props: DialogBodyProps) => {
  const { bodyId, setBodyMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  return <StyledBody data-chakra-dialog-body="" id={bodyId} {...props} />
}

const StyledBody = createChakra("div", { themeKey: "Dialog.Body" })

export const DialogFooter = createChakra("footer", {
  themeKey: "Dialog.Footer",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export const DialogCloseButton = (props: CloseButtonProps) => {
  const { onClose } = useDialogContext()
  return (
    <CloseButton
      onClick={onClose as any}
      position="absolute"
      top="8px"
      right="12px"
      data-chakra-dialog-close-btn=""
      {...props}
    />
  )
}
