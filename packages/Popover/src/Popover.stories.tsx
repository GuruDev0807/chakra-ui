import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  PopoverProvider,
  usePopoverContent,
  usePopoverTrigger,
  usePopoverState,
} from ".";
import { Portal } from "@chakra-ui/portal";
import setup from "../story.setup";

const stories = storiesOf("usePopover", module);

stories.addDecorator(setup);

function PopoverExample() {
  const popover = usePopoverState();
  const trigger = usePopoverTrigger();
  const content = usePopoverContent();

  return (
    <>
      <button {...trigger}>Open</button>
      <Portal>
        <div {...content}>
          This is the content <button onClick={popover.onClose}>Close</button>
        </div>
      </Portal>
    </>
  );
}

stories.add("Default", () => (
  <PopoverProvider placement="right">
    <PopoverExample />
  </PopoverProvider>
));
