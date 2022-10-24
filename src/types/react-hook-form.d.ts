import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

type TRenderControllerParams = {
  field: ControllerRenderProps<any, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

type TControllerProps = {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
};
