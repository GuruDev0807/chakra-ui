# Accordion

# Migration Notes

## Changes

- We've changed `AccordionHeader` to `AccordionButton`. This is to remove the
  notion that it's a header when it's actually a `button`.

  WAI-ARIA guidelines require that accordion buttons be wrapped in the
  appropriate heading tag `h2-h6`. We think `AccordionHeader` might mislead
  users in thinking we handle this out of the box when we don't.

- You can no longer use `AccordionItem` in isolation, it must be used within
  `Accordion`. We think most users don't do this by default but it's worth
  noting.

## Features

- Keyboard Navigation: Accordion now support keyboard navigation between
  accordion buttons. Pressing the up and down arrow keys will move focus between
  each button.

# Avatar

# Migration Notes

## Improvements

- AvatarGroup now stacks each avatar without using `z-index`. As much as
  possible, we'll like to do away with zIndex.

- You can now use your custom fallback avatar svg. Simply pass `fallbackAvatar`
  prop

- Cleaner DOM output

- You can now change the `borderRadius` of the avatar. No longer constrained to
  circular avatars.

- Theming Support: All design related decisions for the Avatar are located in
  `theme.componenents.Avatar`. this means you can customize to suit your brand
  needs.

- Added `getInitials` prop to allow users manage how initials are generated from
  name

# Breadcrumb

# Migration Notes

## Changes

- Remove support for `addSeparator` prop to reduce API surface area
- Change `separator` prop accept `string` or `React.ReactElement`

# Button

# Migration Notes

## Changes

- Ensure consistent usage of the `icon` prop. `leftIcon` and `rightIcon` props
  are now accepts a react element not react element type.

  Here's what I mean

  ```tsx
  // before
  const Before = () => <Button leftIcon={PhoneIcon}>Call</Button>

  // after
  const After = () => <Button leftIcon={<PhoneIcon />}>Call</Button>
  ```

- Change `variantColor` prop to `colorScheme` for better intuitiveness.

## New Features

- Add support for `spinner` prop to allow you render custom spinners.

```jsx
<Button
  isLoading
  colorScheme="blue"
  spinner={<BeatLoader size={8} color="white" />}
>
  Click me
</Button>
```

# Checkbox

# Migration Notes

## Changes

- Support for the `variantColor` prop has been deprecated. Use `colorScheme`
  prop instead.

```jsx
// before
<Checkbox variantColor="blue">Option</Checkbox>

// after
<Checkbox colorScheme="blue">Option</Checkbox>
```

- Support for the `isFullWidth` prop has been deprecated. The Checkbox takes up
  the width of the parent by default.

  To allow for better layout composition, the `CheckboxGroup` component no
  longer supports the any style prop.

  You can only pass `size`, `variant`, and `colorScheme` in addition to typical
  group props which are used to control the states of the checkbox.

```jsx
// before
<CheckboxGroup isInline spacing="40px" defaultValue={["one", "two"]}>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
</CheckboxGroup>

// after
<CheckboxGroup defaultValue={["one", "two"]}>
  <HStack spacing="40px">
    <Checkbox value="one">One</Checkbox>
    <Checkbox value="two">Two</Checkbox>
    <Checkbox value="three">Three</Checkbox>
  </HStack>
</CheckboxGroup>
```

We believe a checkbox group's layout should be managed 100% by the context it's
used it, or based on design requirements. The group can stacked (`Stack`),
placed in a grid (`SimpleGrid`) or made to wrap automatically (`Wrap`).

## Features

- Support for `iconColor` prop to customize the color of the check icon

```jsx
<Checkbox iconColor="blue">Option</Checkbox>
```

- Support for `iconSize` prop to customize the size of the check icon

```jsx
<Checkbox iconSize="1rem">Option</Checkbox>
```

- Support for `labelSpacing` prop to customize the spacing between the checkbox
  and label text

```jsx
<Checkbox labelSpacing="1rem">Option</Checkbox>
```

- The `useCheckbox` hook is exported with state and focus management logic for
  use in creating tailor-made checkbox component for your application

* The `useCheckboxGroup` hook is exported with state management logic for use in
  creating tailor-made checkbox group component for your application

# ColorMode

# Migration Notes

We've updated the color mode to support the following scenatios

1. Ability to start with dark mode by default, but also want users to toggle it.
   To support this, add `theme.config.initialColorMode` to the theme.

```jsx
const theme = {
  config: {
    initialColorMode: "dark", // "light" | "dark"
  },
}
```

> NB: For this to work correctly, ensure you don't have `chakra-ui-color-mode`
> set in the your `localStorage`.
>
> We use `localStorage` as the source of truth and use the `initialColorMode`
> value when the value doesn't exist in `localStorage`

