import axiosClient from "./axiosClient";

const cityApi = {
  getAll() {
    return axiosClient.get("/cities");
  },
};

export default cityApi;
