import { Autocomplete, TextField } from "@mui/material";
import _ from "lodash";
import { SyntheticEvent, useCallback } from "react";
import { TAutocompleteProps } from "~types/form-controlled/form-select";

type TProps = {
  onChange: (val: any | any[]) => void;
};

export const AutoCompleteBase: React.FC<TAutocompleteProps & TProps> = (
  props
) => {
  const {
    label,
    onChange,
    value,
    valueKey = "id",
    options = [],
    callback,
    ...restProps
  } = props;

  const handleChange = useCallback(
    (_: SyntheticEvent<Element, Event>, value: any | any[]) => {
      callback?.(value);
      
      if (Array.isArray(value)) {
        onChange(value.map((val) => val[valueKey]));
      } else {
        onChange(value?.[valueKey]);
      }
    },
    []
  );

  const renderValue = useCallback(
    (value: any | any[]) => {
      if (Array.isArray(value)) {
        return value.map((val) => options.find((o) => o[valueKey] === val));
      } else {
        return options.find((opt) => opt[valueKey] === value);
      }
    },
    [options]
  );

  const defaultProps: Partial<TAutocompleteProps> = {
    size: "small",
    noOptionsText: "Không có lựa chọn",
    disableCloseOnSelect: restProps.multiple,
    getOptionLabel: (option: any) => option?.name,
    ...restProps,
  };

  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} value={renderValue(value)} label={label} />
      )}
      {...defaultProps}
    />
  );
};
