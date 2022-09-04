import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { Student } from "../../../models";
import studentApi from "../../../api/studentApi";

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();

  const isEdit = Boolean(studentId);

  const [student, setStudent] = useState<Student>();

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
    </Box>
  );
}
