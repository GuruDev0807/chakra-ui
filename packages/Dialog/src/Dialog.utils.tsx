import * as React from "react"
import { usePortalsContext } from "@chakra-ui/portal"

interface OutsideClickOptions {
  ref: React.RefObject<HTMLElement>
  overlayRef: React.RefObject<HTMLElement>
  dialogs: React.RefObject<HTMLElement>[]
  callback: (event: MouseEvent) => void
  enabled: boolean
}

export function useOutsideClick({
  ref,
  overlayRef,
  dialogs,
  callback,
  enabled,
}: OutsideClickOptions) {
  React.useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref.current || !enabled) return

      const eventTarget = event.target as HTMLElement
      const isContained = ref.current.contains(eventTarget)
      const lastDialog = dialogs[dialogs.length - 1]

      console.log({ isContained, lastDialog, ref })

      if (!isContained && lastDialog?.current === ref.current) {
        // Without this fix, the modal closes when you start dragging from
        // the content and release drag outside the modal. I think this is related to focus-lock's injected nodes
        // Here, we're checking if the outside target is the overlay. It usually either
        // the overlay or a focus-lock node
        callback?.(event)
        // if (eventTarget === overlayRef.current) {
        // }
      }
    }
    document.addEventListener("click", handler)
    return () => {
      document.removeEventListener("click", handler)
    }
  }, [dialogs, callback, ref, enabled, overlayRef])
}

export function useStackContext(ref: React.Ref<any>, isOpen?: boolean) {
  const { modals } = usePortalsContext()

  React.useEffect(() => {
    if (!isOpen) return
    modals.add(ref)
    return () => {
      modals.remove(ref)
    }
    //eslint-disable-next-line
  }, [isOpen, ref])

  return modals.value
}
