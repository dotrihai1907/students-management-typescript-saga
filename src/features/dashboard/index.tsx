import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  dashboardAtions,
  selectHighestStudentsList,
  selectLoading,
  selectLowestStudentsList,
  selectRankingByCityList,
  selectStatistics,
} from "./dashboardSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const statistics = useAppSelector(selectStatistics);
  const highestStudentsList = useAppSelector(selectHighestStudentsList);
  const lowestStudentsList = useAppSelector(selectLowestStudentsList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  console.log({
    loading,
    statistics,
    highestStudentsList,
    lowestStudentsList,
    rankingByCityList,
  });

  useEffect(() => {
    dispatch(dashboardAtions.fetchData());
  }, []);
  return <div>Dashboard</div>;
}
