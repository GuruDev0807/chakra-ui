/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { useColorMode } from "../ColorModeProvider";
import { Flex, FlexProps } from "../Flex";
import { useFormControl } from "../FormControl";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { Icons } from "../theme";

type FormErrorMessageProps<P, T> = FlexProps<P, T> & { icon?: Icons };

const FormErrorMessage = forwardRef(function FormErrorMessage<P, T>(
  props: FormErrorMessageProps<P, T>,
  ref: React.Ref<T>,
) {
  const { colorMode } = useColorMode();
  const formControl = useFormControl(props);

  const color = {
    light: "red.500",
    dark: "red.300",
  };

  if (!formControl.isInvalid) {
    return null;
  }

  return (
    <Flex
      ref={ref}
      color={color[colorMode]}
      id={formControl.id ? `${formControl.id}-error-message` : null}
      mt={2}
      fontSize="sm"
      align="center"
      {...props}
    >
      <Icon aria-hidden name={props.icon || "warning"} mr="0.5em" />
      <Box as="p" lineHeight="normal">
        {props.children}
      </Box>
    </Flex>
  );
}) as <P, T>(
  props: FormErrorMessageProps<P, T>,
) => React.ReactElement<FormErrorMessageProps<P, T>>;

export default FormErrorMessage;
