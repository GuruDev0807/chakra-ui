import * as React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ArrowBackIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      />
    </Icon>
  )
}
