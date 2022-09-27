import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name.")
    .test("two-word", "Please enter at least two words", (value) => {
      if (!value) return true;

      const parts = value?.split(" ") || [];
      return parts?.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive("Please enter a positive number.")
    .integer("Please enter an interger.")
    .required("Please enter age.")
    .min(10, "Min is 6.")
    .max(100, "Max is 100.")
    .typeError("Please enter a valid number."),
  mark: yup
    .number()
    .positive("Please enter a positive number.")
    .min(0, "Min is 0.")
    .max(10, "Max is 10.")
    .required("Please enter mark.")
    .typeError("Please enter a valid number."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select either male or female.")
    .required("Please select gender."),
  city: yup.string().required("Please select city."),
});

const StudentForm = ({ initialValues, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("");

  const cityOptions = useAppSelector(selectCityOptions);

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError("");
      onSubmit?.(formValues);
    } catch (error) {
      setError(error as string);
    }
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

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            options={cityOptions}
          />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;