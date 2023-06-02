import AxiosClient from "./axios";

const getAllUser = (page) => {
  return AxiosClient.get(`/api/users?page=${page}`);
};

const postNewUser = (data) => {
  return AxiosClient.post(`/api/users`, data);
};

export { getAllUser, postNewUser };
