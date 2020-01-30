
import * as React from "react"
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";

const stories = storiesOf("Combobox", module);
stories.addDecorator(setup)

stories.add("default", ()=><div>Component goes here</div>)