2. Ability to lock color mode in certain aspects of UI, this doesn't change

```jsx
import { DarkMode, LightMode } from "@chakra-ui/color-mode"

// Here, the button is locked to dark mode and can't be changed
function Example() {
  return (
    <DarkMode>
      <Button>Click me</Button>
    </DarkMode>
  )
}
```

3. Ability to use system color mode preference. To support this, add
   `theme.config.useSystemColorMode`. This also updates the color mode whenever
   user changes this preference from their OS.

```jsx
const theme = {
  config: {
    useSystemColorMode: true,
  },
}
```

## Fixes

- Color mode now persists correctly when you refresh the page. All you need to
  do is to add `InitialColorMode` script as the first child in of `body`.

Here's an example with Next.js

```jsx
// pages/_app.js
export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Here's the script 👇  */}
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

# CSSReset

# Migration Notes

## Changes

- Add `focus-visible` support to CSS Reset. All you need to do is to install
  `focus-visible` and import it at the root of your application

```sh
# as a dependency
yarn add focus-visible

# at the root of your application
import "focus-visible/dist/focus-visible"
```

## Notes on using focus visible

Removing focus styles for mouse interactions might have negative impacts on
users with with low vision or cognitive impairments.

https://github.com/WICG/focus-visible/issues/128

# FormControl

# Migration Notes

## Changes

- `FormControl` now exposes most of it's internal functions and hooks so you can
  leverage in building custom components.

- Now export `useFormControl`, the hook you can consume in any custom form
  elements you build.

- We've improved the accessibility of the `FormControl` component. Here are the
  changes:

  - `id` passed to the form control will be passed to the form input directly
  - `FormLabel` will have `htmlFor` that points to the `id` of the form input
  - If you render `FormErrorMessage`, it'll add `aria-describedby` and
    `aria-invalid` to the form input.
  - If you render `FormHelperText`, it'll add/extend `aria-describedby` to the
    form input.
  - If you add the `isDisabled`, `isRequired`, `isReadOnly` prop to
    `FormControl`, it'll cascade across all components

- `FormLabel` are now aware of the `disabled`, `focused` and `error` state of
  the form input, this helps you style the label accordingly using using
  `_disabled`, `_focus`, and `_invalid` style props.

- If you render `FormErrorMessage`, and `isInvalid` is false or undefined, the
  `FormErrorMessage` won't be visible, the only way to make it visible is by
  passing `isInvalid` and setting it to `true`

# Image

# Fixes

- Resolved the common SSR issue with Next.js

# Features

- Support for `fit` prop to specify how to fit an image within it's dimension.
  It uses the `object-fit` property

- Support for `align` prop to specify how to align the image within it's
  dimension. It uses the `object-position` property

- Support for custom `fallback` component

# TBD

- Support for fade-in or blur-in entrace animation for image?

- Support for Modern image formats?

# Input

# Migration Notes

- When using `InputElement`, You no longer need to pass any padding properties
  to the `Input`, `InputGroup` will smartly measure and apply the necessary
  padding.

- When using `InputAddon`, you no longer need to pass border radius properties
  to the `Input`, `InputGroup` will smartly detect the addon and apply the
  necessary border to the input.

- `Input` and `InputAddon` styles/variants can be changed globally from the
  theme.

- Input now has BEM structured `className` attached to the DOM nodes to make it
  easier to spot the components in the "inspector" .

- Input now uses `paddingY` instead of `height` for it's block height

# Layout

# Migration Notes

## Changes

- Support for `size` has been deprecated. Use `boxSize` prop. We've reserved the
  `size` prop to refer to component size variants.

For example, `<Button size="md">Click</Button>`

```jsx
// before
<Box size="40px" />

// after
<chakra.div boxSize="40px"/>
```

- Addition of chakra jsx elements to make it even easier to style components
  without having to use the `as` prop in Box

```jsx
// before
<Box as="h2" fontSize="40px" />

// after
<chakra.h2 fontSize="40px"/>

// still want Box? No problem!
const Box = chakra.div

