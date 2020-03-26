import React from "react"
import { chakra, PropsOf, ChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: ChakraProps["alignItems"]
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: ChakraProps["justifyContent"]
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: ChakraProps["flexWrap"]
  /**
   * Shorthand for `flexDirection` style prop
   */
  direction?: ChakraProps["flexDirection"]
  /**
   * Shorthand for `flexBasis` style prop
   */
  basis?: ChakraProps["flexBasis"]
  /**
   * Shorthand for `flexGrow` style prop
   */
  grow?: ChakraProps["flexGrow"]
  /**
   * Shorthand for `flexShrink` style prop
   */
  shrink?: ChakraProps["flexShrink"]
}

export type FlexProps = PropsOf<typeof chakra.div> & FlexOptions

export function Flex(props: FlexProps) {
  const { direction, align, justify, wrap, basis, grow, ...rest } = props
  return (
    <chakra.div
      display={"flex"}
      flexDirection={props.direction}
      alignItems={props.align}
      justifyContent={props.justify}
      flexWrap={props.wrap}
      flexBasis={props.basis}
      flexGrow={props.grow}
      {...rest}
    />
  )
}

if (__DEV__) {
  Flex.displayName = "Flex"
}
