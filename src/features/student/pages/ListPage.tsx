import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import StudentTable from "../components/StudentTable";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagiantion,
  studentActions,
} from "../studentSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
  content: {
    position: "absolute",
    width: "100%",
    top: theme.spacing(1),
  },
}));

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagiantion);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);

  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [filter]);

  const handleRemove = () => {};
  const handleEdit = () => {};

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.content}>
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

        {/*pagination */}
        <Box my={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            color="primary"
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination._page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
