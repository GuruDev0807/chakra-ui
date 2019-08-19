/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  AlertDialogContent as ReachAlertDialogContent,
  AlertDialogDescription,
  AlertDialogLabel,
  AlertDialogOverlay as ReachAlertDialogOverlay,
} from "@reach/alert-dialog";
import css from "@styled-system/css";
import { forwardRef } from "react";
import Box from "../Box";
import { modalContentStyle } from "../Modal";
import { useColorMode } from "../ColorModeProvider";

const AlertDialogHeader = props => (
  <Box py={4} px={6} as={AlertDialogLabel} {...props} />
);

const AlertDialogBody = props => (
  <Box px={6} py={2} as={AlertDialogDescription} {...props} />
);

const AlertDialogFooter = props => <Box ml="auto" p={6} {...props} />;

const AlertDialogOverlay = props => (
  <ReachAlertDialogOverlay
    css={css({
      position: "fixed",
      top: "0",
      right: "0",
      left: "0",
      bottom: "0",
      zIndex: "1",
      overflowY: "auto",
      bg: "rgba(16,22,26,.7)",
    })}
    {...props}
  />
);

const AlertDialogContent = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const styleProps = modalContentStyle({ colorMode });

  return (
    <Box
      as={ReachAlertDialogContent}
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

export {
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
};
