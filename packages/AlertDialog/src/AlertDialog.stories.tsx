import * as React from "react"
import { PortalManager } from "@chakra-ui/portal"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "."
import { createChakra } from "@chakra-ui/system"

export default {
  title: "AlertDialog",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

const Button = createChakra("button", { themeKey: "Button" })
Button.defaultProps = {
  variant: "solid",
  variantColor: "gray",
}

export const BasicUsage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef<any>()

  return (
    <>
      <Button onClick={onOpen}>Delete something</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Please Confirm!</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete something? This action is
              permanent, and we're totally not just flipping a field called
              "deleted" to "true" in our database, we're actually deleting
              something.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Nevermind
              </Button>
              <Button variantColor="red" ml={3}>
                Yes, delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
