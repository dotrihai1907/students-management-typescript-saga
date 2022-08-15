import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Student } from "../../../models";
import { Button, Paper } from "@mui/material";

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
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.mark}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{ marginRight: "6px" }}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
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
