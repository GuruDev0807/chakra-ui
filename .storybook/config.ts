import { configure } from "@storybook/react";

const req = require.context(
  `../packages/Avatar/src/`,
  true,
  /.stories\.(ts|tsx)$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