<Box>This is your box</Box>
```

- [Link] Due to accessibility reasons, We're deprecating the `isDisabled` prop
  from link. A link should never be allowed to be disabled.

- [Stack] To reduce the API surface, we're deprecating the `isInline` and
  `isReversed` prop in favor of `direction` prop

- [Stack] We're deprecating support for `shouldWrapChildren` prop because we now
  use css to manage the stack rather than `React.cloneElement`. Thanks to
  [https://github.com/chakra-ui/chakra-ui/pull/277]

- [Stack] We're constrained Stack's direction to only `row` and `column`.
  Support for reversing the direction is no longer available.

- New components ✨: We've added new layout components such as Wrap, Spacer, and
  Center.

- AspectRatioBox now renamed to just `AspectRatio` to keep it concise

- All components can now take the pseudo style props (`_hover`, `_active`, etc.)

## Features

Stack

- Support for responsive `direction` and `spacing` prop

```jsx
// before
// how the heck do I make this responsive ?? 😡
<Stack isInline>
  <Box />
  <Box />
</Stack>

// after
// cool! now that's amazing 🤩
<Stack direction={["column", "row"]}>
  <Box />
  <Box />
</Stack>
```

- Support for `divider` prop between stacked element. Dividers also work with
  responsive direction and spacing.

```jsx
// before
// how the heck do I add a divider ?? 😡
<Stack isInline>
  <Box />
  <Divider />
  <Box />
</Stack>

// after
// cool! now that's amazing 🤩
<Stack divider={<StackDivider />}>
  <Box />
  <Box />
</Stack>
```

# Menu

# Migration Notes

## New Features ⚡️

Added support for nested menus or submenus

```jsx
const PreferencesMenu = forwardRef((props, ref) => {
  return (
    <Menu>
      <MenuButton ref={ref} {...props}>
        Preferences
      </MenuButton>
      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem isDisabled>Extensions</MenuItem>
        <MenuSeparator />
        <MenuItem>Keyboard shortcuts</MenuItem>
      </MenuList>
    </Menu>
  )
})

function Example() {
  return (
    <Menu>
      <MenuButton>Code</MenuButton>
      <MenuList>
        <MenuItem>About Visual Studio Code</MenuItem>
        <MenuItem>Check for Updates...</MenuItem>
        <MenuSeparator />
        <MenuItem as={PreferencesMenu} />
      </MenuList>
    </Menu>
  )
}
```

Support for menu icons and commands (or hotkeys

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <MenuList>
    <MenuItem command="⌘T">New Tab</MenuItem>
    <MenuItem command="⌘N">New Window</MenuItem>
    <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
    <MenuItem command="⌘O">Open File...</MenuItem>
  </MenuList>
</Menu>
```

Support for menu transitions and animations

> It's important to use the `css` or `sx` prop for the transitions to work
> properly. For some reason, it doesn't work with the `style` native prop

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <MenuTransition>
    {styles => (
      <MenuList css={styles}>
        <MenuItem command="⌘T">New Tab</MenuItem>
        <MenuItem command="⌘N">New Window</MenuItem>
        <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
        <MenuItem command="⌘O">Open File...</MenuItem>
      </MenuList>
    )}
  </MenuTransition>
</Menu>
```

Added support for Portals. Just wrap the `MenuList` in the `Portal` component
and you're good to go!

```jsx
<Menu>
  <MenuButton size="sm" colorScheme="teal">
    Open menu
  </MenuButton>
  <Portal>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem>Open Closed Tab</MenuItem>
      <MenuItem>Open File</MenuItem>
    </MenuList>
  </Portal>
</Menu>
```

Moved to Popper V2 🥳

## Bug Fixes

- Fixed issue with `as` prop for `MenuItem`

- Fixed issue with Link not navigating to the specified `href` value

- Fixed issue where menu popper gets cut off when component is far right

- Fixed issue where Menu throws if no `MenuItem` exist

- Fixed issue where `closeOnSelect` doesn't work on navigation with when using
  `MenuItem` as link

# Modal

# Migration Notes

## Changes

- Removed support for `addAriaLabels` and `formatIds` prop in favor of passing a
  top-level `id` prop to the modal, and we'll handle the rest.

- Removed support for `preserveScrollBarGap` prop, we now set it to `true` by
  default to prevent any layout shift due to the scroll lock.

- You need to wrap the `ModalContent` within the `ModalOverlay` component. This
  helps to make the final DOM structure of the modal component cleaner.

```jsx
// before
<Modal>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal header</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Modal body</ModalBody>
    <ModalFooter>Modal footer</ModalFooter>
  </ModalContent>
</Modal>

// after
<Modal>
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>Modal header</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Modal body</ModalBody>
      <ModalFooter>Modal footer</ModalFooter>
    </ModalContent>
  </ModalOverlay>
