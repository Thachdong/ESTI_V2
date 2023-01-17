import { Autocomplete, TextField } from "@mui/material";
import _ from "lodash";
import { SyntheticEvent, useCallback } from "react";
import { TAutocompleteProps } from "~types/form-controlled/form-select";

type TProps = TAutocompleteProps & {
  onChange: (val: any | any[]) => void;
};

export const AutoCompleteBase: React.FC<TProps> = (props) => {
  // EXTRACT PROPS
  const {
    label,
    onChange,
    value,
    valueKey = "id",
    labelKey = "name",
    options = [],
    callback,
    inputProps,
    shrinkLabel = false,
    ...restProps
  } = props;

  // METHODS
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

  // DEFFAULT PROPS
  const defaultProps: Partial<TAutocompleteProps> = {
    size: "small",
    noOptionsText: "Không có lựa chọn",
    disableCloseOnSelect: restProps.multiple,
    getOptionLabel: (option: any) => option?.[labelKey],
    ...restProps,
  };

  const defaultInputProps = {
    InputLabelProps: { shrink: shrinkLabel },
    label,
    sx: {
      ".MuiInputBase-root": {
        background: "#f6f9fb",
        borderColor: "#fcfdfd"
      },
      label: {
        fontWeight: 600,
        color: "#747474"
      }
    },
    ...inputProps,
  };

  const defaultSx = {
    input: {
      textAlign: "right",
      paddingLeft: "30% !important",
    },
  };

  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      value={renderValue()}
      sx={defaultSx}
      renderInput={(params) => (
        <TextField {...params} {...defaultInputProps} value={renderValue()} />
      )}
      {...defaultProps}
    />
  );
};
