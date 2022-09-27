import { Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import {
  InputField,
  RadioGroupField,
  SelectField,
} from "../../../components/FormFields";
import { Student } from "../../../models";
import { selectCityOptions } from "../../city/citySlice";

interface Props {
  initialValues?: Student;
  onSubmit: (formValues: Student) => void;
}

const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
  });

  const cityOptions = useAppSelector(selectCityOptions);

  const handleFormSubmit = (formValues: Student) => {
    console.log(formValues);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField
          name="city"
          control={control}
          label="City"
          options={cityOptions}
        />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
