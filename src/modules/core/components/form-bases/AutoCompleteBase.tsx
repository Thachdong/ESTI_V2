import { Autocomplete, TextField } from "@mui/material";
import clsx from "clsx";
import _ from "lodash";
import { SyntheticEvent, useCallback } from "react";
import { TAutocompleteProps } from "~types/form-controlled/form-select";

type TProps = TAutocompleteProps & {
  onChange: (val: any | any[]) => void;
};

export const AutoCompleteBase: React.FC<TProps> = (
  props
) => {
  const {
    label,
    onChange,
    value,
    valueKey = "id",
    labelKey = "name",
    options = [],
    callback,
    inputProps,
    shrinkLabel=false,
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

  const renderValue = useCallback(() => {
    if (value === undefined) return restProps.multiple ? [] : value;

    if (Array.isArray(value)) {
      const valueList = value.map((vl) =>
        options.find((o) => o[valueKey] === vl)
      );

      callback?.(valueList);

      return valueList;
    } else {
      const valueObj = options.find((opt) => opt?.[valueKey] === value) || null;

      callback?.(valueObj);

      return valueObj;
    }
  }, [value, options, callback]);

  const defaultProps: Partial<TAutocompleteProps> = {
    size: "small",
    noOptionsText: "Không có lựa chọn",
    disableCloseOnSelect: restProps.multiple,
    getOptionLabel: (option: any) => option?.[labelKey],
    ...restProps,
  };

  const defaultInputProps = {
    inputProps: {
      className: clsx("pl-[40%] text-right", inputProps?.className),
    },
    InputLabelProps: {shrink: shrinkLabel},
    label,
  }

  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      value={renderValue() || null}
      renderInput={(params) => (
        <TextField {...params} {...defaultInputProps} value={renderValue() || null} />
      )}
      {...defaultProps}
    />
  );
};
