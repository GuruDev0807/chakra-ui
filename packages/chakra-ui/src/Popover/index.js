/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import Portal from "@reach/portal";
import { cloneElement, Fragment, useEffect, useRef } from "react";
import { Manager, Popper, Reference } from "react-popper";
import Box from "../Box";
import { useColorMode } from "../ColorModeProvider";
import useDisclosure from "../useDisclosure";
import { assignRef } from "../utils";
import FocusLock from "react-focus-lock";
import {
  PopoverCloseButton,
  PopoverContent,
  PopoverTransition,
} from "./components";
import usePopper from "../usePopper";

const Popover = ({
  isOpen: controlledIsOpen,
  defaultIsOpen,
  maxWidth = "xs",
  trigger,
  gutter,
  placement,
  children,
  showArrow,
  showCloseButton,
  usePortal = true,
  onOpenChange,
  trapFocus = false,
  closeOnBlur = true,
  closeOnEsc = true,
  ...rest
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure(defaultIsOpen);
  // const triggerRef = useRef();
  // const popperRef = useRef();

  const {
    placement: _placement,
    referenceRef,
    popoverRef,
    arrowRef,
    arrowStyles,
    popoverStyles,
  } = usePopper({
    placement,
    isOpen,
  });

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  const handleBlur = event => {
    if (
      !trapFocus &&
      isOpen &&
      popoverRef.current &&
      referenceRef.current &&
      !popoverRef.current.contains(event.relatedTarget) &&
      !referenceRef.current.contains(event.relatedTarget)
    ) {
      closeOnBlur && onClose();
    }
  };

  const { colorMode } = useColorMode();

  const _bgColor = colorMode === "light" ? "white" : "gray.700";

  const bg = rest.bg || rest.background || rest.backgroundColor || _bgColor;
  const popoverId = `popper-${useId()}`;
  const PopperWrapper = usePortal ? Portal : Fragment;

  const triggerClone = cloneElement(trigger, {
    "aria-haspopup": "true",
    "aria-controls": popoverId,
    ref: referenceRef,
    onClick: event => {
      onToggle();
      trigger.props.onClick && trigger.props.onClick(event);
    },
  });

  return (
    <Fragment>
      {triggerClone}

      <PopperWrapper>
        <PopoverTransition duration={100} isOpen={isOpen}>
          {styles => (
            <PopoverContent
              ref={popoverRef}
              bg={bg}
              maxWidth={maxWidth}
              data-placement={_placement}
              id={popoverId}
              aria-hidden={isOpen}
              {...rest}
              tabIndex="-1"
              onBlur={handleBlur}
              css={{
                ...popoverStyles,
                transform: `${popoverStyles.transform} scale(${styles.scale})`,
                opacity: styles.opacity,
              }}
              onKeyDown={event => {
                event.stopPropagation();
                if (event.key === "Escape" && closeOnEsc) {
                  onClose && onClose();
                }
              }}
            >
              {showCloseButton && <PopoverCloseButton onClick={onClose} />}
              {typeof children === "function"
                ? children({ isOpen, onClose })
                : children}
              {showArrow && (
                <Box
                  borderColor={bg}
                  data-arrow=""
                  ref={arrowRef}
                  css={arrowStyles}
                />
              )}
            </PopoverContent>
          )}
        </PopoverTransition>
      </PopperWrapper>
    </Fragment>
  );
};

export default Popover;
export * from "./components";
