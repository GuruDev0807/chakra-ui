import {
  chakra,
  PropsOf,
  SystemProps,
  ChakraComponent,
} from "@chakra-ui/system"
import {
  createContext,
  cx,
  mergeRefs,
  __DEV__,
  ReactNodeOrRenderProp,
} from "@chakra-ui/utils"
import * as React from "react"
import { forwardRef, isValidElement, cloneElement, Children } from "react"
import {
  useMenu,
  useMenuButton,
  useMenuItem,
  UseMenuItemProps,
  useMenuList,
  useMenuOption,
  useMenuOptionGroup,
  UseMenuOptionGroupProps,
  UseMenuOptionProps,
  UseMenuProps,
  UseMenuReturn,
} from "./Menu.hook"

const [MenuContextProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: false,
  name: "MenuContext",
})

export { useMenuContext }

//////////////////////////////////////////////////////////////////////////

export function useMenuState() {
  const { isOpen, onClose } = useMenuContext()
  return { isOpen, onClose }
}

//////////////////////////////////////////////////////////////////////////

export type MenuProps = Omit<UseMenuProps, "context"> & {
  children: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}

/**
 * The wrapper component that provides context, state, and focus
 * management to its sub-components.
 *
 * It doesn't render any DOM node.
 */
export function Menu(props: MenuProps) {
  const parentCtx = useMenuContext()
  const context = useMenu({ context: parentCtx, ...props })
  return (
    <MenuContextProvider value={context}>
      {typeof props.children === "function"
        ? props.children({ isOpen: context.isOpen, onClose: context.onClose })
        : props.children}
    </MenuContextProvider>
  )
}

if (__DEV__) {
  Menu.displayName = "Menu"
}

//////////////////////////////////////////////////////////////////////////

export type MenuButtonProps = PropsOf<typeof StyledMenuButton> & {
  submenuIcon?: React.ReactElement
}

/**
 * MenuButton - Theming
 *
 * To style the sizes and variants of the MenuButton,
 * Change the styles in `theme.components.Menu` under the `MenuButton`
 */
const StyledMenuButton = chakra("button", {
  themeKey: "Menu.MenuButton",
  baseStyle: {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    outline: 0,
    transition: "all 250ms",
  },
  pure: true,
})

const SubmenuSvg = (props: PropsOf<"svg">) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1.2em"
    width="1.2em"
    {...props}
  >
    <path d="M192 128l128 128-128 128z" />
  </svg>
)

/**
 * The trigger for the menu list. Must be a direct child of `Menu`.
 */
export const MenuButton = forwardRef(
  (props: MenuButtonProps, ref: React.Ref<any>) => {
    const { children, submenuIcon = <SubmenuSvg />, ...rest } = props

    const context = useMenuContext()

    const ownProps = useMenuButton({ context, ...rest })
    const ownRef = mergeRefs(ref, ownProps.ref)

    const isSubmenu = context.hasParentMenu

    const Comp = isSubmenu ? StyledMenuItem : StyledMenuButton

    const getChildren = () => {
      if (!isSubmenu) return props.children

      return (
        <React.Fragment>
          <chakra.span flex="1">{props.children}</chakra.span>
          <MenuIcon mr="-0.5rem" children={submenuIcon} />
        </React.Fragment>
      )
    }

    return (
      <Comp {...ownProps} ref={ownRef}>
        {getChildren()}
      </Comp>
    )
  },
)

if (__DEV__) {
  MenuButton.displayName = "MenuButton"
}

//////////////////////////////////////////////////////////////////////////

export type MenuListProps = PropsOf<typeof StyledMenuList>

const StyledMenuList = chakra("div", {
  themeKey: "Menu.MenuList",
  pure: true,
})

export const MenuList = forwardRef(
  (props: MenuListProps, ref: React.Ref<any>) => {
    const context = useMenuContext()
    const ownProps = useMenuList({ context, ...props })
    const ownRef = mergeRefs(ownProps.ref, ref)

    return <StyledMenuList {...ownProps} ref={ownRef} />
  },
)

if (__DEV__) {
  MenuList.displayName = "MenuList"
}

//////////////////////////////////////////////////////////////////////////

const StyledMenuItem = chakra("button", {
  themeKey: "Menu.MenuItem",
  baseStyle: {
    color: "inherit",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    flex: "0 0 auto",
  },
  pure: true,
})

interface MenuItemOptions extends Omit<UseMenuItemProps, "context"> {
  /**
   * The icon to render before the menu item's label.
   */
  icon?: React.ReactElement
  /**
   * The spacing between the icon and menu item's label
   */
  iconSpacing?: SystemProps["mr"]
  /**
   * Right-aligned label text content, useful for displaying hotkeys.
   */
  command?: string
}

export type MenuItemProps = PropsOf<typeof StyledMenuItem> & MenuItemOptions

