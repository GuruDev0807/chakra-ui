/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import List from "../List";
import Tag, { TagLabel, TagLeftAddon, TagRightAddon, TagCloseButton } from ".";
import Icon from "../Icon";
import Avatar from "../Avatar";

const stories = storiesOf("Tag", module);

stories.add("Default", () => {
  return (
    <List spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="gray">
          <TagLabel>Gray</TagLabel>
        </Tag>
      ))}
    </List>
  );
});

stories.add("with left icon", () => {
  return (
    <List spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="cyan">
          <TagLeftAddon>
            <Icon name="add" size="12px" />
          </TagLeftAddon>
          <TagLabel>Green</TagLabel>
        </Tag>
      ))}
    </List>
  );
});

stories.add("with right icon", () => {
  return (
    <List spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="cyan">
          <TagLabel>Green</TagLabel>
          <TagRightAddon>
            <Icon name="check" size="12px" />
          </TagRightAddon>
        </Tag>
      ))}
    </List>
  );
});

stories.add("with close button", () => {
  return (
    <List spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} rounded="full" variant="solid" color="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </List>
  );
});

stories.add("with custom element", () => {
  return (
    <List spacing={4} inline>
      <Tag color="red" rounded="full">
        <TagLeftAddon>
          <Avatar
            src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
            size="xs"
            name="Segun Adebayo"
          />
        </TagLeftAddon>
        <TagLabel>Segun</TagLabel>
      </Tag>
    </List>
  );
});
