import { makeStyles } from "@material-ui/core";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import StudentTable from "../components/StudentTable";
import { selectStudentList, studentActions } from "../studentSlice";

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
}));

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);

  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, []);

  const handleRemove = () => {};
  const handleEdit = () => {};

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      {/*student table */}
      <StudentTable
        studentList={studentList}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
      />
    </Box>
  );
}