</Modal>
```

- You only pass `size` values defined in the component's theme. Hard-coded
  values, will be ignored. Simply update the styles in `theme.components.Modal`
  to reflect your custom values

- Ability to disable focus trap

## Props Changes

We updated the prop names for boolean props to match our naming convention. All
boolean prop must start with `should`, `is`, or `has`

| Old Prop              | New Prop                    |
| --------------------- | --------------------------- |
| `returnFocusOnClose`  | `shouldReturnFocus`         |
| `closeOnOverlayClick` | `shouldCloseOnOverlayClick` |
| `blockScrollOnMount`  | `shouldBlockScroll`         |
| `closeOnEsc`          | `shouldCloseOnEsc`          |

## New Props

- `shouldTrapFocus` : to help disable focus trap
- `shouldAutoFocus` : to help disable auto focusing on the first interactive
  element.
- `onOverlayClick`: callback fired when the overlay is clicked
- `onEsc`: callback fired when `esc` is pressed

# NumberInput

# Migration Notes

## Improvements 🚀

- Fixed issue where an error if the input value is greater than the `max` prop
  when focus is blurred `#584`

- Fixed issue where deleting sole digit sets value to 0 (which may be invalid)
  `#533`

- Fixed issue where input returns `NaN` value after multiple dots `#364`

- Fixed issue where passing `id` to the `NumberInput` and adding a `label` with
  `htmlFor` that points to that `id` doesn't focus the input `#515`

- Add example where consumers can format and parse number input values `#438`

## New ✨

- Export `useNumberInput` so you can build custom numberinput UI

# Portal

# Migration Notes

## Changes

- Now have a `PortalManager`, we use this portal manager a container for all
  portals. This helps us manage the stacking of portaled elements without the
  need for z-index.

- Removed `isDisabled` prop. If you want to use a Portal, then there's no point
  having this prop. Can be replaced within your component with this.

  ```jsx
  const Component = prop.isDisabled ? React.Fragment : Portal
  ```

- Added `onMount` and `onUnmount` callbacks

- `container` prop is now a function that returns an `HTMLElement`

# Progress

# Migration Notes

## Changes

- The `Progress` and `CircularProgress` components are now under the same
  package.

```jsx
import {
  Progress,
  ProgressLabel
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/progress"
```

- Support for `color` prop has been deprecated. Use `colorScheme` prop instead.

For example, `<Progress colorScheme="blue"/>`

```jsx
// before
<Progress color="blue"/>

// after
<Progress colorScheme="blue"/>
```

- Added Support for `isIndeterminate` prop in the `Progress` component

### CircularProgress

- `trackColor` prop now takes a specific color in theme or valid `css` color.
  This means you're now in full control of the styles.

Use the `useColorModeValue` hook to change the `trackColor` and `color` based on
color mode.

- `thickness` props now takes the actual thickness of the progress bar, not the
  thickness ratio.

# Radio

# Migration Notes

## Changes

Radio

- Support for the `variantColor` prop has been deprecated. Use `colorScheme`
  prop instead.

For example, `<Radio colorScheme="blue">Option</Radio>`

```jsx
// before
<Radio variantColor="blue">Option</Radio>

// after
<Radio colorScheme="blue">Option</Radio>
```

- Support for the `isFullWidth` prop has been deprecated. The Radio takes up the
  width of the parent by default.

RadioGroup

- To reduce the API surface, we're deprecating the `isInline` prop in favor of
  `direction` prop for the orientation of the Radio group

- The `direction` prop takes either `row` or `column` orientation.

```jsx
// before
<RadioGroup isInline defaultValue="one">
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>

// after
<RadioGroup direction="row" defaultValue="one">
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>
```

## Features

Radio

- The `useRadio` hook is exported with state and focus management logic for use
  in creating tailor-made radio component for your application

RadioGroup

- Support for `spacing` prop to customize the space between the children radios

```jsx
<RadioGroup spacing={6} defaultValue="one">
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>
```

- Support for responsive `direction` and `spacing` props. This allows the group
  of children radios to wrap around the parent element automagically.

```jsx
<RadioGroup
  spacing={[2, 4, 6]}
  defaultValue="one"
  direction={["column", "row"]}
  onChange={value => console.log(value)}
>
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
  <Radio value="four">Four</Radio>
</RadioGroup>
```

- The `useRadioGroup` hook is exported with state management logic for use in
  creating tailor-made radio group component for your application

# Slider

# Migration Notes

## Changes

- We've a minor update to the structure of the slider markup. Since the filled
  track is considered visually to be inside the track, we tried to update the
  markup to also depict that.

