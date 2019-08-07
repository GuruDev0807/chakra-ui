/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { useRef, useState } from "react";
import AlertDialog from ".";
import Button from "../Button";
import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader
} from "./components";

const stories = storiesOf("AlertDialog", module);

const SampleDialog = () => {
  const [open, setOpen] = useState();
  const close = () => setOpen(false);
  const cancelRef = useRef();

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Delete something</Button>
      <AlertDialog
        isOpen={open}
        leastDestructiveRef={cancelRef}
        onClose={close}
      >
        <AlertDialogHeader>Please Confirm!</AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to delete something? This action is permanent,
          and we're totally not just flipping a field called "deleted" to "true"
          in our database, we're actually deleting something.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={close}>
            Nevermind
          </Button>
          <Button color="red" onClick={close} ml={3}>
            Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
};

stories.add("Default", () => <SampleDialog />);
