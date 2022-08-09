import { Student, ListResponse, ListParams } from "../models";
import axiosClient from "./axiosClient";

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    return axiosClient.get("/students", { params });
  },
  getById(id: string): Promise<Student> {
    return axiosClient.get(`/students/${id}`);
  },
  add(data: Student): Promise<Student> {
    return axiosClient.post("/students", data);
  },
  update(data: Student): Promise<Student> {
    return axiosClient.patch("/students", data);
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`/students/${id}`);
  },
};

export default studentApi;