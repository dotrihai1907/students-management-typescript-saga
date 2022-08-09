import { City, ListResponse } from "../models";
import axiosClient from "./axiosClient";

const cityApi = {
  getAll(): Promise<ListResponse<City>> {
    return axiosClient.get("/cities", { params: { _page: 1, _limit: 100 } });
  },
};

export default cityApi;
