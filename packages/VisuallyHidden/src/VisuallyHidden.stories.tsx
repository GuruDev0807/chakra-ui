import { PropsOf } from "@chakra-ui/system"
import React from "react"
import { VisuallyHidden } from "./VisuallyHidden"

export default {
  title: "Visually Hidden",
}

export const Basic = () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
)

type InputProps = PropsOf<"input">
