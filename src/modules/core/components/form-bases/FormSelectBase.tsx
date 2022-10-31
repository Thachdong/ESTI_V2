import { MenuItem, TextField } from "@mui/material";
import { TFormSelectBase } from "~types/form-controlled/form-select";

export const FormSelectBase: React.FC<TFormSelectBase> = ({
  options,
  label,
  selectShape,
  inputProps,
  callback,
}) => {
  const renderOptions = () => {
    if (options.length === 0) {
      return <MenuItem className="text-center">No Option</MenuItem>;
    } else {
      return options.map((option: any) => (
        <MenuItem
          key={option[selectShape?.labelKey as string]}
          value={option[selectShape?.valueKey as string]}
          onClick={() => callback?.(option)}
        >
          {option[selectShape?.labelKey as string]}
        </MenuItem>
      ));
    }
  };

  return (
    <TextField select label={label} {...inputProps}>
      {renderOptions()}
    </TextField>
  );
};
