import { Autocomplete, TextField } from "@mui/material";
import _ from "lodash";
import { SyntheticEvent } from "react";
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
    inputProps,
    ...restProps
  } = props;
  
  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: any | any[]
  ) => {
    if (Array.isArray(value)) {
      onChange(value.map((val) => val[valueKey]));
    } else {
      onChange(value?.[valueKey]);
    }
  };

  const renderValue = (value: any | any[]) => {
    if (Array.isArray(value)) {
      const valueList = value.map((val) => options.find((o) => o[valueKey] === val));

      callback?.(valueList);

      return valueList;
    } else {
      const valueObj = options.find((opt) => opt[valueKey] === value) || null;

      callback?.(valueObj);

      return valueObj;
    }
  };

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
      value={renderValue(value)}
      renderInput={(params) => (
        <TextField {...params} {...inputProps} value={renderValue(value)} label={label} />
      )}
      {...defaultProps}
    />
  );
};
