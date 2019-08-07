/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Popper } from "react-popper";
import { Box } from "../Layout";
import { assignRef } from "../utils";
import { useMenuContext } from "./MenuContext";

export const MenuList = props => {
  const {
    state: { index, isOpen },
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    buttonRef,
    menuId,
    buttonId,
    menuRef,
    placement,
    closeOnOutsideClick
  } = useMenuContext();

  const handleKeyDown = event => {
    const count = focusableItems.current.length;
    let nextIndex;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      focusAtIndex(nextIndex);
    }
    if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + count) % count;
      focusAtIndex(nextIndex);
    }
    if (event.key === "Home") {
      focusOnFirstItem();
    }
    if (event.key === "End") {
      focusOnLastItem();
    }
    if (event.key === "Tab") {
      event.preventDefault();
    }
    if (event.key === "Escape") {
      closeMenu();
    }

    /* Set focus based on first character */
    if (/^[a-z0-9_-]$/i.test(event.key)) {
      event.stopPropagation();
      event.preventDefault();
      let foundNode = focusableItems.current.find(item =>
        item.textContent.toLowerCase().startsWith(event.key)
      );
      if (foundNode) {
        nextIndex = focusableItems.current.indexOf(foundNode);
        focusAtIndex(nextIndex);
      }
    }
  };

  /* Close on outside click and blur for the Menu */
  const handleBlur = event => {
    if (
      closeOnOutsideClick &&
      isOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.relatedTarget) &&
      !buttonRef.current.contains(event.relatedTarget)
    ) {
      closeMenu();
    }
  };

  return (
    <Popper placement={placement}>
      {({ ref: popperRef, style }) => (
        <Box
          maxWidth="2xs"
          boxShadow="md"
          borderRadius="md"
          role="menu"
          ref={node => {
            assignRef(menuRef, node);
            assignRef(popperRef, node);
          }}
          id={menuId}
          py={2}
          position="absolute"
          aria-labelledby={buttonId}
          // style={style}
          {...props}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          tabIndex={-1}
          hidden={!isOpen}
        />
      )}
    </Popper>
  );
};
