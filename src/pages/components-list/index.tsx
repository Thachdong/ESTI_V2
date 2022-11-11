import { FormControl, FormLabel, Stack } from "@mui/material";
import { Moment } from "moment";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDatepickerBase, FormInput } from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { FormSelect } from "~modules-core/components/form-hooks/FormSelect";

const Index: NextPage = () => {
  const { control } = useForm();
  const [date, setDate] = useState<Moment>();

  return (
    <Stack sx={{ maxWidth: "md", padding: "2rem", mx: "auto" }} spacing={2}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Form text input
        </FormLabel>

        <FormInput
          controlProps={{ control, name: "form-input" }}
          baseProps={{
            label: "Input type: Text",
            placeholder: "placeholder text ...",
            className: "mb-4",
          }}
        />

        <FormInput
          controlProps={{ control, name: "form-text-area" }}
          baseProps={{
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
        <FormSelect
          controlProps={{ control: control, name: "formselect" }}
          baseProps={{
            options: [
              { name: "Dong Thach", id: "123" },
              { name: "Dat Ngo", id: "456" },
              { name: "Phuc Le", id: "789" },
            ],
            label: "Dev",
          }}
        />
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Form input number
        </FormLabel>
        <FormInputNumber
          baseProps={{
            label: "Amount of money",
            placeholder: "Amount of money",
            decimalScale: 2,
          }}
          controlProps={{ control, name: "form-input-number" }}
        />
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Form date picker
        </FormLabel>
        <FormDatepickerBase
          value={date}
          onChange={(val) => setDate(val)}
          pickerProps={{ label: "Date of birth" }}
        />
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" className="h4 mb-3">
          Data table
        </FormLabel>
        <div style={{ height: 400, width: "100%" }}>
          {/* <DataTable /> */}
        </div>
      </FormControl>
    </Stack>
  );
};

export default Index;
