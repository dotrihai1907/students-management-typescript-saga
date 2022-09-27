import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import studentApi from "../../../api/studentApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ListParams, Student } from "../../../models";
import { selectCityList } from "../../city/citySlice";
import StudentFilters from "../components/StudentFilters";
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
  const cityList = useAppSelector(selectCityList);

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [filter, dispatch]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebouce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || "");

      toast.success("Remove student successfully!");

      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStudent = (student: Student) => {
    history.push(`/admin/students/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.content}>
        <Box className={classes.titleContainer}>
          <Typography variant="h4">Students</Typography>
          <NavLink to="/admin/students/add" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Add new student
            </Button>
          </NavLink>
        </Box>

        <Box mb={3}>
          <StudentFilters
            filter={filter}
            cityList={cityList}
            onSearchChange={handleSearchChange}
            onChange={handleFilterChange}
          />
        </Box>

        <StudentTable
          studentList={studentList}
          handleRemove={handleRemoveStudent}
          handleEdit={handleEditStudent}
        />

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
