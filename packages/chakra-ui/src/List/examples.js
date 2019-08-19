import React from "react";
import { storiesOf } from "@storybook/react";
import List from ".";

const stories = storiesOf("Lists", module);

stories.add("Unstyled Unordered List", () => (
  <List spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Inline List", () => (
  <List isInline spacing={5}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled Ordered List", () => (
  <List isOrdered styled spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled List", () => (
  <List styled>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

stories.add("Styled List with Spacing", () => (
  <List isInline showDivider spacing={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </List>
));

/* 
  <List type="ordered" spacing="12px" icon={FaCheck}>
    <ListItem icon={FaPhone}>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
  </List>
*/
