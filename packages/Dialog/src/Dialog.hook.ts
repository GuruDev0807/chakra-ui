import { useAriaHidden, useIds, useLockBodyScroll } from "@chakra-ui/hooks"
import { usePortalsContext } from "@chakra-ui/portal"
import { callAllHandlers, mergeRefs } from "@chakra-ui/utils"
import * as React from "react"

export interface DialogHookProps {
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside"
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean
  /**
   * If `true`, the modal when be opened.
   */
  isOpen: boolean
  /**
   * The `id` of the modal
   */
  id?: string
  /**
   * Callback invoked to close the modal.
   */
  onClose: (event?: MouseEvent | KeyboardEvent) => void
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *  @default true
   */
  blockScrollOnMount?: boolean
  /**
   * If `true`, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean
  /**
   * If `true`, the modal will close when the `Esc` key is pressed
   * @default true
   */
  closeOnEsc?: boolean
}

export function useDialog(props: DialogHookProps) {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    blockScrollOnMount = true,
  } = props
  const dialogRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLElement>(null)

  const [dialogId, headerId, bodyId] = useIds(
    id,
    `chakra-dialog`,
    `chakra-dialog--header`,
    `chakra-dialog--body`,
  )

  useLockBodyScroll(dialogRef, isOpen && blockScrollOnMount)
  useAriaHidden(dialogRef, isOpen)

  const dialogs = useStackContext(dialogRef, isOpen)

  const mouseDownTarget = React.useRef<EventTarget | null>(null)

  const handleMouseDown = React.useCallback((event: React.MouseEvent) => {
    mouseDownTarget.current = event.target
  }, [])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()
        closeOnEsc && onClose?.()
      }
    },
    [closeOnEsc, onClose],
  )

  const lastDialog = dialogs[dialogs.length - 1]

  const onOverlayClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()

      const isLast = lastDialog?.current === dialogRef.current

      if (mouseDownTarget.current === event.target && isLast) {
        closeOnOverlayClick && onClose?.()
      }
    },
    [lastDialog, onClose, closeOnOverlayClick],
  )

  const [headerMounted, setHeaderMounted] = React.useState(false)
  const [bodyMounted, setBodyMounted] = React.useState(false)

  type DialogContentProps = {
    ref?: React.Ref<any>
    onClick?: React.MouseEventHandler
    role?: string
  }

  type DialogOverlayProps = {
    ref?: React.Ref<any>
    onClick?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onKeyDown?: React.KeyboardEventHandler
  }

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    getDialogContentProps: (props: DialogContentProps = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, dialogRef),
      id: dialogId,
      role: props.role || "dialog",
      tabIndex: -1,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
      onClick: callAllHandlers(props.onClick, event => event.stopPropagation()),
    }),
    getDialogOverlayProps: (props: DialogOverlayProps = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, overlayRef),
      onClick: callAllHandlers(props.onClick, onOverlayClick),
      onKeyDown: callAllHandlers(props.onKeyDown, handleKeyDown),
      onMouseDown: callAllHandlers(props.onMouseDown, handleMouseDown),
    }),
  }
}

export type DialogHookReturn = ReturnType<typeof useDialog>

function useStackContext(ref: React.Ref<any>, isOpen?: boolean) {
  const { modals } = usePortalsContext()

  React.useEffect(() => {
    if (!isOpen) return
    modals?.add(ref)
    return () => {
      modals?.remove(ref)
    }
    //eslint-disable-next-line
  }, [isOpen, ref])

  return modals?.value
}
