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
import { ListParams } from "../../../models";
import { selectCityList, selectCityMap } from "../../city/citySlice";
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
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [filter, dispatch]);

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

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebouce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
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
          handleRemove={handleRemove}
          handleEdit={handleEdit}
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
