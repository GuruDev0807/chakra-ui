import React from "react"
import { Inline } from "../Inline"
import { createChakra } from "@chakra-ui/system"

export default {
  title: "Inline",
}

const Badge = createChakra("span", { themeKey: "Badge" })
Badge.defaultProps = {
  variant: "solid",
  variantColor: "blue",
}

export const basic = () => {
  return (
    <Inline spacing="40px">
      <Badge>Badge 1</Badge>
      <Badge>Badge 2</Badge>
      <Badge>Badge 3</Badge>
      <Badge>Badge 4</Badge>
    </Inline>
  )
}
const Placeholder = (props: any) => (
  <div
    style={{ height: 48, width: props.width || 48, background: "red" }}
    {...props}
  />
)

export const placeholder = () => {
  return (
    <Inline spacing={5}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Inline>
  )
}

export const responsive = () => {
  return (
    <Inline spacing={["12px", "24px"]} justify={["center", "flex-start"]}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </Inline>
  )
}