```jsx
// before
<Slider defaultValue={30}>
  <SliderTrack />
  <SliderFilledTrack />
  <SliderThumb />
</Slider>

// after
<Slider defaultValue={30}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

- Added support for `isReversed`, which allows users reverse the direction and
  functionality of the slider. This is mostly useful for `rtl` purposes.

- Added support for `onChangeEnd`, dragging the slider can trigger lots of
  updates and user might only be interested in the final result after sliding is
  complete.

- Added `isReadOnly` prop to support cases where slider needs to be in read-only
  state.

- Export the `useSlider` hook to help users manage and build custom slider UIs

# Popover

# Migration Notes

## Changes

- `returnFocusOnClose` has been changed to just `returnFocus` to keep it
  concise.

- `autoFocus` prop to allow users control whether the popover should
  automatically receive focus when it opens.

# Stat

# Migration Notes

## Changes

- We improved the semantic HTML structure of the Stat components to use `dl`,
  `dd`, and `dt` tags.

- We added theming support for the Stat components.

# Switch

# Migration Notes

## Changes

- Support for the `color` prop has been deprecated. Use `colorScheme` prop
  instead.

For example, `<Switch colorScheme="blue"/>`

```jsx
// before
<Switch color="blue"/>

// after
<Switch colorScheme="blue"/>
```

# System

# Migration Notes

This is a new package that forms the foundation of all chakra components.

## Custom styled implementation

You can create chakra's enhanced components in 2 ways:

1.  Use the chakra element syntax (It's the easy to avoid naming components.
    Lol). Components create this way:
    - Provides a simple syntax that reduces the need to use the `as` prop.
    - Allow you map styles defined in `theme.styles.[element]` to
      `chakra.[element]` components

```jsx
<chakra.button bg="red.200" _hover={{ bg: "red.300" }}>
  Click me
</chakra.button>
```

2. Use the chakra factory method. This approach is more powerful and can be used
   to create custom themed components on the fly. Components created this way
   can:
   - Have base or default styles applied automatically
   - Link to styles in theme object (following our component theming convention)
   - Create variants, sizes, and color schemes right away

```jsx
const Button = chakra.button("button", {
  // define base styles
  baseStyle: {
    display: "flex",
    border: "0",
  },
  // define button sizes
  sizes: {
    small: {
      padding: "8px",
      fontSize: "12px",
    },
    medium: {
      padding: "24px",
      fontSize: "16px",
    },
    large: {
      padding: "40px",
      fontSize: "32px",
    },
  },
})

// this will have baseStyle + sizes.small styles
<Button size="small">Click me</Button>
```

## Theme Configurations

```jsx
const theme = {
  config: {
    // if not using system color mode, what mode should app start with
    initialColorMode: "light", // "light" | "dark"
    // whether to use the system color mode by default
    useSystemColorMode: false, // true | false
    // whether to automatically map styles defined in theme.styles.[element] to chakra.[element]
    shouldMapStylesToElement: false, // true | false
  },
}
```

# Tabs

# Migration Notes

- We have renamed the `variantColor` prop to `colorScheme`

- Added `useTabIndicator` to help users build animated active tab indicators

# Tags

# Migration Notes

## Changes

- Support for the `variantColor` prop has been deprecated. Use `colorScheme`
  prop instead.

For example, `<Tag colorScheme="blue"/>`

```jsx
// before
<Tag variantColor="blue"/>

// after
<Tag colorScheme="blue"/>
```

- Support for the `isDisabled` prop for the TagCloseButton

```jsx
<Tag variant="solid" size="sm" colorScheme="cyan">
  <TagLabel>Tab Label</TagLabel>
  <TagCloseButton isDisabled={true} />
</Tag>
```

# Textarea

# Migration Notes

## Fixes

- We've fixed the typings for the Textarea component, it now supports `rows` and
  `cols` and any other native `textarea` prop.

# Toast

# Migration Notes

There are no breaking changes to the Toast component but we've improved a couple
of things

- Removed `react-spring` as dependency in favor of `react-transition-group`
- Add support for duplicate toast prevention using `toast.isActive` method
- Add support to programmatically close one to all toasts using `toast.close` or
  `toast.closeAll` methods
- Add support to programmatically update a toast using `toast.update` method.
- Add Support for `onCloseComplete` prop, a callback function to run side
  effects after the toast component has closed.

# Tooltip

# Migration Notes

## Changes

- Added support for `hideOnClick` prop
- Added support for `hideOnMouseDown` prop
- Improved tooltip rendering logic

# VisuallyHidden

# Migration Notes

## Features

- `VisuallyHidden` now supports the `as` prop and can infer the types from the
  element type passed.

- We now export `VisuallyHiddenInput` to provider full TS types for hidden input
  types, we noticed this is a common pattern

- We also export the `visuallyHiddenStyle` in case you need it in any scenario
  not covered by `VisuallyHidden`

- Added some test ✨
