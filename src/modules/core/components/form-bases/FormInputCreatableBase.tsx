import { Box, Chip, TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "~modules-core/toast";

type TProps = TextFieldProps & {
  initChips?: string[];
  callback?: (chips: string[]) => void;
  defaultChips?: string[];
};

export const FormInputCreatableBase: React.FC<TProps> = ({
  InputProps,
  inputProps,
  InputLabelProps,
  initChips,
  callback,
  className,
  defaultChips,
  ...props
}) => {
  const [chips, setChips] = useState<string[]>(defaultChips || []);

  const [text, setText] = useState<string>("");

  // EXTRACT PROPS
  const defaultProps: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    size: "small",
    className: clsx(className, "flex-grow w-[30%]"),
    ...props,
  };

  const defaultLabelProps = {
    className: clsx("!bg-transparent", !props.error && "text-input-label"),
    ...InputLabelProps,
  };

  const defaultInputProps = {
    ...InputProps,
    className: clsx("bg-input-bg border-input-border", InputProps?.className),
  };

  const defaultInputTagProps = {
    ...inputProps,
  };

  // METHODS
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const code = e?.code?.toLocaleLowerCase() as string;

      switch (true) {
        case !code?.includes("tab") && !code?.includes("enter"):
          return;

        case !text.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g):
          toast.error("Email không hợp lệ!");
          return;

        case chips.includes(text): {
          toast.error(text + " đã tồn tại!");
          return;
        }
        default: {
          text && setChips((prev) => [...prev, text]);

          setText("");
        }
      }
    },
    [text]
  );

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>) => {
      switch (true) {
        case !text.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g):
          return;

        case chips.includes(text): {
          return;
        }
        default: {
          text && setChips((prev) => [...prev, text]);

          setText("");
        }
      }
    },
    [text]
  );

  const renderChip = useCallback((chip: string) => {
    return (
      <Chip
        key={chip}
        label={chip}
        onDelete={() => setChips((prev) => prev.filter((c) => c !== chip))}
      />
    );
  }, []);

  // SIDE EFFECTS
  useEffect(() => {
    initChips && setChips(initChips as []);
  }, [initChips]);

  useEffect(() => {
    callback?.(chips);
  }, [chips]);

  return (
    <Box className="flex flex-wrap items-center gap-2">
      {_.compact(chips).map(renderChip)}
      <TextField
        InputLabelProps={defaultLabelProps}
        InputProps={defaultInputProps}
        inputProps={defaultInputTagProps}
        {...defaultProps}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
      />
    </Box>
  );
};
