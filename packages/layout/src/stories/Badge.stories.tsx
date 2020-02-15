import { storiesOf } from "@storybook/react";
import React from "react";
import Badge from "../Badge";

const stories = storiesOf("Badge", module);

stories.add("basic", () => {
  return <Badge variantColor="green">Success</Badge>;
});

stories.add("Solid Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} variant="solid" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});

stories.add("Subtle Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});

stories.add("Outline Badges", () => {
  return (
    <React.Fragment>
      {["gray", "green", "red", "orange", "purple", "teal"].map(color => (
        <Badge variantColor={color} variant="outline" mr={2}>
          {color}
        </Badge>
      ))}
    </React.Fragment>
  );
});
