import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Student } from "../../models";

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}
export interface RankingByCity {
  cityId: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentsList: Student[];
  lowestStudentsList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentsList: [],
  lowestStudentsList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSeccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentsList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentsList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

//actions
export const dashboardAtions = dashboardSlice.actions;

//Selectors
export const selectLoading = (state: RootState) => state.dashboard.loading;

export const selectStatistics = (state: RootState) =>
  state.dashboard.statistics;

export const selectHighestStudentsList = (state: RootState) =>
  state.dashboard.highestStudentsList;

export const selectLowestStudentsList = (state: RootState) =>
  state.dashboard.lowestStudentsList;

export const selectRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

//reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
