import { MenuItem, TextField } from "@mui/material";
import clsx from "clsx";
import { TFormSelectBase } from "~types/form-controlled/form-select";

export const FormSelectBase: React.FC<TFormSelectBase> = (props) => {
  const { options, label, selectShape, callback, ...restProps } =
    props;    

  const renderOptions = () => {
    if (options?.length === 0 || !Array.isArray(options)) {
      return <MenuItem className="text-center">Không có dữ liệu</MenuItem>;
    } else {
      return options.map((option: any) => (
        <MenuItem
          key={option[selectShape?.valueKey as string]}
          value={option[selectShape?.valueKey as string]}
          onClick={() => callback?.(option)}
        >
          {option[selectShape?.labelKey as string]}
        </MenuItem>
      ));
    }
  };

  const inputProps = {
    ...props.inputProps,
    className: clsx(
      props.disabled && "disable-form-input",
      props?.inputProps?.className
    ),
  };

  return (
    <TextField
      fullWidth
      SelectProps={{ ...props.SelectProps }}
      inputProps={inputProps}
      size="small"
      select
      label={label}
      {...restProps}
    >
      {renderOptions()}
    </TextField>
  );
};
