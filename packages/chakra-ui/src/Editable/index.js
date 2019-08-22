/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import PseudoBox from "../PseudoBox";
import Box from "../Box";

const EditableContext = createContext();

const Editable = ({
  value: valueProp,
  defaultValue,
  isDisabled,
  onChange,
  startWithEditView: isEditingProp,
  onCancel,
  onSubmit,
  selectAllOnFocus = true,
  submitOnBlur,
  isPreviewFocusable = true,
  placeholder = "Click to edit...",
  children,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(isEditingProp && !isDisabled);
  const { current: isControlled } = useRef(valueProp != null);

  const [value, setValue] = useState(defaultValue || "");
  const _value = isControlled ? valueProp : value;
  const [previousValue, setPreviousValue] = useState(_value);

  const inputRef = useRef(null);

  const onRequestEdit = event => {
    if (!isDisabled) {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      selectAllOnFocus && inputRef.current.select();
    }
  }, [isEditing, selectAllOnFocus]);

  const handleCancel = () => {
    setIsEditing(false);
    setValue(previousValue);
    if (value !== previousValue) {
      onChange && onChange(previousValue);
    }
    onCancel && onCancel(previousValue);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    setPreviousValue(value);
    onSubmit && onSubmit(value);
  };

  const handleChange = event => {
    const { value } = event.target;
    if (!isControlled) {
      setValue(value);
    }
    onChange && onChange(value);
  };

  const handleKeyDown = event => {
    const { key } = event;
    if (key === "Escape") {
      handleCancel();
      return;
    }

    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleFocus = event => {
    if (selectAllOnFocus) {
      inputRef.current.select();
    }
  };

  const childContext = {
    inputRef,
    isEditing,
    isDisabled,
    placeholder,
    onRequestEdit,
    submitOnBlur,
    isPreviewFocusable,
    value: _value,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    onFocus: handleFocus,
  };

  return (
    <EditableContext.Provider value={childContext}>
      <Box {...rest}>
        {typeof children === "function"
          ? children({
              isEditing,
              onSubmit: handleSubmit,
              onCancel: handleCancel,
              onRequestEdit,
            })
          : children}
      </Box>
    </EditableContext.Provider>
  );
};

const sharedProps = {
  fontSize: "inherit",
  fontWeight: "inherit",
  textAlign: "inherit",
  bg: "transparent",
  transition: "all 0.2s",
  borderRadius: "md",
  px: "3px",
  mx: "-3px",
};

export const EditablePreview = props => {
  const {
    isEditing,
    isDisabled,
    value,
    onRequestEdit,
    placeholder,
    isPreviewFocusable,
  } = useContext(EditableContext);
  const hasValue = value != null && value !== "";

  const getTabIndex = () => {
    if ((!isEditing || !isDisabled) && isPreviewFocusable) {
      return 0;
    }

    return null;
  };

  const styleProps = {
    ...sharedProps,
    cursor: "text",
    display: "inline-block",
    opacity: !hasValue ? 0.6 : undefined,
  };

  if (isEditing) {
    return null;
  }

  return (
    <PseudoBox
      as="span"
      aria-disabled={isDisabled}
      tabIndex={getTabIndex()}
      onFocus={onRequestEdit}
      {...styleProps}
      {...props}
    >
      {hasValue ? value : placeholder}
    </PseudoBox>
  );
};

export const EditableInput = props => {
  const {
    inputRef,
    isEditing,
    onChange,
    onKeyDown,
    value,
    onSubmit,
    submitOnBlur,
    placeholder,
  } = useContext(EditableContext);

  if (!isEditing) {
    return null;
  }

  const styleProps = {
    ...sharedProps,
    width: "full",
    _placeholder: {
      opacity: "0.6",
    },
  };

  const renderProps = {
    ref: inputRef,
    onBlur: event => {
      submitOnBlur && onSubmit();
      if (props.onBlur) {
        props.onBlur(event);
      }
    },
    value,
    placeholder,
    onChange,
    onKeyDown,
  };

  return props.children ? (
    props.children(renderProps)
  ) : (
    <PseudoBox as="input" {...renderProps} {...styleProps} {...props} />
  );
};

Editable.propTypes = {
  value: propTypes.string,
  defaultValue: propTypes.string,
  isDisabled: propTypes.bool,
  isEditing: propTypes.bool,
  onChange: propTypes.func,
  onCancel: propTypes.func,
  onSubmit: propTypes.func,
  onEdit: propTypes.func,
  selectAllOnFocus: propTypes.bool,
  placeholder: propTypes.string,
  children: propTypes.node,
};

export default Editable;