export const MenuItem = forwardRef(
  (props: MenuItemProps, ref: React.Ref<any>) => {
    const {
      icon,
      iconSpacing = "0.75rem",
      command,
      children,
      ...htmlProps
    } = props

    const context = useMenuContext()

    const ownProps = useMenuItem({ context, ...htmlProps })
    const ownRef = mergeRefs(ownProps.ref, ref)

    const shouldWrapInSpan = icon || command
    const _children = shouldWrapInSpan ? (
      <chakra.span flex="1">{children}</chakra.span>
    ) : (
      children
    )

    return (
      <StyledMenuItem {...ownProps} ref={ownRef}>
        {icon && <MenuIcon fontSize="0.8em" mr={iconSpacing} children={icon} />}
        {_children}
        {command && <MenuItemCommand children={command} />}
      </StyledMenuItem>
    )
  },
) as ChakraComponent<"button", MenuItemOptions>

if (__DEV__) {
  MenuItem.displayName = "MenuItem"
}

//////////////////////////////////////////////////////////////////////////

export type MenuItemOptionProps = Omit<UseMenuOptionProps, "context"> &
  PropsOf<typeof StyledMenuItem> & {
    icon?: React.ReactElement
    iconSpacing?: SystemProps["mr"]
  }

const CheckIcon = (props: PropsOf<"svg">) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export const MenuItemOption = forwardRef(
  (props: MenuItemOptionProps, ref: React.Ref<any>) => {
    const {
      icon = <CheckIcon />,
      iconSpacing = "0.75rem",
      ...htmlProps
    } = props

    const context = useMenuContext()
    const ownProps = useMenuOption({ context, ...htmlProps })

    const ownRef = mergeRefs(ownProps.ref, ref)

    return (
      <StyledMenuItem {...ownProps} ref={ownRef}>
        <MenuIcon
          fontSize="0.8em"
          children={icon}
          mr={iconSpacing}
          visibility={props.isChecked ? "visible" : "hidden"}
        />
        <chakra.span flex="1">{ownProps.children}</chakra.span>
      </StyledMenuItem>
    )
  },
)

if (__DEV__) {
  MenuItemOption.displayName = "MenuItemOption"
}

//////////////////////////////////////////////////////////////////////////

export type MenuOptionGroupProps = UseMenuOptionGroupProps &
  Omit<MenuGroupProps, "value" | "default" | "onChange">

export const MenuOptionGroup = (props: MenuOptionGroupProps) => {
  const { children, ...rest } = useMenuOptionGroup(props)
  return <MenuGroup title={props.title} children={children} {...rest} />
}

if (__DEV__) {
  MenuOptionGroup.displayName = "MenuOptionGroup"
}

//////////////////////////////////////////////////////////////////////////

const StyledTitle = chakra("p", {
  themeKey: "Menu.MenuGroupTitle",
  pure: true,
})

export type MenuGroupProps = PropsOf<typeof StyledTitle>

export const MenuGroup = (props: MenuGroupProps) => {
  const { title, children, className, ...rest } = props

  const _className = cx("chakra-menu__group__title", className)

  return (
    <chakra.div className="chakra-menu__group" role="group">
      {title && (
        <StyledTitle className={_className} {...rest}>
          {title}
        </StyledTitle>
      )}
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}

//////////////////////////////////////////////////////////////////////////

export const MenuItemCommand = chakra("span", {
  baseStyle: { opacity: 0.6 },
  attrs: { className: "chakra-menu__command" },
  pure: true,
})

if (__DEV__) {
  MenuItemCommand.displayName = "MenuItemCommand"
}

//////////////////////////////////////////////////////////////////////////

export const MenuIcon = (props: PropsOf<typeof chakra.div>) => {
  const { className, children, ...rest } = props

  const child = Children.only(children)

  const clone = isValidElement(child)
    ? cloneElement(child, {
        focusable: "false",
        "aria-hidden": true,
        className: cx("chakra-menu__icon", child.props.className),
      })
    : null

  const _className = cx("chakra-menu__icon-wrapper", className)

  return (
    <chakra.span flexShrink={0} className={_className} {...rest}>
      {clone}
    </chakra.span>
  )
}

if (__DEV__) {
  MenuIcon.displayName = "MenuIcon"
}

//////////////////////////////////////////////////////////////////////////

const StyledDivider = chakra("hr", {
  themeKey: "Menu.MenuDivider",
  baseStyle: {
    border: 0,
    borderBottom: "1px solid",
    borderColor: "inherit",
    marginTop: "0.5rem",
    marginBottom: "1rem",
    opacity: 0.6,
  },
  attrs: {
    role: "separator",
    "aria-orientation": "horizontal",
  },
})

export type MenuDividerProps = PropsOf<typeof StyledDivider>

export const MenuDivider = (props: MenuDividerProps) => {
  const { className, ...rest } = props
  const _className = cx("chakra-menu__divider", className)
  return <StyledDivider className={_className} {...rest} />
}

if (__DEV__) {
  MenuDivider.displayName = "MenuDivider"
}
