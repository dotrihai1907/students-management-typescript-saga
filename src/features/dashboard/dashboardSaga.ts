import { all, call, put, takeLatest } from "redux-saga/effects";
import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";
import { City, ListResponse, Student } from "../../models";
import { dashboardAtions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: "male",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      gender: "female",
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_gte: 8, // filter marks >= 8
    }),
    call(studentApi.getAll, {
      _page: 1,
      _limit: 1,
      mark_lte: 5, // filter marks <= 5
    }),
  ]);

  const statisticsList = responseList.map((item) => item.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

  yield put(
    dashboardAtions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentsList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });

  yield put(dashboardAtions.setHighestStudentList(data));
}

function* fetchLowestStudentsList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "arc",
  });

  yield put(dashboardAtions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
  //fetch cityList
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //fetch ranking per city
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "desc",
      city: city.code,
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = responseList.map(
    (item, index) => ({
      cityId: cityList[index].code,
      rankingList: item.data,
    })
  );

  //update state
  yield put(dashboardAtions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentsList),
      call(fetchLowestStudentsList),
      call(fetchRankingByCityList),
    ]);

    yield put(dashboardAtions.fetchDataSeccess());
  } catch (error) {
    console.log("Failed to fetch dashboard data", error);
    yield put(dashboardAtions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardAtions.fetchData.type, fetchDashboardData);
}
