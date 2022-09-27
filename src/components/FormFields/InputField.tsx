import { TextField } from "@mui/material";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const InputField = ({ name, control, label, disabled, type }: Props) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      size="small"
      fullWidth
      margin="normal"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      label={label}
      helperText={error?.message}
      disabled={disabled}
      type={type}
    />
  );
};
