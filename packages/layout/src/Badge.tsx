import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export type BadgeProps = PropsOf<typeof Badge>

/**
 * Badge
 *
 * Mostly used to add notifications,messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
export const Badge = chakra("span", {
  themeKey: "Badge",
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "top",
  },
})

if (__DEV__) {
  Badge.displayName = "Badge"
}
