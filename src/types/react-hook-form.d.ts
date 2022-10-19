import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

type TControllerProps = {
  field: ControllerRenderProps<any, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};