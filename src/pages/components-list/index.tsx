import { Box, FormControl, FormLabel, Stack } from "@mui/material";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { FormInput, FormSelectBase } from "~modules-core/components";

const Index: NextPage = () => {
  const { control } = useForm();
  return (
    <Stack sx={{ maxWidth: "md", padding: "2rem", mx: "auto" }} spacing={2}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Form text input
        </FormLabel>

        <FormInput
          control={control}
          name="type-text"
          inputProps={{
            label: "Input type: Text",
            placeholder: "placeholder text ...",
            className: "mb-4",
          }}
        />

        <FormInput
          control={control}
          name="type-textarea"
          inputProps={{
            label: "Input type: Textarea",
            multiline: true,
            minRows: 4,
            placeholder: "placeholder text ...",
          }}
        />
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Form select
        </FormLabel>

        <FormSelectBase />
      </FormControl>
    </Stack>
  );
};

export default Index;
