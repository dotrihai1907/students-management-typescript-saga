import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import StatisticItem from "./components/StatisticItem";
import {
  dashboardAtions,
  selectHighestStudentsList,
  selectLoading,
  selectLowestStudentsList,
  selectRankingByCityList,
  selectStatistics,
} from "./dashboardSlice";

import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import { makeStyles } from "@material-ui/core";
import Widget from "./components/Widget";
import StudentRankingList from "./components/StudentRakingList";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
  content: {
    position: "absolute",
    width: "100%",
    top: theme.spacing(0.5),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const statistics = useAppSelector(selectStatistics);
  const highestStudentsList = useAppSelector(selectHighestStudentsList);
  const lowestStudentsList = useAppSelector(selectLowestStudentsList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardAtions.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {/*loading section */}
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.content}>
        {/*statistic section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<MaleIcon fontSize="large" color="primary" />}
              label="male"
              value={statistics.maleCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<FemaleIcon fontSize="large" color="primary" />}
              label="female"
              value={statistics.femaleCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<StarOutlineIcon fontSize="large" color="primary" />}
              label="score above 8"
              value={statistics.highMarkCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<SlowMotionVideoIcon fontSize="large" color="primary" />}
              label="score below 5"
              value={statistics.maleCount}
            />
          </Grid>
        </Grid>

        {/*all students section */}
        <Box mt={5}>
          <Typography variant="h5">All Students</Typography>
          <Box mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Students with highest mark">
                  <StudentRankingList studentList={highestStudentsList} />
                </Widget>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Widget title="Students with lowest mark">
                  <StudentRankingList studentList={lowestStudentsList} />
                </Widget>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/*ranking by section */}
        <Box mt={5}>
          <Typography variant="h5">Ranking By City</Typography>
          <Box mt={2}>
            <Grid container spacing={3}>
              {rankingByCityList.map((ranking) => (
                <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                  <Widget title={ranking.cityName}>
                    <StudentRankingList studentList={ranking.rankingList} />
                  </Widget>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
