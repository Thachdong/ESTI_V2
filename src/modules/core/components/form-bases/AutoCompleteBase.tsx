import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
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
      onChange(value.map((val) => val?.[valueKey]));
    } else {
      onChange(value?.[valueKey]);
    }
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (!Array.isArray(value) && props?.freeSolo) {
      onChange(value);
    }
  };

  const renderValue = useCallback(() => {
    if (!value && value !== 0) return restProps.multiple ? [] : "";

    if (Array.isArray(value)) {
      const valueList = value.map((vl) =>
        options.find((o) => o?.[valueKey] === vl)
      );

      callback?.(valueList);
      return valueList;
    } else if (
      props?.freeSolo &&
      (typeof value === "string" || typeof value === "number")
    ) {
      return { [valueKey]: value, [labelKey]: value };
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
    getOptionLabel: (option: any) => {
      if (!option) return "";

      return option?.[labelKey] || "Incorrect label key";
    },
    ...restProps,
  };

  const shrink = shrinkLabel ? {} : { shrink: false };

  const { helperText, error, ...restInputPRops } = inputProps || {};

  const defaultInputProps: TextFieldProps = {
    InputLabelProps: { ...shrink },
    label,
    sx: {
      ".MuiInputBase-root": {
        background: "#f6f9fb",
        borderColor: "#fcfdfd",
        paddingLeft:
          !shrinkLabel && restProps.multiple ? "40% !important" : "0px",
        direction: !shrinkLabel && restProps.multiple ? "rtl" : "ltr",
      },
      ".MuiChip-root": {
        direction: "ltr",
      },
      label: {
        color: "#747474",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        marginTop: "2px",
      },
    },
    error: !!error,
    ...restInputPRops,
  };

  if (!!error) {
    defaultInputProps.helperText = helperText;
  }

  const defaultSx: any = shrinkLabel
    ? {}
    : {
        input: {
          textAlign: "right",
          paddingLeft: "30% !important",
          fontSize: "14px",
        },
      };

  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      value={renderValue()}
      sx={defaultSx}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} {...defaultInputProps} />}
      {...defaultProps}
    />
  );
};
