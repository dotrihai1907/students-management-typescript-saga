import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Student } from "../../../models";
import { Box, Button, Paper } from "@mui/material";
import { captializeString, getMarkColor } from "../../../utils";

export interface StudentTableProps {
  studentList: Student[];
  handleEdit: (student: Student) => void;
  handleRemove: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  handleEdit,
  handleRemove,
}: StudentTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student) => (
            <TableRow
              key={student.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell width={200}>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{captializeString(student.gender)}</TableCell>
              <TableCell>
                <Box fontWeight="bold" color={getMarkColor(student.mark)}>
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{ marginRight: "6px" }}
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleRemove(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
