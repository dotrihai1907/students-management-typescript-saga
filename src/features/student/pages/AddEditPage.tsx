import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { Student } from "../../../models";
import studentApi from "../../../api/studentApi";
import StudentForm from "../components/StudentForm";
import { toast } from "react-toastify";

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();

  const isEdit = Boolean(studentId);

  const history = useHistory();

  const [student, setStudent] = useState<Student>();

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gander: "male",
    city: "",
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    toast.success("Save student successfully!");

    history.push("/admin/students");
  };

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  return (
    <Box>
      <NavLink to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </NavLink>

      <Typography variant="h4">
        {isEdit ? "Update student info" : "Add new student"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
