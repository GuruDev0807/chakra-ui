import { Icon } from "@chakra-ui/icon"
import { chakra, createChakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import * as React from "react"
import { Spinner } from "@chakra-ui/spinner"

const BaseButton = createChakra("button", { themeKey: "Button" })

BaseButton.defaultProps = {
  variant: "solid",
  variantSize: "md",
  variantColor: "gray",
}

export interface ButtonOptions {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit"
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon?: React.ElementType
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: React.ElementType
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: SystemProps["margin"]
}

export type ButtonProps = Omit<PropsOf<typeof BaseButton>, "disabled"> &
  ButtonOptions

const Button = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const {
    isDisabled,
    isLoading,
    isActive,
    isFullWidth,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = 2,
    type = "button",
    ...rest
  } = props

  return (
    <BaseButton
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      ref={ref}
      type={type}
      width={isFullWidth ? "full" : undefined}
      data-active={isActive ? "" : undefined}
      data-loading={isLoading ? "" : undefined}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <Icon marginLeft={-1} marginRight={iconSpacing} as={leftIcon} />
      )}
      {isLoading && (
        <Spinner
          position={loadingText ? "relative" : "absolute"}
          marginRight={loadingText ? iconSpacing : 0}
          color="currentColor"
          size="1em"
        />
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0}>{children}</chakra.span>
        : children}
      {rightIcon && !isLoading && (
        <Icon marginRight={-1} marginLeft={iconSpacing} as={rightIcon} />
      )}
    </BaseButton>
  )
})

Button.displayName = "Button"

export default Button
