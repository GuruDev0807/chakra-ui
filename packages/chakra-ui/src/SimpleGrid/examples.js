/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import SimpleGrid from ".";

const stories = storiesOf("SimpleGrid", module);

stories.add("with columns", () => (
  <SimpleGrid columns={[2, null, 3]} spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));

stories.add("with autofit and min child width", () => (
  <SimpleGrid minChildWidth="300px" spacing="40px">
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
    <Box bg="tomato" height="200px"></Box>
  </SimpleGrid>
));
